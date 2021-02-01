import { useMotion } from '@lib/useMotion'
import { MotionVariants, Variant } from './variants'

export type TargetType = HTMLElement | SVGElement | null | undefined

export type MotionInstanceBindings = {
  [key: string]: ReturnType<typeof useMotion>
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $motions?: MotionInstanceBindings
  }
}

declare module '@vue/runtime-dom' {
  interface HTMLAttributes {
    variants?: MotionVariants
    initial?: Variant
    enter?: Variant
    leave?: Variant
    visible?: Variant
  }
}
