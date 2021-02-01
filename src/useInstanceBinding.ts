import { motionState } from './features/state'
import { useMotion } from './useMotion'

export function useInstanceBinding(
  key: string,
  ref: ReturnType<typeof useMotion>,
) {
  motionState[key] = ref
}
