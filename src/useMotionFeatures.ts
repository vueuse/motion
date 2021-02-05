import { MaybeRef } from '@vueuse/core'
import { ComputedRef, Ref, ref } from 'vue-demi'
import { registerEventListeners } from './features/eventListeners'
import { registerLifeCycleHooks } from './features/lifeCycleHooks'
import { registerVariantsSync } from './features/syncVariants'
import { registerVisibilityHooks } from './features/visibilityHooks'
import { TargetType } from './types'
import { MotionVariants, Variant } from './types'
import { UseMotionOptions } from './useMotion'
import { MotionControls } from './useMotionControls'

/**
 * A Composable executing resolved variants features from variants declarations.
 *
 * Supports:
 * - lifeCycleHooks: Bind the motion hooks to the component lifecycle hooks.
 *
 * @param variant
 * @param variants
 * @param options
 */
export function useMotionFeatures<T extends MotionVariants>(
  target: MaybeRef<TargetType>,
  variant: Ref<keyof T>,
  variants: MaybeRef<T> = {} as MaybeRef<T>,
  currentVariant: ComputedRef<Variant | undefined>,
  controls: MotionControls,
  options: UseMotionOptions = {
    syncVariants: true,
    lifeCycleHooks: true,
    visibilityHooks: true,
    eventListeners: true,
  },
) {
  // Local variants ref
  const targetRef = ref(target)
  const variantsRef = ref(variants) as Ref<T>

  // Lifecycle hooks bindings
  if (options.lifeCycleHooks) {
    registerLifeCycleHooks(targetRef, variantsRef, variant)
  }

  if (options.syncVariants) {
    registerVariantsSync(currentVariant, controls)
  }

  // Visibility hooks
  if (options.visibilityHooks) {
    registerVisibilityHooks(targetRef, variantsRef, variant)
  }

  // Event listeners
  if (options.eventListeners) {
    registerEventListeners(targetRef, variants, currentVariant, controls.apply)
  }
}
