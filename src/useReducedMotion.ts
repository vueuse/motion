import type { Ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'

/**
 * Reactive prefers-reduced-motion.
 */
export function useReducedMotion(options: { window?: Window } = {}): Ref<boolean> {
  return useMediaQuery('(prefers-reduced-motion: reduce)', options)
}
