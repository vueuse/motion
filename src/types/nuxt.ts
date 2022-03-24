import type { MotionVariants } from './variants'

export interface ModuleOptions {
  directives?: Record<string, MotionVariants>
  excludePresets?: boolean
}
