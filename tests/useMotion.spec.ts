import { mount } from '@vue/test-utils'
import { ref } from 'vue-demi'
import { describe, it, expect } from 'vitest'
import { useMotion } from '../src'

const TestComponent = {
  template: '<div>Hello world</div>',
}

const getElementRef = () => {
  const c = mount(TestComponent)

  return ref<HTMLElement>(c.element as HTMLElement)
}

describe('useMotion', () => {
  it('accepts an element', () => {
    const element = getElementRef()

    const { target, variant, variants, state, apply, stopTransitions } =
      useMotion(element)

    expect(target).toBeDefined()
    expect(variant).toBeDefined()
    expect(variants).toBeDefined()
    expect(state).toBeDefined()
    expect(apply).toBeDefined()
    expect(stopTransitions).toBeDefined()
  })
})
