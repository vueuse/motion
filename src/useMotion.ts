import type { MaybeRef } from 'vue'
import type { MotionInstance, MotionVariants, PermissiveTarget, UseMotionOptions } from './types'
import { useMotionControls } from './useMotionControls'
import { useMotionFeatures } from './useMotionFeatures'
import { useMotionProperties } from './useMotionProperties'
import { useMotionVariants } from './useMotionVariants'

/**
 * A Vue Composable that put your components in motion.
 *
 * @docs https://motion.vueuse.js.org
 *
 * @param target
 * @param variants
 * @param options
 */
export function useMotion<T extends string, V extends MotionVariants<T>>(
  target: MaybeRef<PermissiveTarget>,
  variants: MaybeRef<V> = {} as MaybeRef<V>,
  options?: UseMotionOptions,
) {
  // Reactive styling and transform
  const { motionProperties } = useMotionProperties(target)

  // Variants manager
  const { variant, state } = useMotionVariants<T, V>(variants)

  // Motion controls, synchronized with motion properties and variants
  const controls = useMotionControls<T, V>(motionProperties, variants)

  // Create motion instance
  const instance: MotionInstance<T, V> = {
    target,
    variant,
    variants,
    state,
    motionProperties,
    ...controls,
  }

  // Bind features
  useMotionFeatures(instance, options)

  return instance
}
