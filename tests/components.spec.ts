import { config, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'
import { MotionPlugin } from '../src'
import { MotionComponent } from '../src/components'

function useCompletionFn() {
  return vi.fn(() => {})
}

// Get component using either `v-motion` directive or `<Motion>` component
function getTestComponent(t: string) {
  if (t === 'directive') {
    return { template: `<div v-motion>Hello world</div>` }
  }

  return { render: () => h(MotionComponent) }
}

// Register plugin
config.global.plugins.push(MotionPlugin)

describe.each([
  { t: 'directive', name: '`v-motion` directive' },
  { t: 'component', name: '`<Motion>` component' },
])(`$name`, async ({ t }) => {
  const TestComponent = getTestComponent(t)

  it('Lifecycle variants', async () => {
    const onComplete = useCompletionFn()

    const wrapper = mount(TestComponent, {
      props: {
        initial: { opacity: 0, x: -100 },
        enter: { opacity: 1, x: 0, transition: { onComplete } },
      },
    })

    const el = wrapper.element as HTMLDivElement
    await nextTick()

    // Renders initial variant
    expect(el.style.opacity).toEqual('0')
    expect(el.style.transform).toEqual('translate3d(-100px,0px,0px)')

    await vi.waitUntil(() => onComplete.mock.calls.length === 2)

    // Renders enter variant
    expect(el.style.opacity).toEqual('1')
    expect(el.style.transform).toEqual('translateZ(0px)')
  })

  // TODO: not sure intersection observer works using `happy-dom`
  it.todo('Visibility variants', async () => {
    const onComplete = useCompletionFn()

    const wrapper = mount(TestComponent, {
      props: {
        initial: { color: 'red', y: 100 },
        visible: { color: 'green', y: 0, transition: { onComplete } },
      },
    })

    const el = wrapper.element as HTMLDivElement
    await nextTick()

    expect(el.style.color).toEqual('red')
    expect(el.style.transform).toEqual('translate3d(0px,100px,0px)')

    await vi.waitUntil(() => onComplete.mock.calls.length === 2)

    expect(el.style.color).toEqual('green')
    expect(el.style.transform).toEqual('translate3d(0px,0px,0px)')
  })

  it('Event variants', async () => {
    const onComplete = useCompletionFn()

    const wrapper = mount(TestComponent, {
      props: {
        initial: { scale: 1, transition: { onComplete } },
        hovered: { scale: 1.2, transition: { onComplete } },
        tapped: { scale: 1.5, transition: { onComplete } },
        focused: { scale: 2, transition: { onComplete } },
        duration: 50,
      },
    })

    const el = wrapper.element as HTMLDivElement
    await nextTick()

    // Renders initial
    expect(el.style.transform).toEqual('scale(1) translateZ(0px)')

    // Trigger hovered
    await wrapper.trigger('mouseenter')
    await vi.waitUntil(() => onComplete.mock.calls.length === 1)

    expect(el.style.transform).toEqual('scale(1.2) translateZ(0px)')

    // Trigger tapped
    await wrapper.trigger('mousedown')
    await vi.waitUntil(() => onComplete.mock.calls.length === 2)

    expect(el.style.transform).toEqual('scale(1.5) translateZ(0px)')

    // Trigger focus
    await wrapper.trigger('focus')
    await vi.waitUntil(() => onComplete.mock.calls.length === 3)

    expect(el.style.transform).toEqual('scale(2) translateZ(0px)')

    // Should return to tapped
    await wrapper.trigger('blur')
    await vi.waitUntil(() => onComplete.mock.calls.length === 4)

    expect(el.style.transform).toEqual('scale(1.5) translateZ(0px)')

    // Should return to hovered
    await wrapper.trigger('mouseup')
    await vi.waitUntil(() => onComplete.mock.calls.length === 5)

    expect(el.style.transform).toEqual('scale(1.2) translateZ(0px)')

    // Should return to initial
    await wrapper.trigger('mouseleave')
    await vi.waitUntil(() => onComplete.mock.calls.length === 6)

    expect(el.style.transform).toEqual('scale(1) translateZ(0px)')
  })
})
