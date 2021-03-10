import { tryOnUnmounted } from '@vueuse/shared'
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
    // Destroy key closure
    const destroyKey = (key: string) => {
      if (!motionValues[key]) return

      motionValues[key].stop()
      motionValues[key].destroy()
      __del(motionValues, key)
    }

    // Check if keys argument is defined
    if (keys) {
      if (isArray(keys)) {
        // If `keys` are an array, loop on specified keys and destroy them
        keys.forEach(destroyKey)
      } else {
        // If `keys` is a string, destroy the specified one
        destroyKey(keys)
      }
    } else {
      // No keys specified, destroy all animations
      Object.keys(motionValues).forEach(destroyKey)
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

  // Ensure everything is cleared on unmount
  tryOnUnmounted(stop)

  return { motionValues, stop, push }
}
