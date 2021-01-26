import { animate } from 'popmotion'
import { TransitionProperties, TransitionValues } from './types/transitions'

export const useMotionTransitions = () => {
  let transitions: (() => void)[] = []

  const stop = () => {
    transitions.forEach((stop) => stop())
    transitions = []
  }

  const push = (transition: TransitionProperties, values: TransitionValues) => {
    const { stop: stopAnimation } = animate({
      ...transition,
      ...values,
    })

    transitions.push(stopAnimation)
  }

  return { stop, push }
}
