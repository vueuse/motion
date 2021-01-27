import { CSSProperties } from 'vue'
import { TransitionProperties } from './transitions'

export interface PropertiesKeys {
  [key: string]: string | number | undefined | any
}

export interface SVGPathProperties {
  pathLength?: number
  pathOffset?: number
  pathSpacing?: number
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

export interface StyleProperties
  extends Omit<CSSProperties, keyof TransformProperties> {}

export interface Variant extends StyleProperties, TransformProperties {
  transition?: TransitionProperties
}

export type MotionVariants = {
  initial?: Variant
  enter?: Variant
  leave?: Variant
  [key: string]: Variant | undefined
}
