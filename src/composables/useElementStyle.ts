import type { MaybeRef } from '@vueuse/core'
import { watch } from 'vue'
import type { MotionTarget, PermissiveTarget, StyleProperties } from '../types'
import { valueTypes } from '../utils/style'
import { isTransformOriginProp, isTransformProp } from '../utils/transform'
import { usePermissiveTarget } from './usePermissiveTarget'
import { reactiveStyle } from './reactiveStyle'

/**
 * A Composable giving access to a StyleProperties object, and binding the generated style object to a target.
 *
 * @param target
 */
export function useElementStyle(target: MaybeRef<PermissiveTarget>, onInit?: (initData: Partial<StyleProperties>) => void) {
  // Transform cache available before the element is mounted
  let _cache: StyleProperties | undefined
  // Local target cache as we need to resolve the element from PermissiveTarget
  let _target: MotionTarget
  // Create a reactive style object
  const { state, style } = reactiveStyle()

  usePermissiveTarget(target, (el) => {
    _target = el

    // Loop on style keys
    for (const key of Object.keys(valueTypes)) {
      // @ts-expect-error - Fix errors later for typescript 5
      if (el.style[key] === null || el.style[key] === '' || isTransformProp(key) || isTransformOriginProp(key)) continue

      // Append a defined key to the local StyleProperties state object
      // @ts-expect-error - Fix errors later for typescript 5
      state[key] = el.style[key]
    }

    // If cache is present, init the target with the current cached value
    if (_cache) {
      // @ts-expect-error - Fix errors later for typescript 5
      Object.entries(_cache).forEach(([key, value]) => (el.style[key] = value))
    }

    if (onInit) onInit(state)
  })

  // Sync reactive style to element
  watch(
    style,
    (newVal) => {
      // Add the current value to the cache so it is set on target creation
      if (!_target) {
        _cache = newVal
        return
      }

      // Append the state object to the target style properties
      // @ts-expect-error - Fix errors later for typescript 5
      for (const key in newVal) _target.style[key] = newVal[key]
    },
    {
      immediate: true,
    },
  )

  return {
    style: state,
  }
}
