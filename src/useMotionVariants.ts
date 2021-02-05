import { MaybeRef } from '@vueuse/core'
import { computed, Ref, ref } from 'vue-demi'
import { MotionVariants, Variant } from './types'

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
  // Variants as ref
  const variantsRef = ref(variants) as Ref<T>

  // Current variant string
  const variant = ref() as Ref<keyof T>

  // Current variant state
  const state = computed<Variant | undefined>(() => {
    if (!variant.value) return undefined

    return variantsRef.value[variant.value]
  })

  return {
    state,
    variant,
  }
}
