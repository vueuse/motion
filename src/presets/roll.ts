import { MotionVariants } from '../types'

// Roll from left

export const rollLeft: MotionVariants = {
  initial: {
    x: 100,
    rotate: 90,
    opacity: 0,
  },
  enter: {
    x: 0,
    rotate: 0,
    opacity: 1,
  },
}

export const rollVisibleLeft: MotionVariants = {
  initial: {
    x: 100,
    rotate: 90,
    opacity: 0,
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1,
  },
}

// Roll from right

export const rollRight: MotionVariants = {
  initial: {
    x: -100,
    rotate: -90,
    opacity: 0,
  },
  enter: {
    x: 0,
    rotate: 0,
    opacity: 1,
  },
}

export const rollVisibleRight: MotionVariants = {
  initial: {
    x: -100,
    rotate: -90,
    opacity: 0,
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1,
  },
}

// Roll from top

export const rollTop: MotionVariants = {
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

export const rollVisibleTop: MotionVariants = {
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

// Roll from bottom

export const rollBottom: MotionVariants = {
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

export const rollVisibleBottom: MotionVariants = {
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

export default {
  rollLeft,
  rollVisibleLeft,
  rollRight,
  rollVisibleRight,
  rollTop,
  rollVisibleTop,
  rollBottom,
  rollVisibleBottom,
}
