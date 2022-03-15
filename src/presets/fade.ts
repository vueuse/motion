import type { MotionVariants } from '../types'

export const fade: MotionVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
}

export const fadeVisible: MotionVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

export const fadeVisibleOnce: MotionVariants = {
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
