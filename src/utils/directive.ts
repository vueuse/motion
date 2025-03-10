import { isObject } from '@vueuse/core'
import type { Ref, VNode } from 'vue'
import type { MotionVariants } from '../types'

const transitionKeys = ['delay', 'duration'] as const
const directivePropsKeys = ['initial', 'enter', 'leave', 'visible', 'visible-once', 'visibleOnce', 'hovered', 'tapped', 'focused', ...transitionKeys] as const

function isTransitionKey(val: any): val is 'delay' | 'duration' {
  return transitionKeys.includes(val)
}

export function resolveVariants<T extends string>(node: VNode<any, HTMLElement | SVGElement, Record<string, any>>, variantsRef: Ref<MotionVariants<T>>) {
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
    for (let key of directivePropsKeys) {
      if (!target || !target[key])
        continue

      if (isTransitionKey(key) && typeof target[key] === 'number') {
        // Apply transition property to existing variants where applicable
        for (const variantKey of ['enter', 'visible', 'visibleOnce'] as const) {
          const variantConfig = variantsRef.value[variantKey]

          if (variantConfig == null)
            continue

          variantConfig.transition ??= {}
          // @ts-expect-error `duration` does not exist on `inertia` type transitions
          variantConfig.transition[key] = target[key]
        }

        continue
      }

      if (isObject(target[key])) {
        const prop = target[key]
        if (key === 'visible-once')
          key = 'visibleOnce'
        variantsRef.value[key as keyof MotionVariants<T>] = prop
      }
    }
  }
}
