import { Fn } from '@vueuse/core'
import { Ref } from 'vue-demi'
import { MotionVariants, Variant } from './variants'

export type MotionTarget = HTMLElement | SVGElement | null | undefined

export interface MotionInstance<T = MotionVariants> extends MotionControls {
  target: Ref<MotionTarget>
  variants: Ref<T>
  variant: Ref<keyof T>
  state: Ref<Variant | undefined>
}

export type UseMotionOptions = {
  syncVariants?: boolean
  lifeCycleHooks?: boolean
  visibilityHooks?: boolean
  eventListeners?: boolean
}

export type MotionControls = {
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
}

export type MotionInstanceBindings<T = MotionVariants> = {
  [key: string]: MotionInstance<T>
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $motions?: MotionInstanceBindings
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
    // Event listeners variants
    hovered?: Variant
    tapped?: Variant
    focused?: Variant
  }
}
