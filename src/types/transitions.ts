import { AnimationOptions } from 'popmotion'

export type TransitionProperties = Exclude<
  AnimationOptions<number | number[] | string | string[]>,
  'from' | 'to' | 'onComplete' | 'onPlay' | 'onRepeat' | 'onStop' | 'onUpdate'
> & {
  instant?: boolean
}

export type TransitionValues = {
  from: any
  to: any
  onUpdate?: (latest: any) => void
  onPlay?: () => void
  onComplete?: () => void
  onRepeat?: () => void
  onStop?: () => void
}
