import {
  alpha,
  color,
  complex,
  degrees,
  filter,
  number,
  progressPercentage,
  px,
  scale,
  ValueType,
} from 'style-value-types'

interface ValueTypeMap {
  [key: string]: ValueType
}

/**
 * ValueType for "auto"
 */
export const auto: ValueType = {
  test: (v: any) => v === 'auto',
  parse: (v) => v,
}

/**
 * ValueType for ints
 */
const int = {
  ...number,
  transform: Math.round,
}

export const valueTypes: ValueTypeMap = {
  // Color props
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,

  // Border props
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,

  // Positioning props
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  size: px,
  top: px,
  right: px,
  bottom: px,
  left: px,

  // Spacing props
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,

  // Transform props
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,

  // Misc
  zIndex: int,
  filter,
  WebkitFilter: filter,

  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int,
}

/**
 * Return the value type for a key.
 *
 * @param key
 */
export const getValueType = (key: string) => valueTypes[key]

/**
 * Transform the value using its value type, or return the value.
 *
 * @param value
 * @param type
 */
export const getValueAsType = (value: any, type?: ValueType) => {
  return type && typeof value === 'number' && type.transform
    ? type.transform(value)
    : value
}

/**
 * Get default animatable
 *
 * @param key
 * @param value
 */
export function getAnimatableNone(key: string, value: string): any {
  let defaultValueType = getValueType(key)
  if (defaultValueType !== filter) defaultValueType = complex
  // If value is not recognised as animatable, ie "none", create an animatable version origin based on the target
  return defaultValueType.getAnimatableNone
    ? defaultValueType.getAnimatableNone(value)
    : undefined
}
