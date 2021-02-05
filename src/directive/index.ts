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

export const directive: Directive<HTMLElement | SVGElement> = {
  created(el, binding, node) {
    const variantsRef = ref<MotionVariants>({})

    if (node && node.props) {
      if (node.props['variants']) {
        // If variant are passed through a single object reference, use it.
        variantsRef.value = node.props['variants']
      } else {
        // Retrieve the directive props keys, looking for each reference.
        variantsRef.value = directivePropsKeys.reduce<MotionVariants>(
          (prev, curr) => {
            if (node.props && node.props[curr]) {
              prev[curr] = node.props[curr]
            }

            return prev
          },
          {},
        )
      }
    }

    const motionRef = useMotion(el, variantsRef)

    // Set the global state reference if the name is set through v-motion="`value`"
    if (binding.value) motionState[binding.value] = motionRef
  },
}

export default directive
