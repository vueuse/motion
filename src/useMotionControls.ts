import type { MaybeRef } from 'vue'
import { isObject } from '@vueuse/core'
import { ref, unref, watch } from 'vue'
import type { MotionControls, MotionProperties, MotionTransitions, MotionVariants, Variant } from './types'
import { useMotionTransitions } from './useMotionTransitions'
import { getDefaultTransition } from './utils/defaults'

/**
 * A Composable handling motion controls, pushing resolved variant to useMotionTransitions manager.
 */
export function useMotionControls<T extends string, V extends MotionVariants<T>>(
  motionProperties: MotionProperties,
  variants: MaybeRef<V> = {} as MaybeRef<V>,
  { motionValues, push, stop }: MotionTransitions = useMotionTransitions(),
): MotionControls<T, V> {
  // Variants as ref
  const _variants = unref(variants) as V

  // Is the current instance animated ref
  const isAnimating = ref(false)

  // Watcher setting isAnimating
  watch(
    motionValues,
    (newVal) => {
      // Go through every motion value, and check if any is animating
      isAnimating.value = Object.values(newVal).filter(value => value.isAnimating()).length > 0
    },
    {
      immediate: true,
      deep: true,
    },
  )

  const getVariantFromKey = (variant: keyof V): Variant => {
    if (!_variants || !_variants[variant])
      throw new Error(`The variant ${variant as string} does not exist.`)

    return _variants[variant] as Variant
  }

  const apply = (variant: Variant | keyof V): Promise<void[]> | undefined => {
    // If variant is a key, try to resolve it
    if (typeof variant === 'string')
      variant = getVariantFromKey(variant)

    // Create promise chain for each animated property
    const animations = Object.entries(variant)
      .map(([key, value]) => {
        // Skip transition key
        if (key === 'transition')
          return undefined

        return new Promise<void>(resolve =>
          // @ts-expect-error - Fix errors later for typescript 5
          push(key as keyof MotionProperties, value, motionProperties, (variant as Variant).transition || getDefaultTransition(key, variant[key]), resolve),
        )
      })
      .filter(Boolean)

    // Call `onComplete` after all animations have completed
    async function waitForComplete() {
      await Promise.all(animations)
      ;(variant as Variant).transition?.onComplete?.()
    }

    // Return using `Promise.all` to preserve type compatibility
    return Promise.all([waitForComplete()])
  }

  const set = (variant: Variant | keyof V) => {
    // Get variant data from parameter
    const variantData = isObject(variant) ? variant : getVariantFromKey(variant)

    // Set in chain
    Object.entries(variantData).forEach(([key, value]) => {
      // Skip transition key
      if (key === 'transition')
        return

      push(key as keyof MotionProperties, value, motionProperties, {
        immediate: true,
      })
    })
  }

  const leave = async (done: () => void) => {
    let leaveVariant: Variant | undefined

    if (_variants) {
      if (_variants.leave)
        leaveVariant = _variants.leave

      if (!_variants.leave && _variants.initial)
        leaveVariant = _variants.initial
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
    leave,
    stop,
  }
}
