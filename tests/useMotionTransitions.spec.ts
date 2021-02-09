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

    expect(Object.values(transitions.value).length).toBe(1)
  })

  it('clears transitions on stop', async () => {
    const { push, transitions, stop } = useMotionTransitions()

    push('x', 0, {}, defaultTransition)
    push('y', 0, {}, defaultTransition)
    push('opacity', 0, {}, defaultTransition)
    push('height', 0, {}, defaultTransition)

    expect(Object.values(transitions.value).length).toBe(4)

    stop()

    expect(Object.values(transitions.value).length).toBe(0)
  })
})
