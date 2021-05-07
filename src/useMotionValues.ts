import { del as __del, set as __set } from 'vue-demi'
import { getMotionValue, MotionValue } from './motionValue'
import { MotionProperties, MotionValuesMap } from './types'
const { isArray } = Array

export function useMotionValues() {
  const motionValues: MotionValuesMap = {}

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

  const get = (
    key: string,
    from: any,
    target: MotionProperties,
  ): MotionValue => {
    if (motionValues[key]) return motionValues[key]

    // Create motion value
    const motionValue = getMotionValue(from)

    // Set motion properties mapping
    motionValue.onChange((v) => {
      __set(target, key, v)
    })

    // Set instance motion value
    __set(motionValues, key, motionValue)

    return motionValue
  }

  return {
    motionValues,
    get,
    stop,
  }
}
