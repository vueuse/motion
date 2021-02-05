import { Ref } from 'vue-demi'
import { MotionControls } from '../useMotionControls'
import { MotionVariants, Variant } from './variants'

export type TargetType = HTMLElement | SVGElement | null | undefined

export interface MotionInstance<T = MotionVariants> extends MotionControls {
  target: Ref<TargetType>
  variants: Ref<T>
  variant: Ref<keyof T>
  state: Ref<Variant | undefined>
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
