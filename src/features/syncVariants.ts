import { watch } from 'vue-demi'
import { MotionInstance, MotionVariants } from '../types'

export function registerVariantsSync<T extends MotionVariants>({
  state,
  apply,
}: MotionInstance<T>) {
  // Watch for variant changes and apply the new one
  const stop = watch(
    state,
    (newVal) => {
      if (newVal) apply(newVal)
    },
    {
      immediate: true,
    },
  )

  return { stop }
}
