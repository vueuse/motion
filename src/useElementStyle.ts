import { Ref, set as __set, watch } from 'vue-demi'
import { reactiveStyle } from './reactiveStyle'
import { MotionTarget, StyleProperties } from './types'
import { valueTypes } from './utils/style'

/**
 * A Composable giving access to a StyleProperties object, and binding the generated style object to a target.
 *
 * @param target
 */
export function useElementStyle(target: Ref<MotionTarget>) {
  // Transform cache available before the element is mounted
  let _cache: StyleProperties | undefined

  // Create a reactive style object
  const { state, style } = reactiveStyle()

  // Sync existing style from supplied element
  const stopInitWatch = watch(target, (el) => {
    if (!el) return

    // Loop on style keys
    for (const key of Object.keys(valueTypes)) {
      if (el.style[key] === null || el.style[key] === '') continue

      // Append a defined key to the local StyleProperties state object
      __set(state, key, el.style[key])
    }

    // If cache is present, init the target with the current cached value
    if (_cache) {
      for (const key in _cache) __set(el.style, key, _cache[key])
    }
  })

  // Sync reactive style to element
  const stopSyncWatch = watch(
    style,
    (newValue) => {
      // Add the current value to the cache so it is set on target creation
      if (!target.value || !target.value.style) {
        _cache = newValue
        return
      }

      // Append the state object to the target style properties
      for (const key in newValue) __set(target.value.style, key, newValue[key])
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
    style: state,
    stop,
  }
}
