import { Fn, isString, MaybeRef } from '@vueuse/core'
import { MotionProperties, MotionVariants, Variant } from './types'
import { MotionTransitions, useMotionTransitions } from './useMotionTransitions'
import { getDefaultTransition } from './utils/defaults'

export type MotionControls = {
  /**
   * Apply a variant declaration and execute the resolved transitions.
   *
   * @param variant
   * @returns Promise<void[]>
   */
  apply: (variant: Variant | string) => Promise<void[]> | undefined
  /**
   * Apply a variant declaration without transitions.
   *
   * @param variant
   */
  set: (variant: Variant | string) => void
  /**
   * Stop all the ongoing transitions for the current element.
   */
  stopTransitions: Fn
}

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
  const apply = (variant: Variant | string): Promise<void[]> | undefined => {
    if (isString(variant)) {
      if (variants && variants.value && variants.value[variant]) {
        variant = variants.value[variant] as Variant
      } else {
        console.warn(`The variant ${variant} does not exist on this element.`)
        return
      }
    }

    // Get transition data
    const { transition } = variant

    // Local promises list
    const promises = []

    // Loop on each motion properties keys
    for (const key in variant) {
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

  const set = (variant: Variant | string) => {
    if (isString(variant)) {
      if (variants && variants.value && variants.value[variant]) {
        variant = variants.value[variant] as Variant
      } else {
        console.warn(`The variant ${variant} does not exist on this element.`)
        return
      }
    }

    Object.assign(motionProperties, variant)
  }

  return {
    apply,
    set,
    stopTransitions: stop,
  }
}
