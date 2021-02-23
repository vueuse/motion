import { createGlobalState } from '@vueuse/core'
import { MotionInstanceBindings } from '../types'

export const motionState = createGlobalState<MotionInstanceBindings>(
  () => ({} as MotionInstanceBindings),
)()
