import { unref, watch } from 'vue'
import type { MotionInstance, MotionVariants } from '../types'

export function registerLifeCycleHooks<T extends string, V extends MotionVariants<T>>({ set, target, variants, variant }: MotionInstance<T, V>) {
  const _variants = unref(variants)

  watch(
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
}
