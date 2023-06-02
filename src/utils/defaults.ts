import type { Keyframes, KeyframesTarget, PopmotionTransitionProps, SingleTarget, Spring, ValueTarget } from '../types'

export function isKeyframesTarget(v: ValueTarget): v is KeyframesTarget {
  return Array.isArray(v)
}

export function underDampedSpring(): Partial<Spring> {
  return {
    type: 'spring',
    stiffness: 500,
    damping: 25,
    restDelta: 0.5,
    restSpeed: 10,
  }
}

export function criticallyDampedSpring(to: SingleTarget) {
  return {
    type: 'spring',
    stiffness: 550,
    damping: to === 0 ? 2 * Math.sqrt(550) : 30,
    restDelta: 0.01,
    restSpeed: 10,
  }
}

export function overDampedSpring(to: SingleTarget): Partial<Spring> {
  return {
    type: 'spring',
    stiffness: 550,
    damping: to === 0 ? 100 : 30,
    restDelta: 0.01,
    restSpeed: 10,
  }
}

export function linearTween(): Partial<Keyframes> {
  return {
    type: 'keyframes',
    ease: 'linear',
    duration: 300,
  }
}

function keyframes(values: KeyframesTarget): Partial<Keyframes> {
  return {
    type: 'keyframes',
    duration: 800,
    values,
  }
}

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
  scaleX: criticallyDampedSpring,
  scaleY: criticallyDampedSpring,
  scale: criticallyDampedSpring,
  backgroundColor: linearTween,
  color: linearTween,
  opacity: linearTween,
}

export function getDefaultTransition(valueKey: string, to: ValueTarget): PopmotionTransitionProps {
  let transitionFactory: TransitionFactory

  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes as TransitionFactory
  } else {
    // @ts-expect-error - Fix errors later for typescript 5
    transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default
  }

  return { to, ...transitionFactory(to) } as PopmotionTransitionProps
}
