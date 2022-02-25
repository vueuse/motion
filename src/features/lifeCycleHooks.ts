import { unref, watch } from 'vue-demi'
import type { MotionInstance, MotionVariants } from '../types'

export function registerLifeCycleHooks<T extends MotionVariants>({
  set,
  target,
  variants,
  variant,
}: MotionInstance<T>) {
  const _variants = unref(variants)

  const stop = watch(
    () => target,
    () => {
      // Cancel cycle if no variants
      if (!_variants) return

      // Set initial before the element is mounted
      if (_variants.initial) set('initial')

      // Lifecycle hooks bindings
      if (_variants.enter) variant.value = 'enter'
    },
    {
      immediate: true,
      flush: 'pre',
    },
  )

  return { stop }
}
