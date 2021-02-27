import { Ref, ref } from 'vue-demi'
import { getMotionValue, MotionValue } from './motionValue'
import { MotionProperties, ResolvedValueTarget, Transition } from './types'
import { getAnimation } from './utils/transition'
const { isArray } = Array

type MotionValuesMap = {
  [key in keyof MotionProperties]: MotionValue
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
    onComplete?: () => void,
  ) => void

  /**
   * @internal Local transitions reference
   */
  motionValues: Ref<MotionValuesMap>
}

/**
 * A Composable holding all the ongoing transitions in a local reference.
 */
export function useMotionTransitions(): MotionTransitions {
  const motionValues = ref<MotionValuesMap>({})

  const stop = (keys?: string | string[]) => {
    const { value } = motionValues

    // Check if keys argument is defined
    if (keys) {
      // Destroy key closure
      const destroyKey = (key: string) => {
        value[key].stop()
        value[key].destroy()
        delete value[key]
      }

      if (isArray(keys)) {
        // If `keys` are an array, loop on specified keys and destroy them
        keys.forEach((key) => {
          if (value[key]) destroyKey(key)
        })
      } else {
        // If `keys` is a string, destroy the specified one
        if (value[keys]) destroyKey(keys)
      }
    } else {
      // No keys specified, destroy all animations
      Object.values<MotionValue>(value).forEach((motionValue) => {
        motionValue.stop()
        motionValue.destroy()
      })

      // Reset motion values
      motionValues.value = {}
    }
  }

  const push = (
    key: string,
    value: ResolvedValueTarget,
    target: MotionProperties,
    transition: Transition = {},
    onComplete?: () => void,
  ) => {
    // Init motion value
    let motionValue: MotionValue = motionValues.value[key]

    // Create motion value if it doesn't exist
    if (!motionValue) {
      // Get the `from` key from target
      const from = target[key]

      // Create motion value
      const _motionValue = getMotionValue(from)

      // Set motion properties mapping
      _motionValue.onChange((v) => {
        target[key] = v
      })

      // Set instance motion value
      motionValues.value[key] = _motionValue

      // Set local motion value
      motionValue = _motionValue
    }

    // Clear local motion value on animation complete
    const _onComplete = () => {
      if (onComplete) onComplete()

      motionValue.destroy()

      delete motionValues.value[key]
    }

    // Create animation
    const animation = getAnimation(
      key,
      motionValue,
      value,
      transition,
      _onComplete,
    )

    // Start animation
    motionValue.start(animation)
  }

  return { motionValues, stop, push }
}
