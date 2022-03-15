import { tryOnUnmounted } from '@vueuse/shared'
import type { Ref } from 'vue-demi'
import { del as __del, set as __set, ref } from 'vue-demi'
import type { MotionValue } from './motionValue'
import { getMotionValue } from './motionValue'
import type { MotionProperties, MotionValuesMap } from './types'
const { isArray } = Array

export function useMotionValues() {
  const motionValues = ref({}) as Ref<MotionValuesMap>

  const stop = (keys?: string | string[]) => {
    // Destroy key closure
    const destroyKey = (key: string) => {
      if (!motionValues.value[key]) return

      motionValues.value[key].stop()
      motionValues.value[key].destroy()
      __del(motionValues.value, key)
    }

    // Check if keys argument is defined
    if (keys) {
      if (isArray(keys)) {
        // If `keys` are an array, loop on specified keys and destroy them
        keys.forEach(destroyKey)
      }
      else {
        // If `keys` is a string, destroy the specified one
        destroyKey(keys)
      }
    }
    else {
      // No keys specified, destroy all animations
      Object.keys(motionValues.value).forEach(destroyKey)
    }
  }

  const get = (
    key: string,
    from: any,
    target: MotionProperties,
  ): MotionValue => {
    if (motionValues.value[key]) return motionValues.value[key] as MotionValue

    // Create motion value
    const motionValue = getMotionValue(from)

    // Set motion properties mapping
    motionValue.onChange((v) => {
      __set(target, key, v)
    })

    // Set instance motion value
    __set(motionValues.value, key, motionValue)

    return motionValue
  }

  // Ensure everything is cleared on unmount
  tryOnUnmounted(stop)

  return {
    motionValues,
    get,
    stop,
  }
}
