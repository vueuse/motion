import { unrefElement } from '@vueuse/core'
import { Ref, set as __set, watch } from 'vue-demi'
import { reactiveStyle } from './reactiveStyle'
import { MotionTarget, PermissiveTarget, StyleProperties } from './types'
import { valueTypes } from './utils/style'

/**
 * A Composable giving access to a StyleProperties object, and binding the generated style object to a target.
 *
 * @param target
 */
export function useElementStyle(target: Ref<PermissiveTarget>) {
  // Transform cache available before the element is mounted
  let _cache: StyleProperties | undefined
  let _target: MotionTarget = undefined

  // Create a reactive style object
  const { state, style } = reactiveStyle()

  // Sync existing style from supplied element
  const stopInitWatch = watch(
    () => unrefElement(target),
    (el) => {
      if (!el) return

      _target = el

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
    },
  )

  // Sync reactive style to element
  const stopSyncWatch = watch(
    style,
    (newVal) => {
      // Add the current value to the cache so it is set on target creation
      if (!_target || !_target.style) {
        _cache = newVal
        return
      }

      // Append the state object to the target style properties
      for (const key in newVal) __set(_target.style, key, newVal[key])
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
