import type {
  MotionProperties,
  MotionTransitions,
  ResolvedValueTarget,
  Transition,
} from './types'
import { useMotionValues } from './useMotionValues'
import { getAnimation } from './utils/transition'

/**
 * A Composable holding all the ongoing transitions in a local reference.
 */
export function useMotionTransitions(): MotionTransitions {
  const { motionValues, stop, get } = useMotionValues()

  const push = (
    key: string,
    value: ResolvedValueTarget,
    target: MotionProperties,
    transition: Transition = {},
    onComplete?: () => void,
  ) => {
    // Get the `from` key from target
    const from = target[key]

    // Get motion value for the target key
    const motionValue = get(key, from, target)

    // Sets the value immediately if specified
    if (transition && transition.immediate) {
      motionValue.set(value)
      return
    }

    // Create animation
    const animation = getAnimation(
      key,
      motionValue,
      value,
      transition,
      onComplete,
    )

    // Start animation
    motionValue.start(animation)
  }

  return { motionValues, stop, push }
}
