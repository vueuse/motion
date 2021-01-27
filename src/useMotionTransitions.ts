import { animate } from 'popmotion'
import { ref } from 'vue'
import { TransitionProperties, TransitionValues } from './types/transitions'

export function useMotionTransitions() {
  const transitions = ref<(() => void)[]>([])

  const stop = () => {
    if (transitions.value && transitions.value.length > 0) {
      transitions.value.forEach((stop) => stop())
      transitions.value = []
    }
  }

  const push = (transition: TransitionProperties, values: TransitionValues) => {
    const { stop: stopAnimation } = animate({
      ...transition,
      ...values,
    })

    transitions.value.push(stopAnimation)
  }

  return { transitions, stop, push }
}
