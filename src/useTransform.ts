import { MaybeRef } from '@vueuse/shared'
import { ref, watch } from 'vue-demi'
import { reactiveTransform } from './utils/transform'

export const useTransform = (
  target: MaybeRef<HTMLElement | null | undefined>,
) => {
  const targetRef = ref(target)

  const { state, result } = reactiveTransform()

  watch(result, (newValue) => {
    if (!targetRef || !targetRef.value || !newValue) return

    targetRef.value.style['transform'] = newValue
  })

  return {
    transform: state,
  }
}
