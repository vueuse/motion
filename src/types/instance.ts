import type { VueInstance } from '@vueuse/core'
import type { MaybeRef, Ref, UnwrapRef } from 'vue'
import type { MotionProperties, MotionVariants, Variant } from './variants'

export type PermissiveTarget = VueInstance | MotionTarget

export type MotionTarget = HTMLElement | SVGElement | null | undefined

export interface MotionInstance<T extends string, V extends MotionVariants<T>> extends MotionControls<T, V> {
  target: MaybeRef<PermissiveTarget>
  variants: MaybeRef<V>
  variant: Ref<keyof V>
  state: Ref<Variant | undefined>
  motionProperties: UnwrapRef<MotionProperties>
}

export interface UseMotionOptions {
  syncVariants?: boolean
  lifeCycleHooks?: boolean
  visibilityHooks?: boolean
  eventListeners?: boolean
}

export interface MotionControls<T extends string, V extends MotionVariants<T>> {
  /**
   * Apply a variant declaration and execute the resolved transitions.
   *
   * @param variant
   * @returns Promise<void[]>
   */
  apply: (variant: Variant | keyof V) => Promise<void[]> | undefined
  /**
   * Apply a variant declaration without transitions.
   *
   * @param variant
   */
  set: (variant: Variant | keyof V) => void
  /**
   * Stop all the ongoing transitions for the current element.
   */
  stop: (keys?: string | string[]) => void
  /**
   * Helper to be passed to <transition> leave event.
   *
   * @param done
   */
  leave: (done: () => void) => void
  /**
   * Computed reference reactive to the animation state of motion controls.
   */
  isAnimating: any
}

export interface SpringControls {
  /**
   * Apply new values with transitions.
   *
   * @param variant
   */
  set: (properties: MotionProperties) => void
  /**
   * Stop all transitions.
   *
   * @param variant
   */
  stop: (key?: string | string[]) => void
  /**
   * Object containing all the current values of the spring.
   *
   * @param
   */
  values: MotionProperties
}

export type MotionInstanceBindings<T extends string, V extends MotionVariants<T>> = Record<string, MotionInstance<T, V>>

declare module 'vue' {
  export interface ComponentCustomProperties {
    $motions?: MotionInstanceBindings<any, any>
  }
}

declare module '@vue/runtime-dom' {
  interface HTMLAttributes {
    variants?: MotionVariants<any>
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
  }
}
