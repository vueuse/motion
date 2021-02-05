import { useIntersectionObserver } from '@vueuse/core'
import { MotionVariants, MotionInstance } from '../types'

export function registerVisibilityHooks<T extends MotionVariants>({
  target,
  variants,
  variant,
}: MotionInstance<T>) {
  // Bind intersection observer on target
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    if (variants.value?.visible) {
      if (isIntersecting) {
        variant.value = 'visible'
      } else {
        variant.value = 'initial'
      }
    }
  })

  return {
    stop,
  }
}
