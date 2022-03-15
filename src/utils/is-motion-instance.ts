import { isFunction } from '@vueuse/shared'
import { isRef } from 'vue-demi'
import type { MotionInstance } from '../types'

/**
 * Check whether an object is a Motion Instance or not.
 *
 * Can be useful while building packages based on @vueuse/motion.
 *
 * @param obj
 * @returns bool
 */
export function isMotionInstance(obj: any): obj is MotionInstance {
  const _obj = obj as MotionInstance

  return (
    _obj.apply !== undefined
    && isFunction(_obj.apply)
    && _obj.set !== undefined
    && isFunction(_obj.set)
    && _obj.stopTransitions !== undefined
    && isFunction(_obj.stopTransitions)
    && _obj.target !== undefined
    && isRef(_obj.target)
  )
}
