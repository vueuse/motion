import { MotionVariants } from '../types'

export const slideLeft: MotionVariants = {
  initial: {
    x: 100,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
  },
}

export const slideRight: MotionVariants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
  },
}

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

export default {
  slideLeft,
  slideRight,
  slideTop,
  slideBottom,
}
