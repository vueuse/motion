import { noop, unrefElement, useIntersectionObserver } from '@vueuse/core'
import { unref, watch } from 'vue-demi'
import { MotionInstance, MotionVariants } from '../types'

export function registerVisibilityHooks<T extends MotionVariants>({
  target,
  variants,
  variant,
}: MotionInstance<T>) {
  const _variants = unref(variants)
  let _stopObserver: () => void = noop

  const _stopWatcher = watch(
    () => unrefElement(target),
    (el) => {
      if (!el) return

      // Bind intersection observer on target
      _stopObserver = useIntersectionObserver(
        target,
        ([{ isIntersecting }]) => {
          if (_variants && _variants.visible) {
            if (isIntersecting) {
              variant.value = 'visible'
            } else {
              variant.value = 'initial'
            }
          }
        },
      ).stop
    },
    {
      immediate: true,
    },
  )

  /**
   * Stop both the watcher and the intersection observer.
   */
  const stop = () => {
    _stopObserver()
    _stopWatcher()
  }

  return {
    stop,
  }
}
