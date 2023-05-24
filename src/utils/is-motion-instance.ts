import { isRef } from 'vue'
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

  return _obj.apply !== undefined && typeof _obj.apply === 'function' && _obj.set !== undefined && typeof _obj.set === 'function' && _obj.target !== undefined && isRef(_obj.target)
}
