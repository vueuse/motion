import { Directive, ref } from 'vue'
import { useMotion } from '../'
import { MotionVariants } from '../types/variants'

const directivePropsKeys = ['initial', 'enter', 'leave']

const getMotionRef = (binding: any, node: any) => {
  if (!node || !node.props || !node.props.ref) {
    throw new Error(
      'You need to specify a ref on the element when using v-motion.',
    )
  }

  return binding.instance.$motions[node.props.ref.toString()]
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

export function directive(): Directive {
  return {
    created(el, binding, node) {
      if (!node || !node.props || !node.props.ref) {
        throw new Error(
          'You need to specify a ref on the element when using v-motion.',
        )
      }

      const targetRef = ref<HTMLElement>(el)

      const motionRef = useMotion(targetRef, getVariantsRef(node), {
        lifeCycleHooks: false,
      })

      if (binding && binding.instance) {
        if (!binding.instance.$motions) {
          binding.instance.$motions = {}
        }

        binding.instance.$motions[node.props.ref.toString()] = motionRef
      }
    },
    beforeMount(el, binding, node) {
      const variants = getVariantsRef(node)
      const motion = getMotionRef(binding, node)

      console.log({ variants, motion })

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
    unmounted() {},
  }
}

export default directive
