import { isObject, MaybeRef } from '@vueuse/core'
import { ref, unref, watch } from 'vue-demi'
import {
  MotionControls,
  MotionProperties,
  MotionTransitions,
  MotionVariants,
  Variant,
} from './types'
import { useMotionTransitions } from './useMotionTransitions'
import { getDefaultTransition } from './utils/defaults'

/**
 * A Composable handling motion controls, pushing resolved variant to useMotionTransitions manager.
 *
 * @param transform
 * @param style
 * @param currentVariant
 */
export function useMotionControls<T extends MotionVariants>(
  motionProperties: MotionProperties,
  variants: MaybeRef<T> = {} as MaybeRef<T>,
  { motionValues, push, stop }: MotionTransitions = useMotionTransitions(),
): MotionControls {
  // Variants as ref
  const _variants = unref(variants) as T

  // Is the current instance animated ref
  const isAnimating = ref(false)

  // Watcher setting isAnimating
  const _stopWatchAnimating = watch(
    motionValues,
    (newVal) => {
      // Go through every motion value, and check if any is animating
      isAnimating.value =
        Object.values(newVal).filter((value) => value.isAnimating()).length > 0
    },
    {
      immediate: true,
      deep: true,
    },
  )

  const getVariantFromKey = (variant: keyof T): Variant => {
    if (!_variants || !_variants[variant]) {
      throw new Error(`The variant ${variant} does not exist.`)
    }

    return _variants[variant] as Variant
  }

  const apply = (variant: Variant | keyof T): Promise<void[]> | undefined => {
    // If variant is a key, try to resolve it
    if (typeof variant === 'string') {
      variant = getVariantFromKey(variant)
    }

    // Return Promise chain
    return Promise.all(
      Object.entries(variant).map(([key, value]) => {
        // Skip transition key
        if (key === 'transition') return

        return new Promise<void>((resolve) => {
          push(
            key as keyof MotionProperties,
            value,
            motionProperties,
            (variant as Variant).transition ||
              getDefaultTransition(key, variant[key]),
            resolve,
          )
        })
      }),
    )
  }

  const set = (variant: Variant | keyof T) => {
    // Get variant data from parameter
    let variantData = isObject(variant) ? variant : getVariantFromKey(variant)

    // Set in chain
    Object.entries(variantData).forEach(([key, value]) => {
      // Skip transition key
      if (key === 'transition') return

      push(key as keyof MotionProperties, value, motionProperties, {
        immediate: true,
      })
    })
  }

  const leave = async (done: () => void) => {
    let leaveVariant: Variant | undefined

    if (_variants) {
      if (_variants.leave) {
        leaveVariant = _variants.leave
      }

      if (!_variants.leave && _variants.initial) {
        leaveVariant = _variants.initial
      }
    }

    if (!leaveVariant) {
      done()
      return
    }

    await apply(leaveVariant)

    done()
  }

  return {
    isAnimating,
    apply,
    set,
    stopTransitions: () => {
      _stopWatchAnimating()
      stop()
    },
    leave,
  }
}
