import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import { useElementTransform } from '../src'

const TestComponent = {
  template: '<div>Hello world</div>',
}

function getElementRef() {
  const c = mount(TestComponent)

  return ref<HTMLElement>(c.element as HTMLElement)
}

describe('useElementTransform', () => {
  it('accepts an element', () => {
    const element = getElementRef()

    const { transform } = useElementTransform(element)

    expect(transform).toBeDefined()
  })

  it('mutates style properties', () => {
    const element = getElementRef()

    const { transform } = useElementTransform(element)

    transform.scale = 1.2

    expect(transform.scale).toBe(1.2)
  })

  it('mutates element properties', async () => {
    const element = getElementRef()

    const { transform } = useElementTransform(element)

    transform.translateY = '120px'

    await nextTick()

    expect(element.value.style.transform).toBe('translateY(120px) translateZ(0px)')
  })
})
