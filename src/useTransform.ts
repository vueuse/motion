import { MaybeRef } from '@vueuse/shared'
import { ref, watch } from 'vue-demi'
import { reactiveTransform } from './reactiveTransform'

/**
 * A Composable giving access to a TransformProperties object, and binding the generated transform string to a target.
 *
 * @param target
 */
export function useTransform(target: MaybeRef<HTMLElement | null | undefined>) {
  // Target element ref
  const targetRef = ref(target)

  // Transform cache available before the element is mounted
  const _cache = ref<string>()

  // Create a reactive transform object
  const { state, transform } = reactiveTransform()

  // Cache transform until the element is alive and we can bind to it
  watch(
    targetRef,
    (newValue) => {
      if (!newValue) return

      if (_cache && _cache.value) {
        // If cache is present, init the target with the current cached value
        newValue.style.transform = _cache.value
      }
    },
    {
      immediate: true,
    },
  )

  // Sync reactive transform to element
  watch(
    transform,
    (newValue) => {
      if (!targetRef || !targetRef.value) {
        // Add the current value to the cache so it is set on target creation
        _cache.value = newValue
        return
      }

      // Set the transform string on the target
      targetRef.value.style.transform = newValue
    },
    {
      immediate: true,
    },
  )

  return {
    transform: state,
  }
}
