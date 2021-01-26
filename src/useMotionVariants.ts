import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'
import { MotionVariants, Variant } from './types'

export const useMotionVariants = (variants: MotionVariants) => {
  const currentVariantName = ref<string>('initial')

  const currentVariant = computed(() => {
    return variants[currentVariantName.value]
  })

  const set = (variant: string) => {
    let newVariant: Variant = variants[variant]

    if (!newVariant) {
      throw new Error(`The variant ${variant} cannot be found.`)
    }

    currentVariantName.value = variant
  }

  if (variants.initial) onBeforeMount(() => set('initial'))

  if (variants.enter) onMounted(() => set('enter'))

  if (variants.exit) onBeforeUnmount(() => set('exit'))

  return {
    currentVariant,
    set,
  }
}
