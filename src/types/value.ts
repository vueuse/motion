export type StopAnimation = { stop: () => void }

export type Transformer<T> = (v: T) => T

export type Subscriber<T> = (v: T) => void

export type PassiveEffect<T> = (v: T, safeSetter: (v: T) => void) => void

export type StartAnimation = (complete?: () => void) => StopAnimation
