import { MotionVariants } from '../types'

export const pop: MotionVariants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  enter: {
    scale: 1,
    opacity: 1,
  },
}

export default {
  pop,
}
