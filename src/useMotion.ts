import { MaybeRef } from '@vueuse/shared'
import { Ref, ref } from 'vue'
import { MotionVariants } from './types/variants'
import { useMotionControls } from './useMotionControls'
import { useMotionFeatures } from './useMotionFeatures'
import { useMotionProperties } from './useMotionProperties'
import { useMotionVariants } from './useMotionVariants'

export type UseMotionOptions = {
  lifeCycleHooks?: boolean
  visibilityHooks?: boolean
}

/**
 * A Vue Composable that put your components in motion.
 *
 * @docs https://vue-use-sound.netlify.app
 *
 * @param target
 * @param variants
 * @param options
 */
export function useMotion<T extends MotionVariants>(
  target: MaybeRef<HTMLElement | null | undefined>,
  variants: MaybeRef<T> = {} as MaybeRef<T>,
  options: UseMotionOptions = {
    lifeCycleHooks: true,
    visibilityHooks: true,
  },
) {
  // Base references
  const variantsRef = ref(variants) as Ref<T>
  const targetRef = ref(target)

  // Variants manager
  const { variant, state: currentVariant } = useMotionVariants<T>(
    variantsRef,
    'initial',
  )

  // Reactive styling and transform
  const { style, transform } = useMotionProperties(targetRef)

  // Bind features
  useMotionFeatures(targetRef, variant, variants, options)

  // Motion controls, synchronized with styling and variants
  const { stop } = useMotionControls(transform, style, currentVariant)

  return {
    variant,
    stop,
  }
}
