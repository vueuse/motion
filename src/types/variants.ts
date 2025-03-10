import type { CSSProperties } from 'vue'
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
export type TransformValue = string | number

export interface TransformProperties {
  x?: TransformValue | TransformValue[]
  y?: TransformValue | TransformValue[]
  z?: TransformValue | TransformValue[]
  translateX?: TransformValue | TransformValue[]
  translateY?: TransformValue | TransformValue[]
  translateZ?: TransformValue | TransformValue[]
  rotate?: TransformValue | TransformValue[]
  rotateX?: TransformValue | TransformValue[]
  rotateY?: TransformValue | TransformValue[]
  rotateZ?: TransformValue | TransformValue[]
  scale?: TransformValue | TransformValue[]
  scaleX?: TransformValue | TransformValue[]
  scaleY?: TransformValue | TransformValue[]
  scaleZ?: TransformValue | TransformValue[]
  skew?: TransformValue | TransformValue[]
  skewX?: TransformValue | TransformValue[]
  skewY?: TransformValue | TransformValue[]
  originX?: TransformValue | TransformValue[]
  originY?: TransformValue | TransformValue[]
  originZ?: TransformValue | TransformValue[]
  perspective?: TransformValue | TransformValue[]
  transformPerspective?: TransformValue | TransformValue[]
}

/**
 * Relevant styling properties
 */
export type StyleProperties = Omit<CSSProperties, 'transition' | 'rotate' | 'scale' | 'perspective' | 'transform' | 'transformBox' | 'transformOrigin' | 'transformStyle'>

/**
 * Available properties for useMotion variants
 */
export type MotionProperties = StyleProperties | TransformProperties | SVGPathProperties

/**
 * Permissive properties for useSpring
 */
export type PermissiveMotionProperties = MotionProperties & Record<string, ResolvedSingleTarget>

/**
 * Variant
 */
export type Variant = {
  transition?: Transition
} & MotionProperties

/**
 * Motion variants object
 */
export type MotionVariants<T extends string> = {
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
} & {
  // Custom variants
  [key in T]?: Variant
}
