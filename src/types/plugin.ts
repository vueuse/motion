import { MotionVariants } from './variants'

export interface MotionPluginOptions {
  directives: {
    [key: string]: MotionVariants
  }
  excludePresets: boolean
}
