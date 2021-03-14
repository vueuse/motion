import { unrefElement, useEventListener } from '@vueuse/core'
import { computed, ref, unref, watch } from 'vue-demi'
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
  const _variants = unref(variants)
  // State
  const hovered = ref(false)
  const tapped = ref(false)
  const focused = ref(false)

  const mutableKeys = computed(() => {
    let result: string[] = []

    if (!_variants) return result

    if (_variants.hovered) {
      result = [...result, ...Object.keys(_variants.hovered)]
    }

    if (_variants.tapped) {
      result = [...result, ...Object.keys(_variants.tapped)]
    }

    if (_variants.focused) {
      result = [...result, ...Object.keys(_variants.focused)]
    }

    return result
  })

  const computedProperties = computed(() => {
    const result = {}

    Object.assign(result, state.value)

    if (hovered.value && _variants.hovered) {
      Object.assign(result, _variants.hovered)
    }

    if (tapped.value && _variants.tapped) {
      Object.assign(result, _variants.tapped)
    }

    if (focused.value && _variants.focused) {
      Object.assign(result, _variants.focused)
    }

    for (const key in result) {
      if (!mutableKeys.value.includes(key)) delete result[key]
    }

    return result
  })

  watch(
    () => unrefElement(target),
    (el) => {
      if (!el || !_variants) return

      // Hovered
      if (_variants.hovered) {
        useEventListener(el as EventTarget, 'mouseenter', () => {
          hovered.value = true
        })

        useEventListener(el as EventTarget, 'mouseleave', () => {
          hovered.value = false
          tapped.value = false
        })

        useEventListener(el as EventTarget, 'mouseout', () => {
          hovered.value = false
          tapped.value = false
        })
      }

      // Tapped
      if (_variants.tapped) {
        // Mouse
        if (supportsMouseEvents()) {
          useEventListener(el as EventTarget, 'mousedown', () => {
            tapped.value = true
          })

          useEventListener(el as EventTarget, 'mouseup', () => {
            tapped.value = false
          })
        }

        // Pointer
        if (supportsPointerEvents()) {
          useEventListener(el as EventTarget, 'pointerdown', () => {
            tapped.value = true
          })

          useEventListener(el as EventTarget, 'pointerup', () => {
            tapped.value = false
          })
        }

        // Touch
        if (supportsTouchEvents()) {
          useEventListener(el as EventTarget, 'touchstart', () => {
            tapped.value = true
          })

          useEventListener(el as EventTarget, 'touchend', () => {
            tapped.value = false
          })
        }
      }

      // Focused
      if (_variants.focused) {
        useEventListener(el as EventTarget, 'focus', () => {
          focused.value = true
        })

        useEventListener(el as EventTarget, 'blur', () => {
          focused.value = false
        })
      }
    },
    {
      immediate: true,
    },
  )

  // Watch local computed variant, apply it dynamically
  watch(computedProperties, (newVal) => {
    apply(newVal)
  })
}
