import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import { useElementStyle } from '../src'

const TestComponent = {
  template: '<div>Hello world</div>',
}

function getElementRef() {
  const c = mount(TestComponent)

  return ref<HTMLElement>(c.element as HTMLElement)
}

describe('useElementStyle', () => {
  it('accepts an element', () => {
    const element = getElementRef()

    const { style } = useElementStyle(element)

    expect(style).toBeDefined()
  })

  it('mutates style properties', () => {
    const element = getElementRef()

    const { style } = useElementStyle(element)

    style.backgroundColor = 'blue'

    expect(style.backgroundColor).toBe('blue')
  })

  it('mutates element properties', async () => {
    const element = getElementRef()

    const { style } = useElementStyle(element)

    style.backgroundColor = 'blue'

    await nextTick()

    expect(element.value.style.backgroundColor).toBe('blue')
  })
})
