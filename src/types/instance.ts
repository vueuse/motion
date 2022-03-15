import type { Fn, MaybeRef, VueInstance } from '@vueuse/core'
import type { Ref, UnwrapRef } from 'vue-demi'
import type { MotionProperties, MotionVariants, Variant } from './variants'

export type PermissiveTarget = VueInstance | MotionTarget

export type MotionTarget = HTMLElement | SVGElement | null | undefined

export interface MotionInstance<T = MotionVariants> extends MotionControls {
  target: MaybeRef<PermissiveTarget>
  variants: MaybeRef<T>
  variant: Ref<keyof T>
  state: Ref<Variant | undefined>
  motionProperties: UnwrapRef<MotionProperties>
  stop: (force?: boolean) => void
}

export interface UseMotionOptions {
  syncVariants?: boolean
  lifeCycleHooks?: boolean
  visibilityHooks?: boolean
  eventListeners?: boolean
}

export interface MotionControls {
  /**
   * Apply a variant declaration and execute the resolved transitions.
   *
   * @param variant
   * @returns Promise<void[]>
   */
  apply: (variant: Variant | string) => Promise<void[]> | undefined
  /**
   * Apply a variant declaration without transitions.
   *
   * @param variant
   */
  set: (variant: Variant | string) => void
  /**
   * Stop all the ongoing transitions for the current element.
   */
  stopTransitions: Fn
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

export type MotionInstanceBindings<T> = Record<string, MotionInstance<T>>

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $motions?: MotionInstanceBindings<any>
  }
}

declare module '@vue/runtime-dom' {
  interface HTMLAttributes {
    variants?: MotionVariants
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
