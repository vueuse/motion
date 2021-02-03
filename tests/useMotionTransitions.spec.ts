import { useMotionTransitions } from '../src'
import { Transition } from '../src/types/transitions'

const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 25,
  restDelta: 0.5,
  restSpeed: 10,
}

describe('useMotionTransitions', () => {
  it('accepts a transitions', () => {
    const { push, transitions } = useMotionTransitions()

    push('x', 0, {}, defaultTransition)

    expect(transitions.value.length).toBe(1)
  })

  it('clears transitions on stop', async () => {
    const { push, transitions, stop } = useMotionTransitions()

    push('x', 0, {}, defaultTransition)
    push('x', 0, {}, defaultTransition)
    push('x', 0, {}, defaultTransition)
    push('x', 0, {}, defaultTransition)

    expect(transitions.value.length).toBe(4)

    stop()

    expect(transitions.value.length).toBe(0)
  })
})
