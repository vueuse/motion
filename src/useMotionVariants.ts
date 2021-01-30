import { MaybeRef } from '@vueuse/shared'
import { computed, Ref, ref } from 'vue'
import { MotionVariants, Variant } from './types/variants'

/**
 * A Composable handling variants selection and features.
 *
 * @param variants
 * @param initial
 * @param options
 */
export function useMotionVariants<T extends MotionVariants>(
  variants: MaybeRef<T> = {} as MaybeRef<T>,
  initial: MaybeRef<keyof T> = 'initial',
) {
  // Variants as ref
  const variantsRef = ref(variants) as Ref<T>

  // Current variant string
  const variant = ref(initial) as Ref<keyof T>

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
