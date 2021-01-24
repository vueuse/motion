import { MaybeRef } from '@vueuse/shared'
import { reactive, ref, watch } from 'vue'

const isValidStyleEntry = ([key, value]: string[]) =>
  // @ts-expect-error
  key && key !== '' && value && value !== '' && isNaN(key)

export const useStyle = (target: MaybeRef<HTMLElement | null | undefined>) => {
  const style = reactive<CSSStyleDeclaration>({} as CSSStyleDeclaration)
  const targetRef = ref(target)

  watch(targetRef, (newValue) => {
    if (!newValue) return

    Object.entries(newValue.style).forEach(([key, value]) => {
      if (!isValidStyleEntry([key, value])) return

      // @ts-expect-error
      style[key] = value
    })
  })

  watch(
    style,
    (newValue) => {
      if (!targetRef || !targetRef.value || !targetRef.value.style) return

      for (const [key, value] of Object.entries(newValue)) {
        // @ts-expect-error
        targetRef.value.style[key] = value
      }
    },
    {
      immediate: true,
      deep: true,
    },
  )

  return { style }
}
