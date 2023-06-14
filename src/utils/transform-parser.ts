import type { MotionProperties, ResolvedValueTarget, TransformProperties } from '../types'

/**
 * Return an object from a transform string.
 *
 * @param str
 */
export function parseTransform(transform: string): Partial<MotionProperties> {
  // Split transform string.
  const transforms = transform.trim().split(/\) |\)/)

  // Handle "initial", "inherit", "unset".
  if (transforms.length === 1) return {}

  const parseValues = (value: string): string | number => {
    // If value is ending with px or deg, return it as a number
    if (value.endsWith('px') || value.endsWith('deg')) return Number.parseFloat(value)

    // Return as number
    if (Number.isNaN(Number(value))) return Number(value)

    // Parsing impossible, return as string
    return value
  }

  // Reduce the result to an object and return it
  return transforms.reduce((acc, transform: string) => {
    if (!transform) return acc

    const [name, transformValue] = transform.split('(')

    const valueArray = transformValue.split(',')

    const values = valueArray.map((val) => {
      return parseValues(val.endsWith(')') ? val.replace(')', '') : val.trim())
    })

    const value = values.length === 1 ? values[0] : values

    return {
      ...acc,
      [name]: value,
    }
  }, {})
}

/**
 * Sets the state from a parsed transform string.
 *
 * Used in useElementTransform init to restore element transform string in cases it does exists.
 *
 * @param state
 * @param transform
 */
export function stateFromTransform(state: TransformProperties, transform: string) {
  Object.entries(parseTransform(transform)).forEach(([key, value]) => {
    // Axes reference for loops
    const axes = ['x', 'y', 'z']

    // Handle translate3d and scale3d
    if (key === 'translate3d') {
      if (value === 0) {
        // @ts-expect-error - Fix errors later for typescript 5
        axes.forEach((axis) => (state[axis] = 0))
        return
      }

      // Loop on parsed scale / translate definition
      // @ts-expect-error - Fix errors later for typescript 5
      value.forEach((axisValue: ResolvedValueTarget, index: number) => (state[axes[index]] = axisValue))

      return
    }

    // Get value w/o unit, as unit is applied later on
    value = Number.parseFloat(value)

    // Sync translateX on X
    if (key === 'translateX') {
      state.x = value
      return
    }

    // Sync translateY on Y
    if (key === 'translateY') {
      state.y = value
      return
    }

    // Sync translateZ on Z
    if (key === 'translateZ') {
      state.z = value
      return
    }

    // Set raw value
    // @ts-expect-error - Fix errors later for typescript 5
    state[key] = value
  })
}
