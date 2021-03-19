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
export function useMotionProperties(
  target: MaybeRef<PermissiveTarget>,
  defaultValues?: Partial<MotionProperties>,
) {
  let init = 2
  // Local motion properties
  const motionProperties = reactive<MotionProperties>({})

  // onInit hook to retrieve parsed data from the target element
  const onInit = (initData: Partial<MotionProperties>) => {
    Object.entries(initData).forEach(([key, value]) => {
      __set(motionProperties, key, value)
    })

    init--
  }

  // Target element style object
  const { style } = useElementStyle(target, onInit)

  // Target element transform object
  const { transform } = useElementTransform(target, onInit)

  // Apply default values if specified
  if (defaultValues) {
    Object.entries(defaultValues).forEach(([key, value]) => {
      const target = isTransformProp(key) ? transform : style

      __set(target, key, value)
    })
  }

  // Watch local object and apply styling accordingly
  watch(
    motionProperties,
    (newVal) => {
      if (init) return

      Object.entries(newVal).forEach(([key, value]) => {
        const target = isTransformProp(key) ? transform : style

        if (target[key] && target[key] === value) return

        __set(target, key, value)
      })
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
