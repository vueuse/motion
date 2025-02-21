import type { MaybeRef } from '@vueuse/core'
import type { MotionProperties, PermissiveTarget } from './types'
import { reactive, watch } from 'vue'
import { useElementStyle } from './useElementStyle'
import { useElementTransform } from './useElementTransform'
import { usePermissiveTarget } from './usePermissiveTarget'
import { isTransformProp } from './utils/transform'
import { objectEntries } from './utils/type-feature'

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
      objectEntries(newVal).forEach(([key, value]) => {
        const target = isTransformProp(key) ? transform : style
        if (target[key] && target[key] === value)
          return
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
