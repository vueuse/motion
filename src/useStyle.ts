import { MaybeRef } from '@vueuse/shared'
import { ref, watch } from 'vue'
import { reactiveStyle } from './reactiveStyle'
import { valueTypes } from './utils/style'

export const useStyle = (target: MaybeRef<HTMLElement | null | undefined>) => {
  const targetRef = ref(target)

  const { state, style } = reactiveStyle()

  // Sync existing style from supplied element
  watch(
    targetRef,
    (newVal: HTMLElement | null | undefined) => {
      if (!newVal || !newVal.style) return

      for (const key of Object.keys(valueTypes)) {
        if (
          newVal.style[key] === undefined ||
          newVal.style[key] === null ||
          newVal.style[key] === ''
        )
          continue

        state[key] = newVal.style[key]
      }
    },
    {
      immediate: true,
    },
  )

  // Sync reactive style to element
  watch(
    style,
    (newValue) => {
      if (!targetRef || !targetRef.value || !newValue) return

      Object.assign(targetRef.value.style, newValue)
    },
    {
      immediate: true,
    },
  )

  return {
    style: state,
  }
}
