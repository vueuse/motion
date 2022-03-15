import { set as __set } from 'vue-demi'
import type {
  MotionProperties,
  ResolvedValueTarget,
  TransformProperties,
} from '../types'

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
    if (value.endsWith('px') || value.endsWith('deg')) return parseFloat(value)

    // Return as number
    if (isNaN(Number(value))) return Number(value)

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
export function stateFromTransform(
  state: TransformProperties,
  transform: string,
) {
  Object.entries(parseTransform(transform)).forEach(([key, value]) => {
    // Get value w/o unit, as unit is applied later on
    value = parseFloat(value)

    // Axes reference for loops
    const axes = ['x', 'y', 'z']

    // Handle translate3d and scale3d
    if (key === 'translate3d') {
      if (value === 0) {
        axes.forEach((axis) => {
          __set(state, axis, 0)
        })
        return
      }

      // Loop on parsed scale / translate definition
      value.forEach((axisValue: ResolvedValueTarget, index: number) => {
        __set(state, axes[index], axisValue)
      })

      return
    }

    // Sync translateX on X
    if (key === 'translateX') {
      __set(state, 'x', value)
      return
    }

    // Sync translateY on Y
    if (key === 'translateY') {
      __set(state, 'y', value)
      return
    }

    // Sync translateZ on Z
    if (key === 'translateZ') {
      __set(state, 'z', value)
      return
    }

    // Set raw value
    __set(state, key, value)
  })
}
