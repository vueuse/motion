import { MaybeRef } from '@vueuse/shared'
import { reactive, ref, watch } from 'vue-demi'
import { TargetType } from './types/instance'
import { MotionProperties } from './types/variants'
import { useStyle } from './useStyle'
import { useTransform } from './useTransform'
import { isTransformProp } from './utils/transform'

/**
 * A Composable giving access to both `transform` and `style`objects for a single element.
 *
 * @param target
 */
export function useMotionProperties(target: MaybeRef<TargetType>) {
  // Target element ref
  const targetRef = ref(target)

  // Target element style object
  const { style } = useStyle(targetRef)

  // Target element transform object
  const { transform } = useTransform(targetRef)

  const motionProperties = reactive<MotionProperties>({})

  watch(
    motionProperties,
    (newVal) => {
      for (const key in newVal) {
        const target = isTransformProp(key) ? transform : style

        if (target[key] && target[key] === newVal[key]) {
          continue
        }

        target[key] = newVal[key]
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
