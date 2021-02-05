import { MaybeRef } from '@vueuse/core'
import { ref, watch } from 'vue-demi'
import { reactiveStyle } from './reactiveStyle'
import { MotionTarget } from './types'
import { StyleProperties } from './types'
import { valueTypes } from './utils/style'

/**
 * A Composable giving access to a StyleProperties object, and binding the generated style object to a target.
 *
 * @param target
 */
export function useElementStyle(target: MaybeRef<MotionTarget>) {
  // Target element ref
  const targetRef = ref(target)

  // Transform cache available before the element is mounted
  let _cache: StyleProperties | undefined

  // Create a reactive style object
  const { state, style } = reactiveStyle()

  // Sync existing style from supplied element
  const stopInitWatch = watch(targetRef, (el) => {
    if (!el) return

    // Loop on style keys
    for (const key of Object.keys(valueTypes)) {
      if (el.style[key] == null || el.style[key] === '') continue

      // Append a defined key to the local StyleProperties state object
      state[key] = el.style[key]
    }

    if (_cache) {
      // If cache is present, init the target with the current cached value
      Object.assign(el.style, _cache)
    }
  })

  // Sync reactive style to element
  const stopSyncWatch = watch(
    style,
    (newValue) => {
      if (!targetRef.value?.style) {
        // Add the current value to the cache so it is set on target creation
        _cache = newValue
        return
      }

      // Append the state object to the target style properties
      Object.assign(targetRef.value.style, newValue)
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
