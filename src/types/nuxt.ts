import type { MotionVariants } from './variants'

export interface ModuleOptions<T extends string> {
  directives?: Record<T, MotionVariants<T>>
  excludePresets?: boolean
}
