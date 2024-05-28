import type { MaybeRef } from '@vueuse/core'
import { reactive, watch } from 'vue'
import type { MotionProperties, PermissiveTarget } from './types'
import { useElementStyle } from './useElementStyle'
import { useElementTransform } from './useElementTransform'
import { usePermissiveTarget } from './usePermissiveTarget'
import { isTransformProp } from './utils/transform'

/**
 * A Composable giving access to both `transform` and `style`objects for a single element.
 *
 * @param target
 */
export function useMotionProperties(target: MaybeRef<PermissiveTarget>, defaultValues?: Partial<MotionProperties>) {
  // Local motion properties
  const motionProperties = reactive<MotionProperties>({})

  // Local mass setter
  // @ts-expect-error - Fix errors later for typescript 5
  const apply = (values: Partial<MotionProperties>) => Object.entries(values).forEach(([key, value]) => (motionProperties[key] = value))

  // Target element style object
  const { style } = useElementStyle(target, apply)

  // Target element transform object
  const { transform } = useElementTransform(target, apply)

  // Watch local object and apply styling accordingly
  watch(
    motionProperties,
    (newVal) => {
      Object.entries(newVal).forEach(([key, value]) => {
        const target = isTransformProp(key) ? transform : style
        // @ts-expect-error - Fix errors later for typescript 5
        if (target[key] && target[key] === value)
          return
        // @ts-expect-error - Fix errors later for typescript 5
        target[key] = value
      })
    },
    {
      immediate: true,
      deep: true,
    },
  )

  // Apply default values once target is available
  usePermissiveTarget(target, () => defaultValues && apply(defaultValues))

  return {
    motionProperties,
    style,
    transform,
  }
}
