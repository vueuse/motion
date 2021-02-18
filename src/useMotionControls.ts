import { isObject, MaybeRef } from '@vueuse/core'
import { Ref, ref } from 'vue'
import {
  MotionControls,
  MotionProperties,
  MotionVariants,
  Variant,
} from './types'
import { MotionTransitions, useMotionTransitions } from './useMotionTransitions'
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
    // Get variant data from parameter
    let variantData = isObject(variant) ? variant : getVariantFromKey(variant)

    // Get transition data
    const { transition } = variantData

    // Local promises list
    const promises = []

    // Loop on each motion properties keys
    for (const key in variant as Variant) {
      if (key === 'transition') continue

      const value = variant[key]

      promises.push(
        new Promise<void>((resolve) => {
          push(
            key as keyof MotionProperties,
            value,
            motionProperties,
            transition || getDefaultTransition(key, value),
            resolve,
          )
        }),
      )
    }

    return Promise.all(promises)
  }

  const set = (variant: Variant | keyof T) => {
    // Get variant data from parameter
    let variantData = isObject(variant) ? variant : getVariantFromKey(variant)

    // Assign variant data to motion properties
    Object.assign(motionProperties, variantData)
  }

  const leave = (el: any, done: () => void) => {
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

    apply({
      ...leaveVariant,
      transition: {
        ...(leaveVariant.transition || {}),
        onComplete: () => {
          variantsRef.value.leave?.transition?.onComplete?.()

          done()
        },
      },
    })
  }

  return {
    apply,
    set,
    stopTransitions: stop,
    leave,
  }
}
