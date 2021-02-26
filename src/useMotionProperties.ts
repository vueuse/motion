import { MaybeRef } from '@vueuse/core'
import { reactive, ref, set, watch } from 'vue-demi'
import { MotionProperties, MotionTarget } from './types'
import { useElementStyle } from './useElementStyle'
import { useElementTransform } from './useElementTransform'
import { isTransformProp } from './utils/transform'

/**
 * A Composable giving access to both `transform` and `style`objects for a single element.
 *
 * @param target
 */
export function useMotionProperties(target: MaybeRef<MotionTarget>) {
  // Target element ref
  const targetRef = ref(target)

  // Target element style object
  const { style } = useElementStyle(targetRef)

  // Target element transform object
  const { transform } = useElementTransform(targetRef)

  const motionProperties = reactive<MotionProperties>({})

  watch(
    motionProperties,
    (newVal) => {
      for (const key in newVal) {
        const target = isTransformProp(key) ? transform : style

        if (target[key] && target[key] === newVal[key]) {
          continue
        }

        set(target, key, newVal[key])
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
