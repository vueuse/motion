import { MaybeRef, tryOnUnmounted } from '@vueuse/core'
import { nextTick, Ref, ref, watch } from 'vue-demi'
import { TargetType, MotionVariants } from '../types'

export function registerLifeCycleHooks<T extends MotionVariants>(
  target: MaybeRef<TargetType>,
  variants: MaybeRef<T> = {} as MaybeRef<T>,
  set: (name: keyof T) => void,
) {
  // Local target ref
  const targetRef = ref(target)
  // Variants as ref
  const variantsRef = ref(variants) as Ref<T>

  const stopLifeCycleWatch = watch(
    targetRef,
    () => {
      // Lifecycle hooks bindings
      if (variantsRef.value && variantsRef.value.enter) {
        // Set initial before the element is mounted
        if (variantsRef.value.initial) set('initial')

        // Set enter animation, once the element is mounted
        if (variantsRef.value.enter) nextTick(() => set('enter'))
      }
    },
    {
      immediate: true,
      flush: 'pre',
    },
  )

  tryOnUnmounted(() => {
    stopLifeCycleWatch()
  })
}
