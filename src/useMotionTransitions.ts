import { ref, set as __set } from 'vue-demi'
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
  const motionValues = ref<MotionValuesMap>({})

  const stop = (keys?: string | string[]) => {
    const { value: _motionValues } = motionValues

    // Check if keys argument is defined
    if (keys) {
      // Destroy key closure
      const destroyKey = (key: string) => {
        _motionValues[key].stop()
        _motionValues[key].destroy()
        delete _motionValues[key]
      }

      if (isArray(keys)) {
        // If `keys` are an array, loop on specified keys and destroy them
        keys.forEach((key) => {
          if (_motionValues[key]) destroyKey(key)
        })
      } else {
        // If `keys` is a string, destroy the specified one
        if (_motionValues[keys]) destroyKey(keys)
      }
    } else {
      // No keys specified, destroy all animations
      Object.values<MotionValue>(_motionValues).forEach((motionValue) => {
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
        __set(target, key, v)
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
