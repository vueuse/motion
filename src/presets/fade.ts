import type { MotionVariants } from '../types'

export const fade: MotionVariants<never> = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
}

export const fadeVisible: MotionVariants<never> = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

export const fadeVisibleOnce: MotionVariants<never> = {
  initial: {
    opacity: 0,
  },
  visibleOnce: {
    opacity: 1,
  },
}

export default {
  fade,
  fadeVisible,
  fadeVisibleOnce,
}
