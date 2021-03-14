import { MotionProperties } from '../types'

/**
 * Return an object from a transform string.
 *
 * @param str
 */
export function parseTransform(transform: string): Partial<MotionProperties> {
  // Split transform string.
  const transforms = transform.trim().split(/\) |\)/)

  // Handle "initial", "inherit", "unset".
  if (transforms.length === 1) {
    return {}
  }

  const parseValues = (value: string): string | number => {
    // If value is ending with px or deg, return it as a number
    if (value.endsWith('px') || value.endsWith('deg')) return parseFloat(value)

    // Return as number
    if (isNaN(Number(value))) return Number(value)

    // Parsing impossible, return as string
    return value
  }

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
