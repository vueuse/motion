import { reactiveTransform } from '../src/reactiveTransform'
describe('reactiveTransform', () => {
  it('generate transform from transformProperties', () => {
    const { result } = reactiveTransform(
      {
        rotateX: '90deg',
      },
      false,
    )

    expect(result.value).toBe('rotateX(90deg)')
  })

  it('generate a reactive transform string', () => {
    const { result, state } = reactiveTransform(
      {
        rotateX: '90deg',
      },
      false,
    )

    expect(result.value).toBe('rotateX(90deg)')

    state.rotateX = '120deg'

    expect(result.value).toBe('rotateX(120deg)')
  })

  it('concatenate the transform string correctly', () => {
    const { result } = reactiveTransform(
      {
        rotateX: '90deg',
        translateY: '120px',
      },
      false,
    )

    expect(result.value).toBe('rotateX(90deg) translateY(120px)')
  })

  it('add the translateZ when hardware acceleration enabled', () => {
    const { result } = reactiveTransform(
      {
        rotateX: '90deg',
      },
      true, // it is true by default
    )

    expect(result.value).toBe('rotateX(90deg) translateZ(0)')
  })
})
