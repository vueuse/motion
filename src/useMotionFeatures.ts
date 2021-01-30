import { useIntersectionObserver } from '@vueuse/core'
import { MaybeRef } from '@vueuse/shared'
import { onBeforeMount, onBeforeUnmount, onMounted, Ref, ref } from 'vue'
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
  target: MaybeRef<HTMLElement | null | undefined>,
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

  // Lifecycle hooks bindings
  if (
    options.lifeCycleHooks &&
    variantsRef.value &&
    (variantsRef.value.enter || variantsRef.value.leave)
  ) {
    // Set initial before the element is mounted
    if (variantsRef.value.initial) onBeforeMount(() => set('initial'))

    // Set enter animation, once the element is mounted
    if (variantsRef.value.enter) onMounted(() => set('enter'))

    // Set the leave animation, before the element is unmounted
    if (variantsRef.value.leave) onBeforeUnmount(() => set('leave'))
  }

  // Visibility hooks
  if (
    options.visibilityHooks &&
    variantsRef.value &&
    variantsRef.value.visible
  ) {
    // Bind intersection observer on target
    useIntersectionObserver(targetRef, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        set('visible')
      } else if (variantsRef.value.initial) set('initial')
    })
  }
}
