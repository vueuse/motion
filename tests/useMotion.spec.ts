import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { useMotion } from '../src'

const TestComponent = {
  template: '<div>Hello world</div>',
}

function getElementRef() {
  const c = mount(TestComponent)

  return ref<HTMLElement>(c.element as HTMLElement)
}

describe('useMotion', () => {
  it('accepts an element', () => {
    const element = getElementRef()

    const { target, variant, variants, state, apply, stop, isAnimating, leave, motionProperties, set } = useMotion(element)

    expect(target).toBeDefined()
    expect(variant).toBeDefined()
    expect(variants).toBeDefined()
    expect(state).toBeDefined()
    expect(apply).toBeDefined()
    expect(stop).toBeDefined()
    expect(isAnimating).toBeDefined()
    expect(leave).toBeDefined()
    expect(motionProperties).toBeDefined()
    expect(set).toBeDefined()
  })
})
