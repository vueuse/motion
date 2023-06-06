import type { MotionVariants } from '../types'

export const pop: MotionVariants<never> = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  enter: {
    scale: 1,
    opacity: 1,
  },
}

export const popVisible: MotionVariants<never> = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
}

export const popVisibleOnce: MotionVariants<never> = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  visibleOnce: {
    scale: 1,
    opacity: 1,
  },
}

export default {
  pop,
  popVisible,
  popVisibleOnce,
}
