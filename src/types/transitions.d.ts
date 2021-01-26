import { SVGPathProperties, TransformProperties } from './types/variants'

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
  delay?: number
  when?: false | 'beforeChildren' | 'afterChildren' | string
  delayChildren?: number
  staggerChildren?: number
  staggerDirection?: number
}

export interface Repeat {
  repeat?: number
  repeatType?: 'loop' | 'reverse' | 'mirror'
  repeatDelay?: number
}

export interface Tween extends Repeat {
  type?: 'tween'
  duration?: number
  ease?: Easing | Easing[]
  elapsed?: number
  times?: number[]
  easings?: Easing[]
  from?: number | string
  to?: number | string | ValueTarget
  velocity?: number
  delay?: number
}

export interface Spring extends Repeat {
  type: 'spring'
  stiffness?: number
  damping?: number
  mass?: number
  duration?: number
  bounce?: number
  restSpeed?: number
  restDelta?: number
  from?: number | string
  to?: number | string | ValueTarget
  velocity?: number
  delay?: number
}

export interface Inertia {
  type: 'inertia'
  modifyTarget?(v: number): number
  bounceStiffness?: number
  bounceDamping?: number
  power?: number
  timeConstant?: number
  restDelta?: number
  min?: number
  max?: number
  from?: number | string
  velocity?: number
  delay?: number
}

export interface Keyframes {
  type: 'keyframes'
  values: KeyframesTarget
  times?: number[]
  ease?: Easing | Easing[]
  easings?: Easing | Easing[]
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

export type Transition =
  | (Orchestration & Repeat & TransitionDefinition)
  | (Orchestration & Repeat & TransitionMap)

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type CSSPropertiesWithoutTransitionOrSingleTransforms = Omit<
  CSSProperties,
  'transition' | 'rotate' | 'scale' | 'perspective'
>

type TargetProperties = CSSPropertiesWithoutTransitionOrSingleTransforms &
  SVGAttributes<SVGElement> &
  TransformProperties &
  CustomStyles &
  SVGPathProperties

export type MakeCustomValueType<T> = { [K in keyof T]: T[K] | CustomValueType }

export type Target = MakeCustomValueType<TargetProperties>

export type MakeKeyframes<T> = {
  [K in keyof T]: T[K] | T[K][] | [null, ...T[K][]]
}

export type TargetWithKeyframes = MakeKeyframes<Target>

export type TargetAndTransition = TargetWithKeyframes & {
  transition?: Transition
  transitionEnd?: Target
}

export type TargetResolver = (
  custom: any,
  current: Target,
  velocity: Target,
) => TargetAndTransition

export type Variant = TargetAndTransition | TargetResolver

export type Variants = {
  [key: string]: Variant
}

export interface CustomValueType {
  mix: (from: any, to: any) => (p: number) => number | string
  toValue: () => number | string
}
