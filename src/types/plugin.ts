import type { MotionVariants } from './variants'

export interface MotionPluginOptions<T extends string> {
  directives?: Record<T, MotionVariants<T>>
  excludePresets?: boolean
}
