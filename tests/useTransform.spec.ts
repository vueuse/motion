import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import { useTransform } from '../src'

const TestComponent = {
  template: '<div>Hello world</div>',
}

const getElementRef = () => {
  const c = mount(TestComponent)

  return ref<HTMLElement>(c.element as HTMLElement)
}

describe('useTransform', () => {
  it('accepts an element', () => {
    const element = getElementRef()

    const { transform } = useTransform(element)

    expect(transform).toBeDefined()
  })

  it('mutates style properties', () => {
    const element = getElementRef()

    const { transform } = useTransform(element)

    transform.scale = 1.2

    expect(transform.scale).toBe(1.2)
  })

  it('mutates element properties', async () => {
    const element = getElementRef()

    const { transform } = useTransform(element)

    transform.translateY = '120px'

    await nextTick()

    expect(element.value.style.transform).toBe(
      'translateY(120px) translateZ(0)',
    )
  })
})
