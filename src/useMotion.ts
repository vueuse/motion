import { MaybeRef } from '@vueuse/core'
import {
  MotionInstance,
  MotionVariants,
  PermissiveTarget,
  UseMotionOptions,
} from './types'
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
export function useMotion<T extends MotionVariants>(
  target: MaybeRef<PermissiveTarget>,
  variants: MaybeRef<T> = {} as MaybeRef<T>,
  options?: UseMotionOptions,
) {
  // Reactive styling and transform
  const { motionProperties } = useMotionProperties(target)

  // Variants manager
  const { variant, state } = useMotionVariants<T>(variants)

  // Motion controls, synchronized with motion properties and variants
  const controls = useMotionControls<T>(motionProperties, variants)

  // Create motion instance
  const instance: MotionInstance<T> = {
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
