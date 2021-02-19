import { isNumber, isObject } from '@vueuse/core'
import { Ref, VNode } from 'vue'
import { MotionVariants } from '../types'

const directivePropsKeys = [
  'initial',
  'enter',
  'leave',
  'visible',
  'hovered',
  'tapped',
  'focused',
  'delay',
]

export const resolveVariants = (
  node: VNode<
    any,
    HTMLElement | SVGElement,
    {
      [key: string]: any
    }
  >,
  variantsRef: Ref<MotionVariants>,
) => {
  if (node && node.props) {
    if (node.props['variants'] && isObject(node.props['variants'])) {
      // If variant are passed through a single object reference, initialize with it
      variantsRef.value = {
        ...variantsRef.value,
        ...node.props['variants'],
      }
    }

    // Loop on directive prop keys, add them to the local variantsRef if defined
    directivePropsKeys.forEach((key) => {
      if (key === 'delay') {
        if (node.props && node.props[key] && isNumber(node.props[key])) {
          const delay = node.props[key]

          if (variantsRef && variantsRef.value) {
            if (variantsRef.value.enter) {
              if (!variantsRef.value.enter.transition) {
                variantsRef.value.enter.transition = {}
              }

              variantsRef.value.enter.transition = {
                ...variantsRef.value.enter.transition,
                delay,
              }
            }

            if (variantsRef.value.visible) {
              if (!variantsRef.value.visible.transition) {
                variantsRef.value.visible.transition = {}
              }

              variantsRef.value.visible.transition = {
                ...variantsRef.value.visible.transition,
                delay,
              }
            }
          }
        }

        return
      }

      if (node.props && node.props[key] && isObject(node.props[key])) {
        variantsRef.value[key] = node.props[key]
      }
    })
  }
}
