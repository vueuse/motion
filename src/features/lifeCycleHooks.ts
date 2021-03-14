import { nextTick, unref, watch } from 'vue-demi'
import { MotionInstance, MotionVariants } from '../types'

export function registerLifeCycleHooks<T extends MotionVariants>({
  target,
  variants,
  variant,
}: MotionInstance<T>) {
  const _variants = unref(variants)

  const stop = watch(
    () => target,
    () => {
      // Lifecycle hooks bindings
      if (_variants && _variants.enter) {
        // Set initial before the element is mounted
        if (_variants.initial) variant.value = 'initial'

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
