import { MaybeRef, useEventListener } from '@vueuse/core'
import { computed, ComputedRef, Ref, ref, watch } from 'vue-demi'
import { TargetType } from '../types/instance'
import { MotionVariants, Variant } from '../types/variants'

export function registerEventListeners<T extends MotionVariants>(
  target: MaybeRef<TargetType>,
  variants: MaybeRef<T> = {} as MaybeRef<T>,
  currentVariant: ComputedRef<Variant | undefined>,
  apply: (variant: Variant) => void,
) {
  // Local refs
  const targetRef = ref(target)
  const variantsRef = ref(variants) as Ref<T>
  // State
  const hovered = ref(false)
  const tapped = ref(false)
  // const focused = ref(false)
  // TODO: implement focused

  const computedProperties = computed(() => {
    const result = {}

    Object.assign(result, currentVariant.value)

    if (hovered.value && variantsRef.value.hovered)
      Object.assign(result, variantsRef.value.hovered)

    if (tapped.value && variantsRef.value.tapped)
      Object.assign(result, variantsRef.value.tapped)

    return result
  })

  if (variantsRef.value.hovered) {
    useEventListener(targetRef.value as EventTarget, 'mouseenter', () => {
      hovered.value = true
    })

    useEventListener(targetRef.value as EventTarget, 'mouseleave', () => {
      hovered.value = false
      tapped.value = false
    })

    useEventListener(targetRef.value as EventTarget, 'mouseout', () => {
      hovered.value = false
      tapped.value = false
    })
  }

  if (variantsRef.value.tapped) {
    useEventListener(targetRef.value as EventTarget, 'mousedown', () => {
      tapped.value = true
    })

    useEventListener(targetRef.value as EventTarget, 'pointerdown', () => {
      tapped.value = true
    })

    useEventListener(targetRef.value as EventTarget, 'pointerup', () => {
      tapped.value = false
    })

    useEventListener(targetRef.value as EventTarget, 'mouseup', () => {
      tapped.value = false
    })
  }

  watch(computedProperties, () => {
    apply(computedProperties.value)
  })
}
