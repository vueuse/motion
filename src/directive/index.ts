import { Directive, DirectiveBinding, ref, set as __set, VNode } from 'vue-demi'
import { motionState } from '../features/state'
import { MotionVariants } from '../types'
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
    node: VNode<
      any,
      HTMLElement | SVGElement,
      {
        [key: string]: any
      }
    >,
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
    if (typeof binding.value === 'object') {
      variantsRef.value = binding.value
    }

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
    // Vue 3 SSR
    getSSRProps(binding) {
      const { initial = {} } = binding.value

      if (Object.keys(initial).length === 0) return

      const { transform: _transform, style: _style } = splitValues(initial)

      const { transform } = reactiveTransform(_transform)

      const { style } = reactiveStyle(_style)

      // @ts-ignore
      if (transform.value) style.value.transform = transform.value

      return {
        style: style.value,
      }
    },
  }
}

export default directive
