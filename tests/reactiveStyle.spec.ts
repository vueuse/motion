import { nextTick } from 'vue'
import { describe, it, expect } from 'vitest'
import { reactiveStyle } from '../src/reactiveStyle'

describe('reactiveStyle', () => {
  it('create a style object from props', () => {
    const { style } = reactiveStyle({
      backgroundColor: 'blue',
    })

    expect(style.value.backgroundColor).toBe('blue')
  })

  it('create a reactive style object from props', () => {
    const { state, style } = reactiveStyle()

    state.backgroundColor = 'blue'

    nextTick(() => expect(style.value.backgroundColor).toBe('blue'))
  })

  it('add default units for style properties', () => {
    const { state, style } = reactiveStyle()

    state.marginTop = 10

    nextTick(() => expect(style.value.marginTop).toBe('10px'))
  })
})
