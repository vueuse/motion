import type { MotionVariants } from '../types'

// Slide from left

export const slideLeft: MotionVariants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
  },
}

export const slideVisibleLeft: MotionVariants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
}

export const slideVisibleOnceLeft: MotionVariants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  visibleOnce: {
    x: 0,
    opacity: 1,
  },
}

// Slide from right

export const slideRight: MotionVariants = {
  initial: {
    x: 100,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
  },
}

export const slideVisibleRight: MotionVariants = {
  initial: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
}

export const slideVisibleOnceRight: MotionVariants = {
  initial: {
    x: 100,
    opacity: 0,
  },
  visibleOnce: {
    x: 0,
    opacity: 1,
  },
}

// Slide from top

export const slideTop: MotionVariants = {
  initial: {
    y: -100,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
}

export const slideVisibleTop: MotionVariants = {
  initial: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export const slideVisibleOnceTop: MotionVariants = {
  initial: {
    y: -100,
    opacity: 0,
  },
  visibleOnce: {
    y: 0,
    opacity: 1,
  },
}

// Slide from bottom

export const slideBottom: MotionVariants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
}

export const slideVisibleBottom: MotionVariants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export const slideVisibleOnceBottom: MotionVariants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  visibleOnce: {
    y: 0,
    opacity: 1,
  },
}

export default {
  slideLeft,
  slideVisibleLeft,
  slideVisibleOnceLeft,
  slideRight,
  slideVisibleRight,
  slideVisibleOnceRight,
  slideTop,
  slideVisibleTop,
  slideVisibleOnceTop,
  slideBottom,
  slideVisibleBottom,
  slideVisibleOnceBottom,
}
