import { del as __del, reactive, set as __set } from 'vue-demi'
import { getMotionValue, MotionValue } from './motionValue'
import {
  MotionProperties,
  MotionTransitions,
  MotionValuesMap,
  ResolvedValueTarget,
  Transition,
} from './types'
import { getAnimation } from './utils/transition'
const { isArray } = Array

/**
 * A Composable holding all the ongoing transitions in a local reference.
 */
export function useMotionTransitions(): MotionTransitions {
  const motionValues = reactive<MotionValuesMap>({})

  const stop = (keys?: string | string[]) => {
    // Check if keys argument is defined
    if (keys) {
      // Destroy key closure
      const destroyKey = (key: string) => {
        motionValues[key].stop()
        motionValues[key].destroy()
        __del(motionValues, key)
      }

      if (isArray(keys)) {
        // If `keys` are an array, loop on specified keys and destroy them
        keys.forEach((key) => {
          if (motionValues[key]) destroyKey(key)
        })
      } else {
        // If `keys` is a string, destroy the specified one
        if (motionValues[keys]) destroyKey(keys)
      }
    } else {
      // No keys specified, destroy all animations
      Object.entries<MotionValue>(motionValues).forEach(
        ([key, motionValue]) => {
          motionValue.stop()
          motionValue.destroy()
          __del(motionValues, key)
        },
      )
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
    let motionValue: MotionValue = motionValues[key]

    // Create motion value if it doesn't exist
    if (!motionValue) {
      // Get the `from` key from target
      const from = target[key]

      // Create motion value
      const _motionValue = getMotionValue(from)

      // Set motion properties mapping
      _motionValue.onChange((v) => {
        __set(target, key, v)
      })

      // Set instance motion value
      __set(motionValues, key, _motionValue)

      // Set local motion value
      motionValue = _motionValue
    }

    // Clear local motion value on animation complete
    const _onComplete = () => {
      if (onComplete) onComplete()

      motionValue.destroy()

      __del(motionValues, key)
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
