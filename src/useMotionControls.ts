import { tryOnUnmounted } from '@vueuse/core'
import { ComputedRef, watch } from 'vue'
import {
  MotionProperties,
  StyleProperties,
  TransformProperties,
  Variant,
} from './types/variants'
import { useMotionTransitions } from './useMotionTransitions'
import { getDefaultTransition } from './utils/defaults'
import { isTransformProp } from './utils/transform'

/**
 * A Composable handling motion controls, pushing resolved variant to useMotionTransitions manager.
 *
 * @param transform
 * @param style
 * @param currentVariant
 */
export function useMotionControls(
  transform: TransformProperties,
  style: StyleProperties,
  currentVariant: ComputedRef<Variant | undefined>,
) {
  // Motion transitions instance
  const { push, stop } = useMotionTransitions()

  /**
   * Apply a variant declaration and execute the resolved transitions.
   *
   * @param variant
   */
  const apply = (variant: Variant) => {
    const transition = variant.transition

    for (const key in variant) {
      if (key === 'transition') continue

      const value = variant[key]

      const target = isTransformProp(key) ? transform : style

      push(
        key as keyof MotionProperties,
        value,
        target,
        transition || getDefaultTransition(key, value),
      )
    }
  }

  // Watch for variant changes and apply the new one
  const stopVariantWatch = watch(
    currentVariant,
    (newVal: Variant | undefined) => {
      stop()

      // Current variant is undefined, just stop the current motions
      if (!newVal) return

      apply(newVal)
    },
    {
      immediate: true,
    },
  )

  // Stop watchers on unmount
  tryOnUnmounted(() => {
    stopVariantWatch()
  })

  return {
    apply,
    stop,
  }
}
