import { MotionVariants } from '../types'

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

export default {
  rollLeft,
  rollRight,
  rollTop,
  rollBottom,
}
