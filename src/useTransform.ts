import { MaybeRef } from '@vueuse/shared'
import { ref, watch } from 'vue-demi'
import { reactiveTransform } from './reactiveTransform'

export function useTransform(target: MaybeRef<HTMLElement | null | undefined>) {
  const targetRef = ref(target)

  const _cache = ref<string>()

  const { state, transform } = reactiveTransform()

  // Sync reactive transform to element
  watch(
    transform,
    (newValue) => {
      if (!targetRef || !targetRef.value) {
        _cache.value = newValue
        return
      }

      targetRef.value.style.transform = newValue
    },
    {
      immediate: true,
    },
  )

  // Cache transform until the element is alive and we can bind to it
  watch(
    targetRef,
    (newValue) => {
      if (!newValue) return

      if (_cache && _cache.value) {
        newValue.style.transform = _cache.value
      }
    },
    {
      immediate: true,
    },
  )

  return {
    transform: state,
  }
}
