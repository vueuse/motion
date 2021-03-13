import { Ref, watch } from 'vue-demi'
import { reactiveTransform } from './reactiveTransform'
import { MotionTarget } from './types'

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
    if (el && _cache) {
      // If cache is present, init the target with the current cached value
      el.style.transform = _cache
    }
  })

  // Sync reactive transform to element
  const stopSyncWatch = watch(
    transform,
    (newValue) => {
      if (!target.value || !target.value.style) {
        // Add the current value to the cache so it is set on target creation
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
