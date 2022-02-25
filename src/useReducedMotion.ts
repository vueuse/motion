import type { Ref } from 'vue-demi'
import { useMediaQuery } from '@vueuse/core'

/**
 * Reactive prefers-reduced-motion.
 *
 * @param options
 */
export function useReducedMotion(
  options: { window?: Window } = {},
): Ref<boolean> {
  return useMediaQuery('(prefers-reduced-motion: reduce)', options)
}
