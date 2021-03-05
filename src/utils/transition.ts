import {
  animate,
  AnimationOptions,
  anticipate,
  backIn,
  backInOut,
  backOut,
  bounceIn,
  bounceInOut,
  bounceOut,
  circIn,
  circInOut,
  circOut,
  cubicBezier,
  easeIn,
  easeInOut,
  easeOut,
  Easing,
  inertia,
  linear,
} from 'popmotion'
import { complex } from 'style-value-types'
import { MotionValue } from '../motionValue'
import {
  PermissiveTransitionDefinition,
  ResolvedValueTarget,
  StartAnimation,
  StopAnimation,
  Transition,
} from '../types'
import { getDefaultTransition } from './defaults'
import { getAnimatableNone } from './style'

// Easing map from popmotion
const easingLookup = {
  linear,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate,
  bounceIn,
  bounceInOut,
  bounceOut,
}

/**
 * Transform easing definition to easing function.
 *
 * @param definition
 */
export const easingDefinitionToFunction = (definition: Easing) => {
  if (Array.isArray(definition)) {
    const [x1, y1, x2, y2] = definition
    return cubicBezier(x1, y1, x2, y2)
  } else if (typeof definition === 'string') {
    return easingLookup[definition]
  }

  return definition
}

/**
 * Create an easing array
 *
 * @param ease
 */
export const isEasingArray = (ease: any): ease is Easing[] => {
  return Array.isArray(ease) && typeof ease[0] !== 'number'
}

/**
 * Check if a value is animatable. Examples:
 *
 * ✅: 100, "100px", "#fff"
 * ❌: "block", "url(2.jpg)"
 * @param value
 *
 * @internal
 */
export const isAnimatable = (key: string, value: ResolvedValueTarget) => {
  // If the list of keys tat might be non-animatable grows, replace with Set
  if (key === 'zIndex') return false

  // If it's a number or a keyframes array, we can animate it. We might at some point
  // need to do a deep isAnimatable check of keyframes, or let Popmotion handle this,
  // but for now lets leave it like this for performance reasons
  if (typeof value === 'number' || Array.isArray(value)) return true

  if (
    typeof value === 'string' && // It's animatable if we have a string
    complex.test(value) && // And it contains numbers and/or colors
    !value.startsWith('url(') // Unless it starts with "url("
  ) {
    return true
  }

  return false
}

/**
 * Hydrate keyframes from transition options.
 *
 * @param options
 */
export function hydrateKeyframes(options: PermissiveTransitionDefinition) {
  if (Array.isArray(options.to) && options.to[0] === null) {
    options.to = [...options.to]
    options.to[0] = options.from
  }

  return options
}

/**
 * Convert Transition type into Popmotion-compatible options.
 */
export function convertTransitionToAnimationOptions<T>({
  ease,
  times,
  delay,
  ...transition
}: PermissiveTransitionDefinition): AnimationOptions<T> {
  const options: AnimationOptions<T> = { ...transition }

  if (times) options['offset'] = times

  // Map easing names to Popmotion's easing functions
  if (ease) {
    options['ease'] = isEasingArray(ease)
      ? ease.map(easingDefinitionToFunction)
      : easingDefinitionToFunction(ease)
  }

  // Map delay to elapsed from Popmotion
  if (delay) {
    options['elapsed'] = -delay
  }

  return options
}

/**
 * Get PopMotion animation options from Transition definition
 *
 * @param transition
 * @param options
 * @param key
 */
export function getPopmotionAnimationOptions(
  transition: PermissiveTransitionDefinition,
  options: any,
  key: string,
) {
  if (Array.isArray(options.to)) {
    if (!transition.duration) transition.duration = 800
  }

  hydrateKeyframes(options)

  // Get a default transition if none is determined to be defined.
  if (!isTransitionDefined(transition)) {
    transition = {
      ...transition,
      ...getDefaultTransition(key, options.to),
    }
  }

  return {
    ...options,
    ...convertTransitionToAnimationOptions(transition),
  }
}

/**
 * Decide whether a transition is defined on a given Transition.
 * This filters out orchestration options and returns true
 * if any options are left.
 */
export function isTransitionDefined({
  delay,
  repeat,
  repeatType,
  repeatDelay,
  from,
  ...transition
}: Transition) {
  return !!Object.keys(transition).length
}

/**
 * Get the transition definition for the current value.
 *
 * First search for transition nested definition (key or default),
 * then fallback on the main transition definition itself.
 *
 * @param transition
 * @param key
 */
export function getValueTransition(transition: Transition, key: string) {
  return transition[key] || transition['default'] || transition
}

/**
 * Get the animation function populated with variant values.
 */
export function getAnimation(
  key: string,
  value: MotionValue,
  target: ResolvedValueTarget,
  transition: Transition,
  onComplete?: () => void,
): StartAnimation {
  // Get key transition or fallback values
  const valueTransition = getValueTransition(transition, key)

  // Get origin
  let origin =
    valueTransition.from === null || valueTransition.from === undefined
      ? value.get()
      : valueTransition.from

  // Is target animatable
  const isTargetAnimatable = isAnimatable(key, target)

  // If we're trying to animate from "none", try and get an animatable version
  // of the target. This could be improved to work both ways.
  if (origin === 'none' && isTargetAnimatable && typeof target === 'string') {
    origin = getAnimatableNone(key, target)
  }

  // Is origin animatable
  const isOriginAnimatable = isAnimatable(key, origin)

  /**
   * Start the animation.
   */
  function start(complete?: () => void): StopAnimation {
    const options = {
      from: origin,
      to: target,
      velocity: transition.velocity ? transition.velocity : value.getVelocity(),
      onUpdate: (v: Animatable) => value.set(v),
    }

    return valueTransition.type === 'inertia' ||
      valueTransition.type === 'decay'
      ? inertia({ ...options, ...valueTransition })
      : animate({
          ...getPopmotionAnimationOptions(valueTransition, options, key),
          onUpdate: (v: any) => {
            options.onUpdate(v)

            if (valueTransition.onUpdate) valueTransition.onUpdate(v)
          },
          onComplete: () => {
            if (transition.onComplete) transition.onComplete()

            if (onComplete) onComplete()

            if (complete) complete()
          },
        })
  }

  /**
   * Set value without transition.
   */
  function set(complete?: () => void): StopAnimation {
    value.set(target)

    if (transition.onComplete) transition.onComplete()

    if (onComplete) onComplete()

    if (complete) complete()

    return { stop: () => {} }
  }

  return !isOriginAnimatable ||
    !isTargetAnimatable ||
    valueTransition.type === false
    ? set
    : start
}
