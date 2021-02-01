import { MotionInstanceBindings } from '@lib/types/instance'
import { createGlobalState } from '@vueuse/core'

export const motionState = createGlobalState<MotionInstanceBindings>(
  () => ({} as MotionInstanceBindings),
)()
