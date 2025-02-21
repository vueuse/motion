import type { MotionInstance, MotionVariants } from '../types'
import { isRef } from 'vue'

/**
 * Check whether an object is a Motion Instance or not.
 *
 * Can be useful while building packages based on @vueuse/motion.
 *
 * @param obj
 * @returns bool
 */
export function isMotionInstance<T extends string, V extends MotionVariants<T>>(obj: any): obj is MotionInstance<T, V> {
  const _obj = obj as MotionInstance<T, V>

  return _obj.apply !== undefined && typeof _obj.apply === 'function' && _obj.set !== undefined && typeof _obj.set === 'function' && _obj.target !== undefined && isRef(_obj.target)
}
