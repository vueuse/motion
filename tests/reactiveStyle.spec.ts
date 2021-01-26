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

    expect(style.value.backgroundColor).toBe('blue')
  })

  it('add default units for style properties', () => {
    const { state, style } = reactiveStyle()

    state.marginTop = 10

    expect(style.value.marginTop).toBe('10px')
  })
})
