import { ComputedRef, watch } from 'vue'
import { TransitionProperties } from './types/transitions'
import { StyleProperties, TransformProperties, Variant } from './types/variants'
import { useMotionTransitions } from './useMotionTransitions'
import { isTransformProp } from './utils/transform'

const defaultTransition: TransitionProperties = {
  type: 'spring',
  stiffness: 500,
  damping: 25,
  restDelta: 0.5,
  restSpeed: 10,
}

export const useMotionControls = (
  transform: TransformProperties,
  style: StyleProperties,
  currentVariant: ComputedRef<Variant | undefined>,
) => {
  const { push, stop } = useMotionTransitions()

  const apply = (variant: Variant) => {
    // Get transition data from variant, or use default one
    const transition: TransitionProperties =
      variant.transition || defaultTransition

    for (const [key, value] of Object.entries(variant)) {
      if (key === 'transition') return

      const isTransform = isTransformProp(key)

      if (isTransform) {
        if (transform[key] === undefined || transform[key] === null) {
          // This transform property is undefined, set it without using transitions
          transform[key] = value
        }

        // Push the transition to motion transitions
        push(transition, {
          from: transform[key],
          to: value,
          onUpdate: (latest) => (transform[key] = latest),
        })
      } else {
        if (style[key] === undefined || style[key] === null) {
          // This styling property is undefined, set it without using transitions
          style[key] = value
        }

        // Push the transition to motion transitions
        push(transition, {
          from: style[key],
          to: value,
          onUpdate: (latest) => (style[key] = latest),
        })
      }
    }
  }

  // Watch for variant changes and apply the new one
  watch(
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

  return {
    stop,
  }
}
