import { MaybeRef } from '@vueuse/shared'
import { ref, watch } from 'vue'
import { reactiveStyle } from './reactiveStyle'

export const useStyle = (target: MaybeRef<HTMLElement | null | undefined>) => {
  const targetRef = ref(target)

  const { state, style } = reactiveStyle()

  watch(style, (newValue) => {
    if (!targetRef || !targetRef.value || !newValue) return

    Object.assign(targetRef.value.style, newValue)
  })

  return {
    style: state,
  }
}
