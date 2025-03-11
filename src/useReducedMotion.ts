import { computed } from 'vue'
import type { Ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'

/**
 * Reactive prefers-reduced-motion.
 */
export function useReducedMotion(options: { window?: Window } = {}): Ref<boolean> {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', options)

  return computed(() => reducedMotion.value)
}
