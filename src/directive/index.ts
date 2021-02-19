import { Directive, ref } from 'vue-demi'
import { motionState } from '../features/state'
import { MotionVariants } from '../types'
import { useMotion } from '../useMotion'
import { resolveVariants } from '../utils/directive'

export const directive = (
  variants?: MotionVariants,
): Directive<HTMLElement | SVGElement> => ({
  created(el, binding, node) {
    // Initialize variants with argument
    const variantsRef = ref<MotionVariants>(variants || {})

    // Resolve variants from node props
    resolveVariants(node, variantsRef)

    // Create motion instance
    const motionInstance = useMotion(el, variantsRef)

    // Set the global state reference if the name is set through v-motion="`value`"
    if (binding.value) motionState[binding.value] = motionInstance
  },
  unmounted(_, binding) {
    // Check if motion state has the current element as reference
    if (binding.value && motionState[binding.value])
      // Delete the reference from motion state
      delete motionState[binding.value]
  },
})

export default directive
