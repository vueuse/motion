import { useEventListener } from '@vueuse/core'
import { computed, ref, watch } from 'vue-demi'
import { MotionInstance, MotionVariants } from '../types'
import {
  supportsMouseEvents,
  supportsPointerEvents,
  supportsTouchEvents,
} from '../utils/events'

export function registerEventListeners<T extends MotionVariants>({
  target,
  state,
  variants,
  apply,
}: MotionInstance<T>) {
  // State
  const hovered = ref(false)
  const tapped = ref(false)
  // const focused = ref(false)
  // TODO: implement focused

  const computedProperties = computed(() => {
    const result = {}

    Object.assign(result, state.value)

    if (hovered.value && variants.value.hovered)
      Object.assign(result, variants.value.hovered)

    if (tapped.value && variants.value.tapped)
      Object.assign(result, variants.value.tapped)

    return result
  })

  if (variants.value.hovered) {
    useEventListener(target.value as EventTarget, 'mouseenter', () => {
      hovered.value = true
    })

    useEventListener(target.value as EventTarget, 'mouseleave', () => {
      hovered.value = false
      tapped.value = false
    })

    useEventListener(target.value as EventTarget, 'mouseout', () => {
      hovered.value = false
      tapped.value = false
    })
  }

  if (variants.value.tapped) {
    // Mouse
    if (supportsMouseEvents()) {
      useEventListener(target.value as EventTarget, 'mousedown', () => {
        tapped.value = true
      })

      useEventListener(target.value as EventTarget, 'mouseup', () => {
        tapped.value = false
      })
    }

    // Pointer
    if (supportsPointerEvents()) {
      useEventListener(target.value as EventTarget, 'pointerdown', () => {
        tapped.value = true
      })

      useEventListener(target.value as EventTarget, 'pointerup', () => {
        tapped.value = false
      })
    }

    // Touch
    if (supportsTouchEvents()) {
      useEventListener(target.value as EventTarget, 'touchstart', () => {
        tapped.value = true
      })

      useEventListener(target.value as EventTarget, 'touchend', () => {
        tapped.value = false
      })
    }
  }

  watch(computedProperties, () => {
    apply(computedProperties.value)
  })
}
