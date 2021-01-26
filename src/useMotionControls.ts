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
    const transition: TransitionProperties =
      variant.transition || defaultTransition

    delete variant.transition

    for (const [key, value] of Object.entries(variant)) {
      const isTransform = isTransformProp(key)

      if (isTransform) {
        push(transition, {
          from: transform[key] || 0,
          to: value,
          onUpdate: (latest) => (transform[key] = latest),
        })
      } else {
        push(transition, {
          from: style[key] || 0,
          to: value,
          onUpdate: (latest) => (style[key] = latest),
        })
      }
    }
  }

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
