import { Ref, set as __set, watch } from 'vue-demi'
import { reactiveTransform } from './reactiveTransform'
import { MotionTarget } from './types'
import { parseTransform } from './utils/transform-parser'

/**
 * A Composable giving access to a TransformProperties object, and binding the generated transform string to a target.
 *
 * @param target
 */
export function useElementTransform(target: Ref<MotionTarget>) {
  // Transform cache available before the element is mounted
  let _cache: string | undefined

  // Create a reactive transform object
  const { state, transform } = reactiveTransform()

  // Cache transform until the element is alive and we can bind to it
  const stopInitWatch = watch(target, (el) => {
    if (!el) return

    // Parse transform properties and applies them to the current state
    if (el.style.transform) {
      Object.entries(parseTransform(el.style.transform)).forEach(
        ([key, value]) => {
          __set(state, key, value)
        },
      )
    }

    // If cache is present, init the target with the current cached value
    if (_cache) {
      el.style.transform = _cache
    }
  })

  // Sync reactive transform to element
  const stopSyncWatch = watch(
    transform,
    (newValue) => {
      // Add the current value to the cache so it is set on target creation
      if (!target.value || !target.value.style) {
        _cache = newValue
        return
      }

      // Set the transform string on the target
      target.value.style.transform = newValue
    },
    {
      immediate: true,
    },
  )

  // Stop watchers on unmount
  const stop = () => {
    stopInitWatch()
    stopSyncWatch()
  }

  return {
    transform: state,
    stop,
  }
}
