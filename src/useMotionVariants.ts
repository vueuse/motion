import type { MaybeRef } from '@vueuse/core'
import type { Ref } from 'vue-demi'
import { computed, ref, unref } from 'vue-demi'
import type { MotionVariants, Variant } from './types'

/**
 * A Composable handling variants selection and features.
 *
 * @param variants
 * @param initial
 * @param options
 */
export function useMotionVariants<T extends MotionVariants>(
  variants: MaybeRef<T> = {} as MaybeRef<T>,
) {
  // Unref variants
  const _variants = unref(variants) as T

  // Current variant string
  const variant = ref() as Ref<keyof T>

  // Current variant state
  const state = computed<Variant | undefined>(() => {
    if (!variant.value) return

    return _variants[variant.value]
  })

  return {
    state,
    variant,
  }
}
