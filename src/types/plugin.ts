import type { MotionVariants } from './variants'

export interface MotionPluginOptions {
  directives?: Record<string, MotionVariants>
  excludePresets?: boolean
}
