import type { Variant } from './../types/variants'
import { reactiveStyle } from '../reactiveStyle'
import { reactiveTransform } from '../reactiveTransform'

/**
 * A list of all transformable axes. We'll use this list to generated a version
 * of each axes for each transform.
 */
export const transformAxes = ['', 'X', 'Y', 'Z']

/**
 * An ordered array of each transformable value. By default, transform values
 * will be sorted to this order.
 */
const order = ['perspective', 'translate', 'scale', 'rotate', 'skew']

/**
 * Generate a list of every possible transform key.
 */
export const transformProps = ['transformPerspective', 'x', 'y', 'z']
order.forEach((operationKey) => {
  transformAxes.forEach((axesKey) => {
    const key = operationKey + axesKey
    transformProps.push(key)
  })
})

/**
 * A function to use with Array.sort to sort transform keys by their default order.
 */
export function sortTransformProps(a: string, b: string) {
  return transformProps.indexOf(a) - transformProps.indexOf(b)
}

/**
 * A quick lookup for transform props.
 */
const transformPropSet = new Set(transformProps)
export function isTransformProp(key: string) {
  return transformPropSet.has(key)
}

/**
 * A quick lookup for transform origin props
 */
const transformOriginProps = new Set(['originX', 'originY', 'originZ'])
export function isTransformOriginProp(key: string) {
  return transformOriginProps.has(key)
}

/**
 * Split values between style and transform keys.
 */
export function splitValues(variant: Variant) {
  const transform = {}
  const style = {}

  Object.entries(variant).forEach(([key, value]) => {
    // @ts-expect-error - Fix errors later for typescript 5
    if (isTransformProp(key) || isTransformOriginProp(key))
      transform[key] = value
    // @ts-expect-error - Fix errors later for typescript 5
    else style[key] = value
  })

  return { transform, style }
}

export function variantToStyle(variant: Variant) {
  // Split values between `transform` and `style`
  const { transform: _transform, style: _style } = splitValues(variant)

  // Generate transform string
  const { transform } = reactiveTransform(_transform)

  // Generate style string
  const { style } = reactiveStyle(_style)

  // @ts-expect-error - Set transform from style
  if (transform.value)
    style.value.transform = transform.value

  return style.value
}
