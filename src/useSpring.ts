import { MaybeRef } from '@vueuse/shared'
import { animate } from 'popmotion'
import { ref, watch } from 'vue-demi'
import {
  MotionProperties,
  PermissiveTarget,
  Spring,
  SpringControls,
} from './types'
import { useMotionProperties } from './useMotionProperties'
import { useMotionValues } from './useMotionValues'

export function useSpring(
  target: MaybeRef<PermissiveTarget> | MaybeRef<MotionProperties>,
  spring?: Partial<Spring>,
): SpringControls {
  // Base references
  const targetRef = ref(target)
  let values: MotionProperties = {}

  watch(
    targetRef,
    (newVal) => {
      // Target not set yet
      if (!newVal) return

      let _el = newVal

      // Same as resolveElement()
      // @ts-ignore
      if (newVal.$el) {
        // @ts-ignore
        _el = newVal.$el
      }

      // Check whether the target reference is an element or a simple object
      if (_el instanceof HTMLElement || _el instanceof SVGElement) {
        values = useMotionProperties(_el).motionProperties
        return
      }

      // Target seem to be an object, spread it as local values.
      values = { ...(newVal as MotionProperties) }
    },
    {
      immediate: true,
    },
  )

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
