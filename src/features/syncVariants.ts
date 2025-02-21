import type { MotionInstance, MotionVariants } from '../types'
import { watch } from 'vue'

export function registerVariantsSync<T extends string, V extends MotionVariants<T>>({ state, apply }: MotionInstance<T, V>) {
  // Watch for variant changes and apply the new one
  watch(
    state,
    (newVal) => {
      if (newVal)
        apply(newVal)
    },
    {
      immediate: true,
    },
  )
}
