import { MaybeRef } from '@vueuse/shared'
import { animate } from 'popmotion'
import { Ref, ref } from 'vue-demi'
import { MotionProperties, MotionTarget, Spring, SpringControls } from './types'
import { useMotionProperties } from './useMotionProperties'
import { useMotionValues } from './useMotionValues'

export function useSpring(
  target: MaybeRef<MotionTarget> | MaybeRef<MotionProperties>,
  spring?: Partial<Spring>,
): SpringControls {
  // Base references
  const targetRef = ref(target)
  let values: MotionProperties = {}

  // Check whether if we are dealing with an object or with an element target
  if (
    targetRef.value instanceof HTMLElement ||
    targetRef.value instanceof SVGElement
  ) {
    const { motionProperties } = useMotionProperties(
      targetRef as Ref<MotionTarget>,
    )

    values = motionProperties
  } else {
    values = { ...targetRef.value }
  }

  const { stop, get } = useMotionValues()

  const set = (properties: MotionProperties) => {
    return Promise.all(
      Object.entries(properties).map(([key, value]) => {
        const motionValue = get(key as keyof MotionProperties, value, values)

        const start = (onComplete?: () => void) =>
          animate({
            type: 'spring',
            from: motionValue.get(),
            to: value,
            velocity: motionValue.getVelocity(),
            onUpdate: (v) => motionValue.set(v),
            onComplete,
            ...spring,
          })

        return motionValue.start(start)
      }),
    )
  }

  return {
    set,
    stop,
    values,
  }
}
