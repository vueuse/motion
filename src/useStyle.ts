import { MaybeRef } from '@vueuse/shared'
import { ref, watch } from 'vue'
import { reactiveStyle } from './reactiveStyle'
import { valueTypes } from './utils/style'

export const useStyle = (target: MaybeRef<HTMLElement | null | undefined>) => {
  const targetRef = ref(target)

  const { state, style } = reactiveStyle()

  watch(
    targetRef,
    (newVal: HTMLElement | null | undefined) => {
      if (!newVal || !newVal.style) return

      for (const key of Object.keys(valueTypes)) {
        // @ts-expect-error
        if (newVal.style[key] === undefined) continue
        // @ts-expect-error
        if (!newVal.style[key]) state[key] = newVal.style[key]
      }
    },
    {
      immediate: true,
    },
  )

  watch(style, (newValue) => {
    if (!targetRef || !targetRef.value || !newValue) return

    Object.assign(targetRef.value.style, newValue)
  })

  return {
    style: state,
  }
}
