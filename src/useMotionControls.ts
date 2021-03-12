import { isObject, MaybeRef } from '@vueuse/core'
import { Ref, ref } from 'vue-demi'
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
  { push, stop }: MotionTransitions = useMotionTransitions(),
): MotionControls {
  // Variants as ref
  const variantsRef = ref(variants) as Ref<T>

  const getVariantFromKey = (variant: keyof T): Variant => {
    if (!variantsRef || !variantsRef.value || !variantsRef.value[variant]) {
      throw new Error(`The variant ${variant} does not exist.`)
    }

    return variantsRef.value[variant] as Variant
  }

  const apply = (variant: Variant | keyof T): Promise<void[]> | undefined => {
    // Check if transition exists
    let transition = isObject(variant) && variant.transition

    // If variant is a key, try to resolve it
    if (!transition && typeof variant === 'string') {
      variant = getVariantFromKey(variant)
    }

    // Delete transition from variant
    if (transition) delete variant['transition']

    // Return Promise chain
    return Promise.all(
      Object.entries(variant).map(([key, value]) => {
        return new Promise<void>((resolve) => {
          push(
            key as keyof MotionProperties,
            value,
            motionProperties,
            transition || getDefaultTransition(key, variant[key]),
            resolve,
          )
        })
      }),
    )
  }

  const set = (variant: Variant | keyof T) => {
    // Get variant data from parameter
    let variantData = isObject(variant) ? variant : getVariantFromKey(variant)

    // Delete transition key
    if (variantData.transition) delete variantData['transition']

    // Set in chain
    Object.entries(variantData).forEach(([key, value]) => {
      push(key as keyof MotionProperties, value, motionProperties, {
        immediate: true,
      })
    })
  }

  const leave = async (done: () => void) => {
    let leaveVariant: Variant | undefined

    if (variantsRef && variantsRef.value) {
      if (variantsRef.value.leave) {
        leaveVariant = variantsRef.value.leave
      }

      if (!variantsRef.value.leave && variantsRef.value.initial) {
        leaveVariant = variantsRef.value.initial
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
    apply,
    set,
    stopTransitions: stop,
    leave,
  }
}
