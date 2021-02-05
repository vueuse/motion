import { MaybeRef, useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue-demi'
import { TargetType, MotionVariants } from '../types'

export function registerVisibilityHooks<T extends MotionVariants>(
  target: MaybeRef<TargetType>,
  variants: MaybeRef<T> = {} as MaybeRef<T>,
  set: (name: keyof T) => void,
) {
  // Local target ref
  const targetRef = ref(target)
  // Variants as ref
  const variantsRef = ref(variants)

  // Bind intersection observer on target
  const { stop } = useIntersectionObserver(
    targetRef,
    ([{ isIntersecting }]) => {
      if (variantsRef.value?.visible) {
        if (isIntersecting) {
          set('visible')
        } else {
          set('initial')
        }
      }
    },
  )

  return {
    stop,
  }
}
