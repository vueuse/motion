import { Plugin } from 'vue-demi'
import { directive } from '../directive'
import { MotionVariants } from '../types'

export interface MotionPluginOptions {
  directives: {
    [key: string]: MotionVariants
  }
  excludePresets: boolean
}

export const MotionPlugin: Plugin = {
  install(app, options: MotionPluginOptions) {
    // Register default `v-motion` directive.
    app.directive('motion', directive())

    if (options.directives) {
      // Loop on options, create a custom directive for each definition.
      for (const key in options.directives) {
        // Get directive variants
        const variants = options.directives[key] as MotionVariants

        // Development warning, showing definitions missing `initial` key.
        if (!variants.initial && __DEV__) {
          console.warn(
            `Your variant v-motion-${key} is missing initial variant!`,
          )
        }

        // Register the custom `v-motion-${key}` directive directive.
        app.directive(`motion-${key}`, directive(variants))
      }
    }

    if (!options.excludePresets) {
      // TODO: Implement presets
    }
  },
}

export default MotionPlugin
