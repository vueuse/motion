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

export function useMotionVariants<T extends MotionVariants>(
  variants: MaybeRef<T> = {} as MaybeRef<T>,
  initial: MaybeRef<keyof T> = 'initial',
) {
  const variantsRef = ref(variants) as Ref<T>

  const name = ref(initial) as Ref<keyof T>

  const state = computed<Variant | undefined>(() => {
    if (!name.value) return undefined

    return variantsRef.value[name.value]
  })

  // Set initial before the element is mounted
  if (variantsRef.value.initial) onBeforeMount(() => (name.value = 'initial'))

  // Set enter animation, once the element is mounted
  if (variantsRef.value.enter) onMounted(() => (name.value = 'enter'))

  // Set the leave animation, before the element is unmounted
  if (variantsRef.value.leave) onBeforeUnmount(() => (name.value = 'leave'))

  return {
    state,
    name,
  }
}
