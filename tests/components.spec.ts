import { config, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { MotionPlugin } from '../src'
import { intersect } from './utils/intersectionObserver'
import { getTestComponent, useCompletionFn, waitForMockCalls } from './utils'

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
        duration: 10,
      },
    })

    const el = wrapper.element as HTMLDivElement
    await nextTick()

    // Renders initial variant
    expect(el.style.opacity).toEqual('0')
    expect(el.style.transform).toEqual('translate3d(-100px,0px,0px)')

    await waitForMockCalls(onComplete)

    // Renders enter variant
    expect(el.style.opacity).toEqual('1')
    expect(el.style.transform).toEqual('translateZ(0px)')
  })

  it('Visibility variants', async () => {
    const onComplete = useCompletionFn()

    const wrapper = mount(TestComponent, {
      props: {
        initial: { color: 'red', y: 100, transition: { onComplete } },
        visible: { color: 'green', y: 0, transition: { onComplete } },
        duration: 10,
      },
    })

    const el = wrapper.element as HTMLDivElement
    await nextTick()

    expect(el.style.color).toEqual('red')
    expect(el.style.transform).toEqual('translate3d(0px,100px,0px)')

    // Trigger mock intersection
    intersect(el, true)
    await waitForMockCalls(onComplete)

    expect(el.style.color).toEqual('green')
    expect(el.style.transform).toEqual('translateZ(0px)')

    // Trigger mock intersection
    intersect(el, false)
    await waitForMockCalls(onComplete)

    expect(el.style.color).toEqual('red')
    expect(el.style.transform).toEqual('translate3d(0px,100px,0px)')
  })

  it('Event variants', async () => {
    const onComplete = useCompletionFn()

    const wrapper = mount(TestComponent, {
      props: {
        initial: { scale: 1, transition: { onComplete } },
        hovered: { scale: 1.2, transition: { onComplete } },
        tapped: { scale: 1.5, transition: { onComplete } },
        focused: { scale: 2, transition: { onComplete } },
        duration: 10,
      },
    })

    const el = wrapper.element as HTMLDivElement
    await nextTick()

    // Renders initial
    expect(el.style.transform).toEqual('scale(1) translateZ(0px)')

    // Trigger hovered
    await wrapper.trigger('mouseenter')
    await waitForMockCalls(onComplete)

    expect(el.style.transform).toEqual('scale(1.2) translateZ(0px)')

    // Trigger tapped
    await wrapper.trigger('mousedown')
    await waitForMockCalls(onComplete)

    expect(el.style.transform).toEqual('scale(1.5) translateZ(0px)')

    // Trigger focus
    await wrapper.trigger('focus')
    await waitForMockCalls(onComplete)

    expect(el.style.transform).toEqual('scale(2) translateZ(0px)')

    // Should return to tapped
    await wrapper.trigger('blur')
    await waitForMockCalls(onComplete)

    expect(el.style.transform).toEqual('scale(1.5) translateZ(0px)')

    // Should return to hovered
    await wrapper.trigger('mouseup')
    await waitForMockCalls(onComplete)

    expect(el.style.transform).toEqual('scale(1.2) translateZ(0px)')

    // Should return to initial
    await wrapper.trigger('mouseleave')
    await waitForMockCalls(onComplete)

    expect(el.style.transform).toEqual('scale(1) translateZ(0px)')
  })
})
