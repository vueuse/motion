import type { Directive, DirectiveBinding, Ref, VNode } from 'vue'
import defu from 'defu'
import { ref, toRaw, unref } from 'vue'
import { motionState } from '../features/state'
import type { MotionInstance, MotionVariants } from '../types'
import { useMotion } from '../useMotion'
import { resolveVariants } from '../utils/directive'
import { variantToStyle } from '../utils/transform'
import { registerVisibilityHooks } from '../features/visibilityHooks'

export function directive<T extends string>(
  variants?: MotionVariants<T>,
  isPreset = false,
): Directive<HTMLElement | SVGElement> {
  const register = (el: HTMLElement | SVGElement, binding: DirectiveBinding, node: VNode<any, HTMLElement | SVGElement, Record<string, any>>) => {
    // Get instance key if possible (binding value or element key in case of v-for's)
    const key = (binding.value && typeof binding.value === 'string' ? binding.value : node.key) as string

    // Cleanup previous motion instance if it exists
    if (key && motionState[key])
      motionState[key].stop()

    // We deep copy presets to prevent global mutation
    const variantsObject = isPreset ? structuredClone(toRaw(variants) || {}) : variants || {}

    // Initialize variants with argument
    const variantsRef = ref(variantsObject) as Ref<MotionVariants<T>>

    // Set variants from v-motion binding
    if (typeof binding.value === 'object')
      variantsRef.value = binding.value

    // Resolve variants from node props
    resolveVariants<T>(node, variantsRef)

    // Disable visibilityHooks, these will be registered in `mounted`
    const motionOptions = { eventListeners: true, lifeCycleHooks: true, syncVariants: true, visibilityHooks: false }

    // Create motion instance
    const motionInstance = useMotion(
      el,
      variantsRef as MotionVariants<T>,
      motionOptions,
    )

    // Pass the motion instance via the local element
    // @ts-expect-error - we know that the element is a HTMLElement
    el.motionInstance = motionInstance

    // Set the global state reference if the name is set through v-motion="`value`"
    if (key)
      motionState[key] = motionInstance
  }

  const mounted = (
    el: (HTMLElement | SVGElement) & { motionInstance?: MotionInstance<string, MotionVariants<T>> },
    _binding: DirectiveBinding,
    _node: VNode<any, (HTMLElement | SVGElement) & { motionInstance?: MotionInstance<string, MotionVariants<T>> }, Record<string, any>>,
  ) => {
    // Visibility hooks
    // eslint-disable-next-line ts/no-unused-expressions
    el.motionInstance && registerVisibilityHooks(el.motionInstance)
  }

  return {
    created: register,
    mounted,
    getSSRProps(binding, node) {
      // Get initial value from binding
      let { initial: bindingInitial } = binding.value || (node && node?.props) || {}

      bindingInitial = unref(bindingInitial)

      // Merge it with directive initial variants
      const initial = defu({}, variants?.initial || {}, bindingInitial || {})

      // No initial
      if (!initial || Object.keys(initial).length === 0)
        return

      // Resolve variant
      const style = variantToStyle(initial)

      return {
        style,
      }
    },
  }
}

export default directive
