import type { Directive, DirectiveBinding, VNode } from 'vue-demi'
import defu from 'defu'
import { set as __set, ref, unref } from 'vue-demi'
import { motionState } from '../features/state'
import type { MotionVariants } from '../types'
import { useMotion } from '../useMotion'
import { resolveVariants } from '../utils/directive'
import { reactiveStyle, reactiveTransform } from '../index'
import { splitValues } from '../utils/transform'

export const directive = (
  variants?: MotionVariants,
): Directive<HTMLElement | SVGElement> => {
  const register = (
    el: HTMLElement | SVGElement,
    binding: DirectiveBinding,
    node: VNode<any, HTMLElement | SVGElement, Record<string, any>>,
  ) => {
    // Get instance key if possible (binding value or element key in case of v-for's)
    const key = (
      binding.value && typeof binding.value === 'string'
        ? binding.value
        : node.key
    ) as string

    // Cleanup previous motion instance if it exists
    if (key && motionState[key]) motionState[key].stop()

    // Initialize variants with argument
    const variantsRef = ref<MotionVariants>(variants || {})

    // Set variants from v-motion binding
    if (typeof binding.value === 'object') variantsRef.value = binding.value

    // Resolve variants from node props
    resolveVariants(node, variantsRef)

    // Create motion instance
    const motionInstance = useMotion(el, variantsRef)

    // Pass the motion instance via the local element
    // @ts-expect-error - we know that the element is a HTMLElement
    el.motionInstance = motionInstance

    // Set the global state reference if the name is set through v-motion="`value`"
    if (key) __set(motionState, key, motionInstance)
  }

  const unregister = (el: HTMLElement | SVGElement) => {
    // Cleanup the unregistered element motion instance
    // @ts-expect-error - we know that the element is a HTMLElement
    if (el.motionInstance) el.motionInstance.stop()
  }

  return {
    // Vue 3 Directive Hooks
    created: register,
    unmounted: unregister,
    // Vue 2 Directive Hooks
    // For Nuxt & Vue 2 Compatibility
    // @ts-expect-error - Compatibility
    bind: register,
    unbind: unregister,
    // Vue 3 SSR
    getSSRProps(binding, node) {
      // Get initial value from binding
      let { initial: bindingInitial } = binding.value || (node && node.props) || {}

      bindingInitial = unref(bindingInitial)

      // Merge it with directive initial variants
      const initial = defu(variants?.initial || {}, bindingInitial || {})

      // No initial
      if (!initial || Object.keys(initial).length === 0) return

      // Split values between `transform` and `style`
      const { transform: _transform, style: _style } = splitValues(initial)

      // Generate transform string
      const { transform } = reactiveTransform(_transform)

      // Generate style string
      const { style } = reactiveStyle(_style)

      // @ts-expect-error - Set transform from style
      if (transform.value) style.value.transform = transform.value

      return {
        style: style.value,
      }
    },
  }
}

export default directive
