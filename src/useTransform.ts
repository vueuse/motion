import { MaybeRef } from '@vueuse/shared'
import { ref, watch } from 'vue-demi'
import { reactiveTransform } from './reactiveTransform'

export function useTransform(target: MaybeRef<HTMLElement | null | undefined>) {
  const targetRef = ref(target)

  const { state, transform } = reactiveTransform()

  // Sync reactive transform to element
  watch(transform, (newValue) => {
    if (!targetRef || !targetRef.value || !newValue) return

    targetRef.value.style.transform = newValue
  })

  return {
    transform: state,
  }
}
