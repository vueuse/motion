import { MaybeRef } from '@vueuse/shared'
import { ref } from 'vue'
import { MotionVariants } from './types/variants'
import { useMotionControls } from './useMotionControls'
import { useMotionProperties } from './useMotionProperties'
import { useMotionVariants } from './useMotionVariants'

export const useMotion = (
  target: MaybeRef<HTMLElement | null | undefined>,
  variants: MotionVariants = {},
) => {
  const targetRef = ref(target)

  // Variants manager
  const { set, currentVariant } = useMotionVariants(variants)

  // Reactive styling and transform
  const { style, transform } = useMotionProperties(targetRef)

  // Motion controls, synchronized with styling and variants
  const { stop } = useMotionControls(transform, style, currentVariant)

  return {
    set,
    stop,
  }
}
