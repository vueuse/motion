import { MaybeRef } from '@vueuse/shared'
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'
import { MotionVariants, Variant } from './types/variants'

export const useMotionVariants = (
  variants: MaybeRef<MotionVariants | null | undefined> = {},
) => {
  const variantsRef = ref(variants)

  const currentVariantName = ref<string>('initial')

  const currentVariant = computed<Variant | undefined>(() => {
    if (
      !variantsRef ||
      !variantsRef.value ||
      !variantsRef.value[currentVariantName.value]
    )
      return undefined

    return variantsRef.value[currentVariantName.value]
  })

  const set = (variant: string) => {
    if (!variantsRef || !variantsRef.value || !variantsRef.value[variant]) {
      throw new Error(`The variant ${variant} cannot be found.`)
    }

    currentVariantName.value = variant
  }

  if (variantsRef && variantsRef.value && variantsRef.value.initial)
    onBeforeMount(() => set('initial'))

  if (variantsRef && variantsRef.value && variantsRef.value.enter)
    onMounted(() => set('enter'))

  if (variantsRef && variantsRef.value && variantsRef.value.leave)
    onBeforeUnmount(() => set('leave'))

  return {
    currentVariant,
    set,
  }
}
