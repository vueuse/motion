import { noop, useIntersectionObserver } from '@vueuse/core'
import { watch } from 'vue'
import { MotionInstance, MotionVariants } from '../types'

export function registerVisibilityHooks<T extends MotionVariants>({
  target,
  variants,
  variant,
}: MotionInstance<T>) {
  let _stopObserver: () => void = noop

  const _stopWatcher = watch(
    target,
    (newVal) => {
      if (!newVal) return

      // Bind intersection observer on target
      _stopObserver = useIntersectionObserver(
        target,
        ([{ isIntersecting }]) => {
          if (variants.value && variants.value.visible) {
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
