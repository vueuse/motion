import { isNumber, isObject } from '@vueuse/core'
import type { Ref, VNode } from 'vue-demi'
import type { MotionVariants } from '../types'

const directivePropsKeys = [
  'initial',
  'enter',
  'leave',
  'visible',
  'visible-once',
  'hovered',
  'tapped',
  'focused',
  'delay',
]

export const resolveVariants = (
  node: VNode<any, HTMLElement | SVGElement, Record<string, any>>,
  variantsRef: Ref<MotionVariants>,
) => {
  // This is done to achieve compat with Vue 2 & 3
  // node.props = Vue 3 element props location
  // node.data.attrs = Vue 2 element props location
  const target = node.props
    ? node.props // @ts-expect-error - Compatibility (Vue 3)
    : node.data && node.data.attrs // @ts-expect-error - Compatibility (Vue 2)
      ? node.data.attrs
      : {}

  if (target) {
    if (target.variants && isObject(target.variants)) {
      // If variant are passed through a single object reference, initialize with it
      variantsRef.value = {
        ...variantsRef.value,
        ...target.variants,
      }
    }

    // Loop on directive prop keys, add them to the local variantsRef if defined
    directivePropsKeys.forEach((key) => {
      if (key === 'delay') {
        if (target && target[key] && isNumber(target[key])) {
          const delay = target[key]

          if (variantsRef && variantsRef.value) {
            if (variantsRef.value.enter) {
              if (!variantsRef.value.enter.transition)
                variantsRef.value.enter.transition = {}

              variantsRef.value.enter.transition = {
                ...variantsRef.value.enter.transition,
                delay,
              }
            }

            if (variantsRef.value.visible) {
              if (!variantsRef.value.visible.transition)
                variantsRef.value.visible.transition = {}

              variantsRef.value.visible.transition = {
                ...variantsRef.value.visible.transition,
                delay,
              }
            }

            if (variantsRef.value.visibleOnce) {
              if (!variantsRef.value.visibleOnce.transition) {
                variantsRef.value.visibleOnce.transition = {}
              }

              variantsRef.value.visibleOnce.transition = {
                ...variantsRef.value.visibleOnce.transition,
                delay,
              }
            }
          }
        }

        return
      }

      if (key === 'visible-once') key = 'visibleOnce'

      if (target && target[key] && isObject(target[key])) {
        variantsRef.value[key] = target[key]
    })
  }
}
