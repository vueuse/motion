import { MotionValue } from '../motionValue'
import { MotionProperties } from './variants'

export type ResolvedKeyframesTarget =
  | [null, ...number[]]
  | number[]
  | [null, ...string[]]
  | string[]

export type KeyframesTarget =
  | ResolvedKeyframesTarget
  | [null, ...CustomValueType[]]
  | CustomValueType[]

export type ResolvedSingleTarget = string | number

export type SingleTarget = ResolvedSingleTarget | CustomValueType

export type ResolvedValueTarget = ResolvedSingleTarget | ResolvedKeyframesTarget

export type ValueTarget = SingleTarget | KeyframesTarget

export type Props = { [key: string]: any }

export type EasingFunction = (v: number) => number

export type Easing =
  | [number, number, number, number]
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'circIn'
  | 'circOut'
  | 'circInOut'
  | 'backIn'
  | 'backOut'
  | 'backInOut'
  | 'anticipate'
  | EasingFunction

export interface Orchestration {
  /**
   * Delay the animation by this duration (in seconds). Defaults to `0`.
   */
  delay?: number

  /**
   * Callback triggered on animation complete.
   */
  onComplete?: () => void

  /**
   * Should the value be set imediately
   */
  immediate?: boolean
}

export interface Repeat {
  /**
   * The number of times to repeat the transition. Set to `Infinity` for perpetual repeating.
   *
   * Without setting `repeatType`, this will loop the animation.
   */
  repeat?: number

  /**
   * How to repeat the animation. This can be either:
   *
   * "loop": Repeats the animation from the start
   *
   * "reverse": Alternates between forward and backwards playback
   *
   * "mirror": Switchs `from` and `to` alternately
   */
  repeatType?: 'loop' | 'reverse' | 'mirror'

  /**
   * When repeating an animation, `repeatDelay` will set the
   * duration of the time to wait, in seconds, between each repetition.
   */
  repeatDelay?: number
}

/**
 * An animation that animates between two or more values over a specific duration of time.
 * This is the default animation for non-physical values like `color` and `opacity`.
 */
export interface Tween extends Repeat {
  /**
   * Set `type` to `"tween"` to use a duration-based tween animation.
   * If any non-orchestration `transition` values are set without a `type` property,
   * this is used as the default animation.
   */
  type?: 'tween'

  /**
   * The duration of the tween animation. Set to `0.3` by default, 0r `0.8` if animating a series of keyframes.
   */
  duration?: number

  /**
   * The easing function to use. Set as one of the below.
   *
   * - The name of an existing easing function.
   * - An array of four numbers to define a cubic bezier curve.
   * - An easing function, that accepts and returns a value `0-1`.
   *
   * If the animating value is set as an array of multiple values for a keyframes
   * animation, `ease` can be set as an array of easing functions to set different easings between
   * each of those values.
   */
  ease?: Easing | Easing[]

  /**
   * The duration of time already elapsed in the animation. Set to `0` by
   * default.
   */
  elapsed?: number

  /**
   * When animating keyframes, `times` can be used to determine where in the animation each keyframe is reached.
   * Each value in `times` is a value between `0` and `1`, representing `duration`.
   *
   * There must be the same number of `times` as there are keyframes.
   * Defaults to an array of evenly-spread durations.
   */
  times?: number[]

  /**
   * When animating keyframes, `easings` can be used to define easing functions between each keyframe. This array should be one item fewer than the number of keyframes, as these easings apply to the transitions between the keyframes.
   */
  easings?: Easing[]

  /**
   * The value to animate from.
   * By default, this is the current state of the animating value.
   */
  from?: number | string

  to?: number | string | ValueTarget

  velocity?: number

  delay?: number
}

/**
 * An animation that simulates spring physics for realistic motion.
 * This is the default animation for physical values like `x`, `y`, `scale` and `rotate`.
 */
export interface Spring extends Repeat {
  /**
   * Set `type` to `"spring"` to animate using spring physics for natural
   * movement. Type is set to `"spring"` by default.
   */
  type: 'spring'

  /**
   * Stiffness of the spring. Higher values will create more sudden movement.
   * Set to `100` by default.
   */
  stiffness?: number

  /**
   * Strength of opposing force. If set to 0, spring will oscillate
   * indefinitely. Set to `10` by default.
   */
  damping?: number

  /**
   * Mass of the moving object. Higher values will result in more lethargic
   * movement. Set to `1` by default.
   */
  mass?: number

  /**
   * The duration of the animation, defined in seconds. Spring animations can be a maximum of 10 seconds.
   *
   * If `bounce` is set, this defaults to `0.8`.
   *
   * Note: `duration` and `bounce` will be overridden if `stiffness`, `damping` or `mass` are set.
   */
  duration?: number

  /**
   * `bounce` determines the "bounciness" of a spring animation.
   *
   * `0` is no bounce, and `1` is extremely bouncy.
   *
   * If `duration` is set, this defaults to `0.25`.
   *
   * Note: `bounce` and `duration` will be overridden if `stiffness`, `damping` or `mass` are set.
   */
  bounce?: number

  /**
   * End animation if absolute speed (in units per second) drops below this
   * value and delta is smaller than `restDelta`. Set to `0.01` by default.
   */
  restSpeed?: number

  /**
   * End animation if distance is below this value and speed is below
   * `restSpeed`. When animation ends, spring gets “snapped” to. Set to
   * `0.01` by default.
   */
  restDelta?: number

  /**
   * The value to animate from.
   * By default, this is the initial state of the animating value.
   */
  from?: number | string

  to?: number | string | ValueTarget

  /**
   * The initial velocity of the spring. By default this is the current velocity of the component.
   */
  velocity?: number

  delay?: number
}

/**
 * An animation that decelerates a value based on its initial velocity,
 * usually used to implement inertial scrolling.
 *
 * Optionally, `min` and `max` boundaries can be defined, and inertia
 * will snap to these with a spring animation.
 *
 * This animation will automatically precalculate a target value,
 * which can be modified with the `modifyTarget` property.
 *
 * This allows you to add snap-to-grid or similar functionality.
 *
 * Inertia is also the animation used for `dragTransition`, and can be configured via that prop.
 */
export interface Inertia {
  /**
   * Set `type` to animate using the inertia animation. Set to `"tween"` by
   * default. This can be used for natural deceleration, like momentum scrolling.
   */
  type: 'inertia'

  /**
   * A function that receives the automatically-calculated target and returns a new one. Useful for snapping the target to a grid.
   */
  modifyTarget?(v: number): number

  /**
   * If `min` or `max` is set, this affects the stiffness of the bounce
   * spring. Higher values will create more sudden movement. Set to `500` by
   * default.
   */
  bounceStiffness?: number

  /**
   * If `min` or `max` is set, this affects the damping of the bounce spring.
   * If set to `0`, spring will oscillate indefinitely. Set to `10` by
   * default.
   */
  bounceDamping?: number

  /**
   * A higher power value equals a further target. Set to `0.8` by default.
   */
  power?: number

  /**
   * Adjusting the time constant will change the duration of the
   * deceleration, thereby affecting its feel. Set to `700` by default.
   */
  timeConstant?: number

  /**
   * End the animation if the distance to the animation target is below this value, and the absolute speed is below `restSpeed`.
   * When the animation ends, the value gets snapped to the animation target. Set to `0.01` by default.
   * Generally the default values provide smooth animation endings, only in rare cases should you need to customize these.
   */
  restDelta?: number

  /**
   * Minimum constraint. If set, the value will "bump" against this value (or immediately spring to it if the animation starts as less than this value).
   */
  min?: number

  /**
   * Maximum constraint. If set, the value will "bump" against this value (or immediately snap to it, if the initial animation value exceeds this value).
   */
  max?: number

  /**
   * The value to animate from. By default, this is the current state of the animating value.
   */
  from?: number | string

  /**
   * The initial velocity of the animation.
   * By default this is the current velocity of the component.
   */
  velocity?: number

  delay?: number
}

/**
 * Keyframes tweens between multiple `values`.
 *
 * These tweens can be arranged using the `duration`, `easings`, and `times` properties.
 */
export interface Keyframes {
  /**
   * Set `type` to `"keyframes"` to animate using the keyframes animation.
   * Set to `"tween"` by default. This can be used to animate between a series of values.
   */
  type: 'keyframes'

  /**
   * An array of values to animate between.
   */
  values: KeyframesTarget

  /**
   * An array of numbers between 0 and 1, where `1` represents the `total` duration.
   *
   * Each value represents at which point during the animation each item in the animation target should be hit, so the array should be the same length as `values`.
   *
   * Defaults to an array of evenly-spread durations.
   */
  times?: number[]

  /**
   * An array of easing functions for each generated tween, or a single easing function applied to all tweens.
   *
   * This array should be one item less than `values`, as these easings apply to the transitions *between* the `values`.
   */
  ease?: Easing | Easing[]

  /**
   * Popmotion's easing prop to define individual easings. `ease` will be mapped to this prop in keyframes animations.
   */
  easings?: Easing | Easing[]

  elapsed?: number

  /**
   * The total duration of the animation. Set to `0.3` by default.
   */
  duration?: number

  repeatDelay?: number

  from?: number | string

  to?: number | string | ValueTarget

  velocity?: number

  delay?: number
}

export interface Just {
  type: 'just'
  to?: number | string | ValueTarget
  from?: number | string
  delay?: number
  velocity?: number
}

export interface None {
  /**
   * Set `type` to `false` for an instant transition.
   */
  type: false

  from?: number | string

  delay?: number

  velocity?: number
}

export type PopmotionTransitionProps =
  | Tween
  | Spring
  | Keyframes
  | Inertia
  | Just

export type PermissiveTransitionDefinition = {
  [key: string]: any
}

export type TransitionDefinition =
  | Tween
  | Spring
  | Keyframes
  | Inertia
  | Just
  | None
  | PermissiveTransitionDefinition

export type TransitionMap = Orchestration & {
  [key: string]: TransitionDefinition
}

/**
 * Transition props
 */
export type Transition =
  | (Orchestration & Repeat & TransitionDefinition)
  | (Orchestration & Repeat & TransitionMap)

export type MakeCustomValueType<T> = { [K in keyof T]: T[K] | CustomValueType }

export type Target = MakeCustomValueType<MotionProperties>

export type MakeKeyframes<T> = {
  [K in keyof T]: T[K] | T[K][] | [null, ...T[K][]]
}

export type TargetWithKeyframes = MakeKeyframes<Target>

/**
 * An object that specifies values to animate to. Each value may be set either as
 * a single value, or an array of values.
 */
export type TargetAndTransition = TargetWithKeyframes & {
  transition?: Transition
  transitionEnd?: Target
}

export type TargetResolver = (
  custom: any,
  current: Target,
  velocity: Target,
) => TargetAndTransition

export interface CustomValueType {
  mix: (from: any, to: any) => (p: number) => number | string
  toValue: () => number | string
}

export type MotionValuesMap = {
  [key in keyof MotionProperties]: MotionValue
}

export interface MotionTransitions {
  /**
   * Stop ongoing transitions for the current element.
   */
  stop: (keys?: string | string[]) => void

  /**
   * Start a transition, push it to the `transitions` array.
   *
   * @param transition
   * @param values
   */
  push: (
    key: string,
    value: ResolvedValueTarget,
    target: MotionProperties,
    transition: Transition,
    onComplete?: () => void,
  ) => void

  /**
   * @internal Local transitions reference
   */
  motionValues: MotionValuesMap
}
