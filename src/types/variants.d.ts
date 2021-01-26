export interface PropertiesKeys {
  [key: string]: string | number | undefined | any
}

export interface SVGPathProperties {
  pathLength?: number
  pathOffset?: number
  pathSpacing?: number
}

export interface StyleProperties extends PropertiesKeys {
  // Color props
  color?: string | number
  backgroundColor?: string | number
  outlineColor?: string | number
  fill?: string | number
  stroke?: string | number

  // Border props
  borderColor?: string | number
  borderTopColor?: string | number
  borderRightColor?: string | number
  borderBottomColor?: string | number
  borderLeftColor?: string | number
  borderWidth?: string | number
  borderTopWidth?: string | number
  borderRightWidth?: string | number
  borderBottomWidth?: string | number
  borderLeftWidth?: string | number
  borderRadius?: string | number
  radius?: string | number
  borderTopLeftRadius?: string | number
  borderTopRightRadius?: string | number
  borderBottomRightRadius?: string | number
  borderBottomLeftRadius?: string | number

  // Positioning props
  width?: string | number
  maxWidth?: string | number
  height?: string | number
  maxHeight?: string | number
  size?: string | number
  top?: string | number
  right?: string | number
  bottom?: string | number
  left?: string | number

  // Spacing props
  padding?: string | number
  paddingTop?: string | number
  paddingRight?: string | number
  paddingBottom?: string | number
  paddingLeft?: string | number
  margin?: string | number
  marginTop?: string | number
  marginRight?: string | number
  marginBottom?: string | number
  marginLeft?: string | number

  // Misc
  zIndex?: string | number

  // SVG
  fillOpacity?: string | number
  strokeOpacity?: string | number
  numOctaves?: string | number
}

export interface TransformProperties extends PropertiesKeys {
  x?: string | number
  y?: string | number
  z?: string | number
  translateX?: string | number
  translateY?: string | number
  translateZ?: string | number
  rotate?: string | number
  rotateX?: string | number
  rotateY?: string | number
  rotateZ?: string | number
  scale?: string | number
  scaleX?: string | number
  scaleY?: string | number
  scaleZ?: string | number
  skew?: string | number
  skewX?: string | number
  skewY?: string | number
  originX?: string | number
  originY?: string | number
  originZ?: string | number
  perspective?: string | number
  transformPerspective?: string | number
}

export interface TransitionProperties {}

export interface MotionProperties
  extends StyleProperties,
    TransformProperties {}

export interface Variant extends MotionProperties {
  transition: TransitionProperties
}

export type MotionVariants = {
  initial?: Variant
  enter?: Variant
  leave?: Variant
  [key: string]: Variant | undefined
}
