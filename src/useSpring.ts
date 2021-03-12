import { MaybeRef } from '@vueuse/shared'
import { animate } from 'popmotion'
import { ref } from 'vue-demi'
import { MotionProperties, MotionTarget, Spring } from './types'
import { useMotionProperties } from './useMotionProperties'
import { useMotionValues } from './useMotionValues'

export function useSpring(
  target: MaybeRef<MotionTarget>,
  spring?: Partial<Spring>,
) {
  // Base references
  const targetRef = ref(target)

  // Reactive styling and transform
  const { motionProperties } = useMotionProperties(targetRef)

  const { stop, get } = useMotionValues()

  const set = (properties: MotionProperties & { velocity?: number }) => {
    return Promise.all(
      Object.entries(properties).map(([key, value]) => {
        const motionValue = get(
          key as keyof MotionProperties,
          value,
          motionProperties,
        )

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
    motionProperties,
  }
}
