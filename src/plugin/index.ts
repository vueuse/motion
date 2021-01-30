import { MotionVariants, Variant } from '@lib/types/variants'
import { useMotion } from '@lib/useMotion'
import { Plugin } from 'vue'
import { directive } from '../directive'

export type MotionDirectiveInjection = {
  [key: string]: ReturnType<typeof useMotion>
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $motions?: MotionDirectiveInjection
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

export const MotionPlugin: Plugin = {
  install(app) {
    app.directive('motion', directive)
  },
}

export default MotionPlugin
