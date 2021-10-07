import { noop, useIntersectionObserver } from '@vueuse/core'
import { unref, nextTick } from 'vue-demi'
import { MotionInstance, MotionVariants } from '../types'

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
        variant.value = 'initial'

        if (isIntersecting) {
          nextTick(() => (variant.value = 'visible'))
        }
      },
    )

    stop = stopObserver
  }

  return {
    stop,
  }
}
