import { MaybeRef, tryOnUnmounted, useIntersectionObserver } from '@vueuse/core'
import { ref, watch } from 'vue-demi'
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
  // Current observer stop function
  const _stop = ref<() => void>()

  const stopVisibilityWatch = watch(
    [variantsRef, targetRef],
    () => {
      if (!variantsRef.value || !variantsRef.value.visible || !targetRef) {
        if (_stop.value) _stop.value()
        _stop.value = undefined
        return
      }

      // Bind intersection observer on target
      const { stop } = useIntersectionObserver(
        targetRef,
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            set('visible')
          } else set('initial')
        },
      )

      _stop.value = stop
    },
    { immediate: true, flush: 'pre' },
  )

  tryOnUnmounted(() => {
    if (_stop && _stop.value) {
      _stop.value()
    }

    stopVisibilityWatch()
  })
}
