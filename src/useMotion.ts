import { MaybeRef } from '@vueuse/core'
import { Ref, ref } from 'vue-demi'
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
import { resolveElement } from './utils/element'

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
  // Base references
  const variantsRef = ref(variants) as Ref<T>
  const targetRef = resolveElement(target)

  // Reactive styling and transform
  const { motionProperties } = useMotionProperties(targetRef)

  // Variants manager
  const { variant, state } = useMotionVariants<T>(variantsRef)

  // Motion controls, synchronized with motion properties and variants
  const controls = useMotionControls<T>(motionProperties, variantsRef)

  // Create motion instance
  const instance: MotionInstance<T> = {
    target: targetRef,
    variant,
    variants: variantsRef,
    state,
    motionProperties,
    ...controls,
  }

  // Bind features
  useMotionFeatures(instance, options)

  return instance
}
