import { describe, expect, it } from 'vitest'
import { useMotionTransitions } from '../src'
import type { Transition } from '../src/types/transitions'

const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 25,
  restDelta: 0.5,
  restSpeed: 10,
}

describe('useMotionTransitions', () => {
  it('creates a motion value', () => {
    const { push, motionValues } = useMotionTransitions()

    push('x', 0, { x: 25 }, defaultTransition)

    expect(Object.values(motionValues.value).length).toBe(1)
  })

  it('clears motion values on stop', async() => {
    const { push, motionValues, stop } = useMotionTransitions()

    push('x', 0, { x: 25 }, defaultTransition)
    push('y', 0, { y: 25 }, defaultTransition)
    push('opacity', 0, { opacity: 1 }, defaultTransition)
    push('height', 0, { height: 25 }, defaultTransition)

    expect(Object.values(motionValues.value).length).toBe(4)

    stop()

    expect(Object.values(motionValues.value).length).toBe(0)
  })
})
