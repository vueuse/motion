import { motionState } from './features/state'
import { MotionInstance } from './types'

export function useInstanceBinding(key: string, ref: MotionInstance) {
  motionState[key] = ref
}
