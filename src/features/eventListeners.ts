import { useEventListener } from '@vueuse/core'
import { computed, ref, unref, watch } from 'vue'
import type { MotionInstance, MotionVariants } from '../types'
import { supportsMouseEvents, supportsPointerEvents, supportsTouchEvents } from '../utils/events'

export function registerEventListeners<T extends MotionVariants>({ target, state, variants, apply }: MotionInstance<T>) {
  const _variants = unref(variants)

  // State
  const hovered = ref(false)
  const tapped = ref(false)
  const focused = ref(false)

  const mutableKeys = computed(() => {
    let result: string[] = []

    if (!_variants) return result

    if (_variants.hovered) result = [...result, ...Object.keys(_variants.hovered)]

    if (_variants.tapped) result = [...result, ...Object.keys(_variants.tapped)]

    if (_variants.focused) result = [...result, ...Object.keys(_variants.focused)]

    return result
  })

  const computedProperties = computed(() => {
    const result = {}

    Object.assign(result, state.value)

    if (hovered.value && _variants.hovered) Object.assign(result, _variants.hovered)

    if (tapped.value && _variants.tapped) Object.assign(result, _variants.tapped)

    if (focused.value && _variants.focused) Object.assign(result, _variants.focused)

    for (const key in result) {
      if (!mutableKeys.value.includes(key)) delete result[key]
    }

    return result
  })

  // Hovered
  if (_variants.hovered) {
    useEventListener(target as any, 'mouseenter', () => (hovered.value = true))
    useEventListener(target as any, 'mouseleave', () => {
      hovered.value = false
      tapped.value = false
    })
    useEventListener(target as any, 'mouseout', () => {
      hovered.value = false
      tapped.value = false
    })
  }

  // Tapped
  if (_variants.tapped) {
    // Mouse
    if (supportsMouseEvents()) {
      useEventListener(target as any, 'mousedown', () => (tapped.value = true))
      useEventListener(target as any, 'mouseup', () => (tapped.value = false))
    }

    // Pointer
    if (supportsPointerEvents()) {
      useEventListener(target as any, 'pointerdown', () => (tapped.value = true))
      useEventListener(target as any, 'pointerup', () => (tapped.value = false))
    }

    // Touch
    if (supportsTouchEvents()) {
      useEventListener(target as any, 'touchstart', () => (tapped.value = true))
      useEventListener(target as any, 'touchend', () => (tapped.value = false))
    }
  }

  // Focused
  if (_variants.focused) {
    useEventListener(target as any, 'focus', () => (focused.value = true))
    useEventListener(target as any, 'blur', () => (focused.value = false))
  }

  // Watch local computed variant, apply it dynamically
  watch(computedProperties, apply)
}
