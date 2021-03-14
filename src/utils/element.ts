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

      if (newVal.$el) {
        targetRef.value = newVal.$el as MotionTarget
        return
      }

      // $el does not exist, it might then be a correct DOM element
      targetRef.value = newVal
    },
    { immediate: true },
  )

  return targetRef
}
