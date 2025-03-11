import { ref, watch } from 'vue'
import type { VueInstance } from '@vueuse/core'
import type { MaybeRef, Ref } from 'vue'
import type { MotionTarget, PermissiveTarget } from '../types'

export function resolveElement(target: MaybeRef<PermissiveTarget>): Ref<MotionTarget> {
  const _targetRef = ref(target)
  const targetRef = ref()

  watch(
    _targetRef,
    (newVal) => {
      if (!newVal)
        return

      if ((newVal as VueInstance).$el) {
        targetRef.value = (newVal as VueInstance).$el as MotionTarget
        return
      }

      // $el does not exist, it might then be a correct DOM element
      targetRef.value = newVal
    },
    { immediate: true },
  )

  return targetRef
}
