import {
  Keyframes,
  KeyframesTarget,
  PopmotionTransitionProps,
  SingleTarget,
  Spring,
  ValueTarget,
} from '../types'

export const isKeyframesTarget = (v: ValueTarget): v is KeyframesTarget => {
  return Array.isArray(v)
}

export const underDampedSpring = (): Partial<Spring> => ({
  type: 'spring',
  stiffness: 500,
  damping: 25,
  restDelta: 0.5,
  restSpeed: 10,
})

export const overDampedSpring = (to: SingleTarget): Partial<Spring> => ({
  type: 'spring',
  stiffness: 550,
  damping: to === 0 ? 100 : 30,
  restDelta: 0.01,
  restSpeed: 10,
})

export const linearTween = (): Partial<Keyframes> => ({
  type: 'keyframes',
  ease: 'linear',
  duration: 300,
})

const keyframes = (values: KeyframesTarget): Partial<Keyframes> => ({
  type: 'keyframes',
  duration: 800,
  values,
})

type TransitionFactory = (to: ValueTarget) => Partial<PopmotionTransitionProps>

const defaultTransitions = {
  default: overDampedSpring,
  x: underDampedSpring,
  y: underDampedSpring,
  z: underDampedSpring,
  rotate: underDampedSpring,
  rotateX: underDampedSpring,
  rotateY: underDampedSpring,
  rotateZ: underDampedSpring,
  scaleX: overDampedSpring,
  scaleY: overDampedSpring,
  scale: overDampedSpring,
  backgroundColor: linearTween,
  color: linearTween,
  opacity: linearTween,
}

export const getDefaultTransition = (
  valueKey: string,
  to: ValueTarget,
): PopmotionTransitionProps => {
  let transitionFactory: TransitionFactory

  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes as TransitionFactory
  } else {
    transitionFactory =
      defaultTransitions[valueKey] || defaultTransitions.default
  }

  return { to, ...transitionFactory(to) } as PopmotionTransitionProps
}
