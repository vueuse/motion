import { Ref } from 'vue-demi'
import { MotionVariants, Variant } from './variants'

export type TargetType = HTMLElement | SVGElement | null | undefined

export type MotionInstance<T = MotionVariants> = {
  variant: Ref<keyof T>
  apply: (variant: Variant) => void
  stop: () => void
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
