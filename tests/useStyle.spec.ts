import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import { useStyle } from '../src'

const TestComponent = {
  template: '<div>Hello world</div>',
}

const getElementRef = () => {
  const c = mount(TestComponent)

  return ref<HTMLElement>(c.element as HTMLElement)
}

describe('useStyle', () => {
  it('accepts an element', () => {
    const element = getElementRef()

    const { style } = useStyle(element)

    expect(style).toBeDefined()
  })

  it('mutates style properties', () => {
    const element = getElementRef()

    const { style } = useStyle(element)

    style.backgroundColor = 'blue'

    expect(style.backgroundColor).toBe('blue')
  })

  it('mutates element properties', async () => {
    const element = getElementRef()

    const { style } = useStyle(element)

    style.backgroundColor = 'blue'

    await nextTick()

    expect(element.value.style.backgroundColor).toBe('blue')
  })
})
