import { MaybeRef } from '@vueuse/core'
import { reactive, set as __set, watch } from 'vue-demi'
import { MotionProperties, PermissiveTarget } from './types'
import { useElementStyle } from './useElementStyle'
import { useElementTransform } from './useElementTransform'
import { isTransformProp } from './utils/transform'

/**
 * A Composable giving access to both `transform` and `style`objects for a single element.
 *
 * @param target
 */
export function useMotionProperties(target: MaybeRef<PermissiveTarget>) {
  // Target element style object
  const { style } = useElementStyle(target)

  // Target element transform object
  const { transform } = useElementTransform(target)

  const motionProperties = reactive<MotionProperties>({})

  watch(
    motionProperties,
    (newVal) => {
      for (const key in newVal) {
        const target = isTransformProp(key) ? transform : style

        if (target[key] && target[key] === newVal[key]) {
          continue
        }

        __set(target, key, newVal[key])
      }
    },
    {
      immediate: true,
      deep: true,
    },
  )

  return {
    motionProperties,
    style,
    transform,
  }
}
