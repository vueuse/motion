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
  if (_variants && _variants.visible) {
    const { stop: stopObserver } = useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting) variant.value = 'visible'
        else variant.value = 'initial'
      },
    )

    stop = stopObserver
  }

  if (_variants && _variants.appear) {
    const { stop: stopObserver } = useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          variant.value = 'appear'
          stop()
        }
      },
    )

    stop = stopObserver
  }

  return {
    stop,
  }
}
