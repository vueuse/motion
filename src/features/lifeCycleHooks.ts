import { nextTick, watch } from 'vue-demi'
import { MotionInstance, MotionVariants } from '../types'

export function registerLifeCycleHooks<T extends MotionVariants>({
  target,
  variants,
  variant,
}: MotionInstance<T>) {
  const stop = watch(
    target,
    () => {
      // Lifecycle hooks bindings
      if (variants.value && variants.value.enter) {
        // Set initial before the element is mounted
        if (variants.value.initial) variant.value = 'initial'

        // Set enter animation, once the element is mounted
        nextTick(() => (variant.value = 'enter'))
      }
    },
    {
      immediate: true,
      flush: 'pre',
    },
  )

  return { stop }
}
