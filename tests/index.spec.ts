import useToggle from '../src'

describe('useToggle', () => {
  const [toggleable, toggle] = useToggle(true)
  it('returns a boolean ref', () => {
    expect(toggleable.value).toBe(true)
  })

  it('is toggleable', () => {
    toggle()

    expect(toggleable.value).toBe(false)
  })
})
