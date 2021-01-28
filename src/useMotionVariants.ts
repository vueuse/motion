import { MaybeRef } from '@vueuse/shared'
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  Ref,
  ref,
} from 'vue'
import { MotionVariants, Variant } from './types/variants'
import { UseMotionOptions } from './useMotion'

export function useMotionVariants<T extends MotionVariants>(
  variants: MaybeRef<T> = {} as MaybeRef<T>,
  initial: MaybeRef<keyof T> = 'initial',
  options: UseMotionOptions = {
    lifeCycleHooks: true,
  },
) {
  const variantsRef = ref(variants) as Ref<T>

  const variant = ref(initial) as Ref<keyof T>

  const state = computed<Variant | undefined>(() => {
    if (!variant.value) return undefined

    return variantsRef.value[variant.value]
  })

  if (options.lifeCycleHooks) {
    // Set initial before the element is mounted
    if (variantsRef.value.initial)
      onBeforeMount(() => (variant.value = 'initial'))

    // Set enter animation, once the element is mounted
    if (variantsRef.value.enter) onMounted(() => (variant.value = 'enter'))

    // Set the leave animation, before the element is unmounted
    if (variantsRef.value.leave)
      onBeforeUnmount(() => (variant.value = 'leave'))
  }

  return {
    state,
    variant,
  }
}
