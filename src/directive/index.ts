import {
  del as __del,
  Directive,
  DirectiveBinding,
  ref,
  set as __set,
  VNode,
} from 'vue-demi'
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
    // Initialize variants with argument
    const variantsRef = ref<MotionVariants>(variants || {})

    // Resolve variants from node props
    resolveVariants(node, variantsRef)

    // Create motion instance
    const motionInstance = useMotion(el, variantsRef)

    // Set the global state reference if the name is set through v-motion="`value`"
    if (binding.value) __set(motionState, binding.value, motionInstance)
  }

  const unregister = (
    _: HTMLElement | SVGElement,
    binding: DirectiveBinding,
    __: VNode<
      any,
      HTMLElement | SVGElement,
      {
        [key: string]: any
      }
    >,
  ) => {
    // Check if motion state has the current element as reference
    if (binding.value && motionState[binding.value])
      __del(motionState, binding.value)
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
