import { MaybeRef } from '@vueuse/shared'
import { ComputedRef, Ref, ref } from 'vue-demi'
import { registerEventListeners } from './features/eventListeners'
import { registerLifeCycleHooks } from './features/lifeCycleHooks'
import { registerVariantsSync } from './features/syncVariants'
import { registerVisibilityHooks } from './features/visibilityHooks'
import { TargetType } from './types/instance'
import { MotionVariants, Variant } from './types/variants'
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

  // Local helper to update the variant
  const set = (name: keyof T) => (variant.value = name)

  // Lifecycle hooks bindings
  if (options.lifeCycleHooks) {
    registerLifeCycleHooks(targetRef, variantsRef, set)
  }

  if (options.syncVariants) {
    registerVariantsSync(currentVariant, controls)
  }

  // Visibility hooks
  if (options.visibilityHooks) {
    registerVisibilityHooks(targetRef, variantsRef, set)
  }

  // Event listeners
  if (options.eventListeners) {
    registerEventListeners(targetRef, variants, currentVariant, controls.apply)
  }
}
