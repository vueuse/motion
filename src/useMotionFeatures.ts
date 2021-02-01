import { MaybeRef } from '@vueuse/shared'
import { Ref, ref } from 'vue'
import { registerLifeCycleHooks } from './features/lifeCycleHooks'
import { registerVisibilityHooks } from './features/visibilityHooks'
import { TargetType } from './types/instance'
import { MotionVariants } from './types/variants'
import { UseMotionOptions } from './useMotion'

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
  options: UseMotionOptions = {
    lifeCycleHooks: true,
    visibilityHooks: true,
  },
) {
  // Local variants ref
  const targetRef = ref(target)
  const variantsRef = ref(variants) as Ref<T>

  // Local helper to update the variant
  const set = (name: keyof T) => (variant.value = name)

  // Local helper to revert to the initial state
  const revert = () => {
    if (variantsRef.value) {
      if (variantsRef.value.visible) {
        set('visible')
      } else if (variantsRef.value.enter) {
        set('enter')
      } else if (variantsRef.value.initial) {
        set('initial')
      }
    }
  }

  // Lifecycle hooks bindings
  if (options.lifeCycleHooks) {
    registerLifeCycleHooks(targetRef, variantsRef, set)
  }

  // Visibility hooks
  if (options.visibilityHooks) {
    registerVisibilityHooks(targetRef, variantsRef, set, revert)
  }
}
