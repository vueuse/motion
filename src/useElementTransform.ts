import { MaybeRef, unrefElement } from '@vueuse/core'
import { watch } from 'vue-demi'
import { reactiveTransform } from './reactiveTransform'
import { MotionTarget, PermissiveTarget, TransformProperties } from './types'
import { stateFromTransform } from './utils/transform-parser'

/**
 * A Composable giving access to a TransformProperties object, and binding the generated transform string to a target.
 *
 * @param target
 */
export function useElementTransform(
  target: MaybeRef<PermissiveTarget>,
  onInit?: (initData: Partial<TransformProperties>) => void,
) {
  // Transform cache available before the element is mounted
  let _cache: string | undefined
  // Local target cache as we need to resolve the element from PermissiveTarget
  let _target: MotionTarget = undefined
  // Create a reactive transform object
  const { state, transform } = reactiveTransform()

  // Cache transform until the element is alive and we can bind to it
  const stopInitWatch = watch(
    () => unrefElement(target),
    (el) => {
      if (!el) return

      _target = el

      // Parse transform properties and applies them to the current state
      if (el.style.transform) stateFromTransform(state, el.style.transform)

      // If cache is present, init the target with the current cached value
      if (_cache) {
        el.style.transform = _cache
      }

      if (onInit) onInit(state)
    },
    {
      immediate: true,
    },
  )

  // Sync reactive transform to element
  const stopSyncWatch = watch(
    transform,
    (newValue) => {
      // Add the current value to the cache so it is set on target creation
      if (!_target) {
        _cache = newValue
        return
      }

      // Set the transform string on the target
      _target.style.transform = newValue
    },
    {
      immediate: true,
    },
  )

  // Stop watchers
  const stop = () => {
    stopInitWatch()
    stopSyncWatch()
  }

  return {
    transform: state,
    stop,
  }
}
