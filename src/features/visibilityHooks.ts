import { noop, useIntersectionObserver } from '@vueuse/core'
import { unref } from 'vue-demi'
import type { MotionInstance, MotionVariants } from '../types'

export function registerVisibilityHooks<T extends MotionVariants>({
  target,
  variants,
  variant,
}: MotionInstance<T>) {
  const _variants = unref(variants)
  let stop = noop

  // Bind intersection observer on target
  if (_variants && (_variants.visible || _variants.visibleOnce)) {
    const { stop: stopObserver } = useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (_variants.visible) {
          if (isIntersecting) variant.value = 'visible'
          else variant.value = 'initial'
        }
        else if (_variants.visibleOnce) {
          if (isIntersecting) {
            if (variant.value !== 'visibleOnce') variant.value = 'visibleOnce'
          }
          else {
            if (!variant.value) variant.value = 'initial'
          }
        }
      },
    )

    stop = stopObserver
  }

  return {
    stop,
  }
}
