import { Directive, ref } from 'vue'
import { MotionVariants } from '../types/variants'
import { useMotion } from '../useMotion'

const directivePropsKeys = ['initial', 'enter', 'leave', 'visible']

const getVariantsRef = (node: any) => {
  const variantsRef = ref<MotionVariants>({})

  variantsRef.value = directivePropsKeys.reduce<MotionVariants>(
    (prev, curr) => {
      if (node && node.props && node.props[curr]) {
        prev[curr] = node.props[curr]
      }

      return prev
    },
    {},
  )

  return variantsRef
}

export const directive: Directive = {
  created(el, binding, node) {
    const refName: string = binding.value

    const targetRef = ref<HTMLElement>(el)

    const motionRef = useMotion(targetRef, getVariantsRef(node))

    if (binding && binding.instance) {
      if (!binding.instance.$motions) {
        binding.instance.$motions = {}
      }

      binding.instance.$motions[refName] = motionRef
    }
  },
}

export default directive
