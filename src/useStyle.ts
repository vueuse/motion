import { MaybeRef } from '@vueuse/shared'
import { reactive, ref, watch } from 'vue'
import { CSSProperties } from './types'

type StyleEntryProps = [key: string, value: string | undefined | number]

const isValidStyleEntry = ([key, value]: StyleEntryProps) =>
  // @ts-expect-error
  key && key !== '' && value && value !== '' && isNaN(key)

export const useStyle = (target: MaybeRef<HTMLElement | null | undefined>) => {
  const style = reactive<CSSProperties>({})

  const targetRef = ref(target)

  watch(
    targetRef,
    (newValue) => {
      if (!newValue) return

      Object.entries(newValue.style).forEach(([key, value]) => {
        if (!isValidStyleEntry([key, value])) return

        // @ts-expect-error
        style[key] = value
      })
    },
    {
      immediate: true,
    },
  )

  watch(
    style,
    (newValue) => {
      if (!targetRef || !targetRef.value || !targetRef.value.style) return

      for (const [key, value] of Object.entries(newValue)) {
        if (!isValidStyleEntry([key, value])) return

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
