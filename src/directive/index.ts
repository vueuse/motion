import { Directive, DirectiveBinding, ref, set as __set, VNode } from 'vue-demi'
import { motionState } from '../features/state'
import { MotionVariants } from '../types'
import { useMotion } from '../useMotion'
import { resolveVariants } from '../utils/directive'

export const directive = (
  variants?: MotionVariants,
): Directive<HTMLElement | SVGElement> => {
  const register = (
    el: HTMLElement | SVGElement,
    binding: DirectiveBinding,
    node: VNode<
      any,
      HTMLElement | SVGElement,
      {
        [key: string]: any
      }
    >,
  ) => {
    // Get instance key if possible (binding value or element key in case of v-for's)
    const key = binding.value || node.key

    // Cleanup previous motion instance if it exists
    if (key && motionState[key]) motionState[key].stop()

    // Initialize variants with argument
    const variantsRef = ref<MotionVariants>(variants || {})

    // Resolve variants from node props
    resolveVariants(node, variantsRef)

    // Create motion instance
    const motionInstance = useMotion(el, variantsRef)

    // Pass the motion instance via the local element
    // @ts-ignore
    el.motionInstance = motionInstance

    // Set the global state reference if the name is set through v-motion="`value`"
    if (key) __set(motionState, key, motionInstance)
  }

  const unregister = (
    el: HTMLElement | SVGElement,
    _: DirectiveBinding,
    __: VNode<
      any,
      HTMLElement | SVGElement,
      {
        [key: string]: any
      }
    >,
  ) => {
    // Cleanup the unregistered element motion instance
    // @ts-ignore
    if (el.motionInstance) el.motionInstance.stop()
  }

  return {
    // Vue 3 Directive Hooks
    created: register,
    unmounted: unregister,
    // Vue 2 Directive Hooks
    // For Nuxt & Vue 2 compatibility
    // @ts-expect-error
    bind: register,
    unbind: unregister,
  }
}

export default directive
