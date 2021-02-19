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
  linear,
} from 'popmotion'
import {
  MotionProperties,
  PermissiveTransitionDefinition,
  ResolvedValueTarget,
  StopAnimation,
  Transition,
} from '../types'
import { getDefaultTransition } from './defaults'

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
  value: ResolvedValueTarget,
  target: MotionProperties,
  transition: Transition,
  origin?: ResolvedValueTarget,
  onComplete?: () => void,
) {
  // Get key transition or fallback values
  const valueTransition = getValueTransition(transition, key)

  /**
   * Start the animation.
   */
  function start(): StopAnimation {
    const options = {
      from: origin,
      to: value,
      onUpdate: (v: number) => {
        target[key as string] = v

        if (valueTransition.onUpdate) valueTransition.onUpdate(v)
      },
      onComplete: () => {
        transition?.onComplete?.()

        onComplete?.()
      },
    }

    const animationOptions = getPopmotionAnimationOptions(
      valueTransition,
      options,
      key,
    )

    return animate(animationOptions)
  }

  /**
   * Set value without transition.
   */
  function set(): StopAnimation {
    target[key] = value

    transition?.onComplete?.()

    return { stop: () => {} }
  }

  // Return `start` or `set` depending on `origin`
  return origin !== undefined ? start : set
}
