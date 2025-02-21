import type { MaybeRef } from '@vueuse/core'
import type { Ref } from 'vue'
import type { MotionVariants, Variant } from './types'
import { computed, ref, unref } from 'vue'

/**
 * A Composable handling variants selection and features.
 */
export function useMotionVariants<T extends string, V extends MotionVariants<T>>(variants: MaybeRef<V> = {} as MaybeRef<V>) {
  // Unref variants
  const _variants = unref(variants)

  // Current variant string
  const variant = ref() as Ref<keyof V>

  // Current variant state
  const state = computed<Variant | undefined>(() => {
    if (!variant.value)
      return

    return _variants[variant.value]
  })

  return {
    state,
    variant,
  }
}
