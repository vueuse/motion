import type { MaybeRef } from '@vueuse/core'
import { unrefElement } from '@vueuse/core'
import { set as __set, reactive, watch } from 'vue-demi'
import type { MotionProperties, PermissiveTarget } from './types'
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
  // Local motion properties
  const motionProperties = reactive<MotionProperties>({})

  // Local mass setter
  const apply = (values: Partial<MotionProperties>) => {
    Object.entries(values).forEach(([key, value]) => {
      __set(motionProperties, key, value)
    })
  }

  // Target element style object
  const { style, stop: stopStyleWatchers } = useElementStyle(target, apply)

  // Target element transform object
  const { transform, stop: stopTransformWatchers } = useElementTransform(
    target,
    apply,
  )

  // Watch local object and apply styling accordingly
  const stopPropertiesWatch = watch(
    motionProperties,
    (newVal) => {
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

  // Apply default values once target is available
  const stopInitWatch = watch(
    () => unrefElement(target),
    (el) => {
      if (!el) return

      if (defaultValues) apply(defaultValues)
    },
    {
      immediate: true,
    },
  )

  // Stop watchers
  const stop = () => {
    stopStyleWatchers()
    stopTransformWatchers()
    stopPropertiesWatch()
    stopInitWatch()
  }

  return {
    motionProperties,
    style,
    transform,
    stop,
  }
}
