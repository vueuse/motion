import type { CSSProperties, SVGAttributes } from 'vue-demi'
import type { ResolvedSingleTarget, Transition } from './transitions'

/**
 * Permissive properties keys
 */
export type PropertiesKeys = Record<string, string | number | undefined | any>

/**
 * SVG Supported properties
 */
export interface SVGPathProperties {
  pathLength?: number
  pathOffset?: number
  pathSpacing?: number
}

/**
 * Transform properties
 */
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

/**
 * Relevant styling properties
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type StyleProperties = Omit<
CSSProperties,
| 'transition'
| 'rotate'
| 'scale'
| 'perspective'
| 'transform'
| 'transformBox'
| 'transformOrigin'
| 'transformStyle'
>

/**
 * Available properties for useMotion variants
 */
export type MotionProperties =
  | StyleProperties
  | SVGAttributes
  | TransformProperties
  | SVGPathProperties

/**
 * Permissive properties for useSpring
 */
export type PermissiveMotionProperties = MotionProperties &
Record<string, ResolvedSingleTarget>

/**
 * Variant
 */
export type Variant = {
  transition?: Transition
} & MotionProperties

/**
 * Motion variants object
 */
export interface MotionVariants {
  // Initial variant
  initial?: Variant
  // Lifecycle hooks variants
  enter?: Variant
  leave?: Variant
  // Intersection observer variants
  visible?: Variant
  visibleOnce?: Variant
  // Event listeners variants
  hovered?: Variant
  tapped?: Variant
  focused?: Variant
  // Custom variants
  [key: string]: Variant | undefined
}
