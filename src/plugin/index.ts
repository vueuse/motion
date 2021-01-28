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
  }
}

export function plugin(): Plugin {
  return {
    install(app, options) {
      app.directive('motion', directive())
    },
  }
}
