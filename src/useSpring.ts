import { MaybeRef } from '@vueuse/shared'
import { animate } from 'popmotion'
import {
  MotionProperties,
  PermissiveMotionProperties,
  PermissiveTarget,
  Spring,
  SpringControls,
} from './types'
import { useMotionValues } from './useMotionValues'
import { getDefaultTransition } from './utils/defaults'

export type UseSpringOptions = Partial<Spring> & {
  target?: MaybeRef<PermissiveTarget>
}

export function useSpring(
  values: Partial<PermissiveMotionProperties>,
  spring?: UseSpringOptions,
): SpringControls {
  const { stop, get } = useMotionValues()

  return {
    values,
    stop,
    set: (properties: MotionProperties) =>
      Promise.all(
        Object.entries(properties).map(([key, value]) => {
          const motionValue = get(key, values[key], values)

          return motionValue.start((onComplete?: () => void) => {
            const options = {
              type: 'spring',
              ...(spring || getDefaultTransition(key, value)),
            } as { type: 'spring' | 'decay' | 'keyframes' | undefined }

            return animate({
              from: motionValue.get(),
              to: value,
              velocity: motionValue.getVelocity(),
              onUpdate: (v) => motionValue.set(v),
              onComplete,
              ...options,
            })
          })
        }),
      ),
  }
}
