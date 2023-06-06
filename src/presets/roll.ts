import type { MotionVariants } from '../types'

// Roll from left

export const rollLeft: MotionVariants<never> = {
  initial: {
    x: -100,
    rotate: 90,
    opacity: 0,
  },
  enter: {
    x: 0,
    rotate: 0,
    opacity: 1,
  },
}

export const rollVisibleLeft: MotionVariants<never> = {
  initial: {
    x: -100,
    rotate: 90,
    opacity: 0,
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1,
  },
}

export const rollVisibleOnceLeft: MotionVariants<never> = {
  initial: {
    x: -100,
    rotate: 90,
    opacity: 0,
  },
  visibleOnce: {
    x: 0,
    rotate: 0,
    opacity: 1,
  },
}

// Roll from right

export const rollRight: MotionVariants<never> = {
  initial: {
    x: 100,
    rotate: -90,
    opacity: 0,
  },
  enter: {
    x: 0,
    rotate: 0,
    opacity: 1,
  },
}

export const rollVisibleRight: MotionVariants<never> = {
  initial: {
    x: 100,
    rotate: -90,
    opacity: 0,
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1,
  },
}

export const rollVisibleOnceRight: MotionVariants<never> = {
  initial: {
    x: 100,
    rotate: -90,
    opacity: 0,
  },
  visibleOnce: {
    x: 0,
    rotate: 0,
    opacity: 1,
  },
}

// Roll from top

export const rollTop: MotionVariants<never> = {
  initial: {
    y: -100,
    rotate: -90,
    opacity: 0,
  },
  enter: {
    y: 0,
    rotate: 0,
    opacity: 1,
  },
}

export const rollVisibleTop: MotionVariants<never> = {
  initial: {
    y: -100,
    rotate: -90,
    opacity: 0,
  },
  visible: {
    y: 0,
    rotate: 0,
    opacity: 1,
  },
}

export const rollVisibleOnceTop: MotionVariants<never> = {
  initial: {
    y: -100,
    rotate: -90,
    opacity: 0,
  },
  visibleOnce: {
    y: 0,
    rotate: 0,
    opacity: 1,
  },
}

// Roll from bottom

export const rollBottom: MotionVariants<never> = {
  initial: {
    y: 100,
    rotate: 90,
    opacity: 0,
  },
  enter: {
    y: 0,
    rotate: 0,
    opacity: 1,
  },
}

export const rollVisibleBottom: MotionVariants<never> = {
  initial: {
    y: 100,
    rotate: 90,
    opacity: 0,
  },
  visible: {
    y: 0,
    rotate: 0,
    opacity: 1,
  },
}

export const rollVisibleOnceBottom: MotionVariants<never> = {
  initial: {
    y: 100,
    rotate: 90,
    opacity: 0,
  },
  visibleOnce: {
    y: 0,
    rotate: 0,
    opacity: 1,
  },
}

export default {
  rollLeft,
  rollVisibleLeft,
  rollVisibleOnceLeft,
  rollRight,
  rollVisibleRight,
  rollVisibleOnceRight,
  rollTop,
  rollVisibleTop,
  rollVisibleOnceTop,
  rollBottom,
  rollVisibleBottom,
  rollVisibleOnceBottom,
}
