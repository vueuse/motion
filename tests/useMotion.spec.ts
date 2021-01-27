import { mount } from '@vue/test-utils'
import { ref } from 'vue'
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

    const { set, stop } = useMotion(element)

    expect(set).toBeDefined()
    expect(stop).toBeDefined()
  })
})
