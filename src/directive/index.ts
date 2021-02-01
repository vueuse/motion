import { motionState } from '@lib/features/state'
import { Directive, ref } from 'vue'
import { MotionVariants } from '../types/variants'
import { useMotion } from '../useMotion'

const directivePropsKeys = ['initial', 'enter', 'leave', 'visible']

export const directive: Directive<HTMLElement | SVGElement> = {
  created(el, binding, node) {
    const variantsRef = ref<MotionVariants>({})

    variantsRef.value = directivePropsKeys.reduce<MotionVariants>(
      (prev, curr) => {
        if (node.props && node.props[curr]) {
          prev[curr] = node.props[curr]
        }

        return prev
      },
      {},
    )

    const motionRef = useMotion(el, variantsRef)

    if (binding.value) motionState[binding.value] = motionRef
  },
}

export default directive
