import { MaybeRef } from '@vueuse/shared'
import { ref, watch } from 'vue'
import { reactiveStyle } from './reactiveStyle'
import { StyleProperties } from './types/variants'
import { valueTypes } from './utils/style'

/**
 * A Composable giving access to a StyleProperties object, and binding the generated style object to a target.
 *
 * @param target
 */
export function useStyle(target: MaybeRef<HTMLElement | null | undefined>) {
  // Target element ref
  const targetRef = ref(target)

  // Transform cache available before the element is mounted
  const _cache = ref<StyleProperties>()

  // Create a reactive style object
  const { state, style } = reactiveStyle()

  // Sync existing style from supplied element
  watch(targetRef, (newVal: HTMLElement | null | undefined) => {
    if (!newVal) return

    // Loop on style keys
    for (const key of Object.keys(valueTypes)) {
      if (
        newVal.style[key] === undefined ||
        newVal.style[key] === null ||
        newVal.style[key] === ''
      )
        continue

      // Append a defined key to the local StyleProperties state object
      state[key] = newVal.style[key]
    }

    if (_cache && _cache.value) {
      // If cache is present, init the target with the current cached value
      Object.assign(newVal.style, _cache.value)
    }
  })

  // Sync reactive style to element
  watch(
    style,
    (newValue) => {
      if (!targetRef || !targetRef.value) {
        // Add the current value to the cache so it is set on target creation
        _cache.value = newValue
        return
      }

      // Append the state object to the target style properties
      Object.assign(targetRef.value.style, newValue)
    },
    {
      immediate: true,
    },
  )

  return {
    style: state,
  }
}
