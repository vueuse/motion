import { Fn } from '@vueuse/core'
import { Ref, ref } from 'vue-demi'
import { MotionProperties, ResolvedValueTarget, Transition } from './types'
import { getAnimation } from './utils/transition'
const { isArray } = Array

type TransitionMap = {
  [key in keyof MotionProperties]: Fn
}

export interface MotionTransitions {
  /**
   * Stop ongoing transitions for the current element.
   */
  stop: (keys?: string | string[]) => void

  /**
   * Start a transition, push it to the `transitions` array.
   *
   * @param transition
   * @param values
   */
  push: (
    key: string,
    value: ResolvedValueTarget,
    target: MotionProperties,
    transition: Transition,
  ) => void

  /**
   * @internal Local transitions reference
   */
  transitions: Ref<TransitionMap>
}

/**
 * A Composable holding all the ongoing transitions in a local reference.
 */
export function useMotionTransitions(): MotionTransitions {
  const transitions = ref<TransitionMap>({})

  const stop = (keys?: string | string[]) => {
    const { value } = transitions

    // Check if keys argument is defined
    if (keys) {
      if (isArray(keys)) {
        // If keys are an array, loop on specified keys and stop them
        keys.forEach((key) => {
          if (value[key]) value[key]()
        })
      } else {
        // If keys are a string, stop the specified one
        if (value[keys]) value[keys]()
      }
    } else {
      // No keys specified, stop all animations
      Object.values<Fn>(value).forEach((stop) => stop())
    }
  }

  const push = (
    key: string,
    value: ResolvedValueTarget,
    target: MotionProperties,
    transition: Transition,
  ) => {
    // Stop the current animation if it exists
    if (transitions.value[key]) transitions.value[key]()

    // Get the `from` key from target
    const from = target[key]

    // Create animation
    const animation = getAnimation(key, value, target, transition, from)

    const { stop } = animation()

    // Create self-deleting stop function
    transitions.value[key] = () => {
      stop()

      // Delete key from local transitions
      delete transitions.value[key]
    }
  }

  return { transitions, stop, push }
}
