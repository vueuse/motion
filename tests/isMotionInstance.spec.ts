import { ref } from '@vue/reactivity'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { isMotionInstance, useMotion } from '../src'

const TestComponent = {
  template: '<div>Hello world</div>',
}

const getElementRef = () => {
  const c = mount(TestComponent)

  return ref<HTMLElement>(c.element as HTMLElement)
}

describe('isMotionInstance', () => {
  it('recognize a motion instance', () => {
    const ref = getElementRef()

    const motionInstance = useMotion(ref)

    expect(isMotionInstance(motionInstance)).toBe(true)
  })

  it('does not recognize wrong object', () => {
    const motionInstance = {
      set: 'test',
      stopTransitions: {},
      target: '',
      apply: 25,
    }

    expect(isMotionInstance(motionInstance)).toBe(false)
  })
})
