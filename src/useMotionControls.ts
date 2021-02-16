import { Fn } from '@vueuse/core'
import { MotionProperties, Variant } from './types'
import { MotionTransitions, useMotionTransitions } from './useMotionTransitions'
import { getDefaultTransition } from './utils/defaults'

export type MotionControls = {
  /**
   * Apply a variant declaration and execute the resolved transitions.
   *
   * @param variant
   * @returns Promise<void[]>
   */
  apply: (variant: Variant) => Promise<void[]>
  /**
   * Apply a variant declaration without transitions.
   *
   * @param variant
   */
  set: (variant: Variant) => void
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
export function useMotionControls(
  motionProperties: MotionProperties,
  { push, stop }: MotionTransitions = useMotionTransitions(),
): MotionControls {
  const apply = (variant: Variant): Promise<void[]> => {
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

  const set = (variant: Variant) => {
    Object.assign(motionProperties, variant)
  }

  return {
    apply,
    set,
    stopTransitions: stop,
  }
}
