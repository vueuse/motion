import { nextTick } from 'vue'
import { reactiveTransform } from '../src/reactiveTransform'
describe('reactiveTransform', () => {
  it('generate transform from transformProperties', () => {
    const { transform } = reactiveTransform(
      {
        rotateX: 90,
      },
      false,
    )

    expect(transform.value).toBe('rotateX(90deg)')
  })

  it('generate a reactive transform string', () => {
    const { transform, state } = reactiveTransform(
      {
        rotateX: 90,
      },
      false,
    )

    expect(transform.value).toBe('rotateX(90deg)')

    state.rotateX = 120

    nextTick(() => expect(transform.value).toBe('rotateX(120deg)'))
  })

  it('concatenate the transform string correctly', () => {
    const { transform } = reactiveTransform(
      {
        rotateX: 90,
        translateY: 120,
      },
      false,
    )

    expect(transform.value).toBe('rotateX(90deg) translateY(120px)')
  })

  it('add the translateZ when hardware acceleration enabled', () => {
    const { transform } = reactiveTransform(
      {
        rotateX: 90,
      },
      true, // it is true by default
    )

    expect(transform.value).toBe('rotateX(90deg) translateZ(0px)')
  })
})
