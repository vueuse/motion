import { Ref, ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { MaybeRef } from '@vueuse/shared'
import { MotionTarget, PermissiveTarget } from '../types'

export function resolveElement(
  target: MaybeRef<PermissiveTarget>,
): Ref<MotionTarget> {
  const _targetRef = ref(target)
  const targetRef = ref()

  watch(
    _targetRef,
    (newVal) => {
      if (!newVal) return

      // We need to resolve the component DOM element
      // As Vue does not seem to provide an helper for that
      // But expose the element as `$el` on the Component instance
      // Just check if it exists and resolve it from there.

      // @ts-ignore
      if (newVal.$el) {
        // @ts-ignore
        targetRef.value = newVal.$el as MotionTarget
        return
      }

      // $el does not exist, it might then be a
      targetRef.value = newVal
    },
    { immediate: true },
  )

  return targetRef
}
