import { isObject } from '@vueuse/core'
import { Directive, ref } from 'vue-demi'
import { motionState } from '../features/state'
import { MotionVariants } from '../types'
import { useMotion } from '../useMotion'

const directivePropsKeys = [
  'initial',
  'enter',
  'leave',
  'visible',
  'hovered',
  'tapped',
  'focused',
]

export const directive = (
  variants?: MotionVariants,
): Directive<HTMLElement | SVGElement> => ({
  created(el, binding, node) {
    // Initialize variants with argument
    const variantsRef = ref<MotionVariants>(variants || {})

    if (node && node.props) {
      if (node.props['variants'] && isObject(node.props['variants'])) {
        // If variant are passed through a single object reference, initialize with it
        variantsRef.value = { ...variantsRef.value, ...node.props['variants'] }
      }

      // Loop on directive prop keys, add them to the local variantsRef if defined
      directivePropsKeys.forEach((key) => {
        if (node.props && node.props[key] && isObject(node.props[key])) {
          variantsRef.value[key] = node.props[key]
        }
      })
    }

    const motionControls = useMotion(el, variantsRef)

    // Set the global state reference if the name is set through v-motion="`value`"
    if (binding.value) motionState[binding.value] = motionControls
  },
  unmounted(_, binding) {
    if (binding.value && motionState[binding.value])
      delete motionState[binding.value]
  },
})

export default directive
