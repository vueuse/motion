import { useMotionTransitions } from '../src'
import { TransitionProperties } from '../src/types/transitions'

const defaultTransition: TransitionProperties = {
  type: 'spring',
  stiffness: 500,
  damping: 25,
  restDelta: 0.5,
  restSpeed: 10,
}

describe('useMotionTransitions', () => {
  it('accepts a transitions', () => {
    const { push, transitions } = useMotionTransitions()

    push(defaultTransition, {
      from: 0,
      to: 1,
    })

    expect(transitions.value.length).toBe(1)
  })

  it('clears transitions on stop', async () => {
    const { push, transitions, stop } = useMotionTransitions()

    push(defaultTransition, {
      from: 0,
      to: 1,
    })

    push(defaultTransition, {
      from: 0,
      to: 1,
    })

    push(defaultTransition, {
      from: 0,
      to: 1,
    })

    push(defaultTransition, {
      from: 0,
      to: 1,
    })

    expect(transitions.value.length).toBe(4)

    stop()

    expect(transitions.value.length).toBe(0)
  })
})
