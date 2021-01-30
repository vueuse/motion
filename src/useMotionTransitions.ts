import { animate } from 'popmotion'
import { ref } from 'vue'
import { TransitionProperties, TransitionValues } from './types/transitions'

/**
 * A Composable holding all the ongoing transitions in a local reference.
 */
export function useMotionTransitions() {
  // Local transitions reference
  const transitions = ref<(() => void)[]>([])

  /**
   * Stop all the ongoing transitions for the current element.
   */
  const stop = () => {
    // Check if there is ongoing transitions
    if (transitions.value && transitions.value.length > 0) {
      // Stop each transitions
      transitions.value.forEach((stop) => stop())
      // Reset value
      transitions.value = []
    }
  }

  /**
   * Start a transition, push it to the `transitions` array.
   *
   * @param transition
   * @param values
   */
  const push = (transition: TransitionProperties, values: TransitionValues) => {
    // Little closure to start the transition
    const pushTransition = () => {
      const { stop: stopAnimation } = animate({
        ...transition,
        ...values,
      })

      transitions.value.push(stopAnimation)
    }

    // Handle transition delay
    if (transition.delay) {
      setTimeout(pushTransition, transition.delay)
    } else {
      pushTransition()
    }
  }

  return { transitions, stop, push }
}
