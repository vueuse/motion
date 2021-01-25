import { Properties as CSSTypes } from 'csstype'
import { SpringOptions } from 'popmotion'

export interface CSSProperties
  extends Omit<CSSTypes<string | number>, 'rotate' | 'scale'> {}

export interface TransformProperties {
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

export interface MotionProperties extends CSSProperties, TransformProperties {}

export interface Variant extends MotionProperties {
  spring?: Omit<SpringOptions, 'from' | 'to' | 'transition'>
}

export type VariantNames = 'initial' | 'enter' | 'exit'

export type MotionVariants = {
  [key: string]: Variant
}
