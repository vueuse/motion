import { Directive, ref } from 'vue'
import { MotionVariants } from '../types/variants'
import { useMotion } from '../useMotion'

const directivePropsKeys = ['initial', 'enter', 'leave', 'visible']

const getMotionRef = (binding: any, node: any) => {
  const refName: string = binding.value

  return binding.instance.$motions[refName]
}

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

    const motionRef = useMotion(targetRef, getVariantsRef(node), {
      lifeCycleHooks: false,
      visibilityHooks: true,
    })

    if (binding && binding.instance) {
      if (!binding.instance.$motions) {
        binding.instance.$motions = {}
      }

      binding.instance.$motions[refName] = motionRef
    }
  },
  beforeMount(el, binding, node) {
    const variants = getVariantsRef(node)
    const motion = getMotionRef(binding, node)

    if (variants.value && variants.value['initial']) {
      motion.variant.value = 'initial'
    }
  },
  mounted(el, binding, node) {
    const variants = getVariantsRef(node)
    const motion = getMotionRef(binding, node)

    if (variants.value && variants.value['enter']) {
      motion.variant.value = 'enter'
    }
  },
  beforeUnmount(el, binding, node) {
    const variants = getVariantsRef(node)
    const motion = getMotionRef(binding, node)

    if (variants.value && variants.value['leave']) {
      motion.variant.value = 'leave'
    }
  },
}

export default directive
