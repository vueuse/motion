import { ResolvedValueTarget, Transition } from './types'
import { MotionProperties, Variant } from './types'
import { getDefaultTransition } from './utils/defaults'

export type MotionControls = {
  apply: (variant: Variant) => void
  stop: () => void
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
  push: (
    key: string,
    value: ResolvedValueTarget,
    target: MotionProperties,
    transition: Transition,
  ) => void,
  stop: () => void,
): MotionControls {
  /**
   * Apply a variant declaration and execute the resolved transitions.
   *
   * @param variant
   */
  const apply = (variant: Variant) => {
    // Skip empty variants
    if (Object.keys(variant).length === 0) return

    // Stop current transitions
    stop()

    // Get transition data
    const { transition } = variant

    // Loop on each motion properties keys
    for (const key in variant) {
      if (key === 'transition') continue

      const value = variant[key]

      push(
        key as keyof MotionProperties,
        value,
        motionProperties,
        transition || getDefaultTransition(key, value),
      )
    }
  }

  return {
    apply,
    stop,
  }
}
