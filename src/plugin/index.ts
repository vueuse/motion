import { Plugin } from 'vue-demi'
import { directive } from '../directive'
import * as presets from '../presets'
import { MotionPluginOptions, MotionVariants } from '../types'
import slugify from '../utils/slugify'

export const MotionPlugin: Plugin = {
  install(app, options: MotionPluginOptions) {
    // Register default `v-motion` directive
    app.directive('motion', directive())

    // Register presets
    if (!options || (options && !options.excludePresets)) {
      for (const key in presets) {
        // Get preset variants
        const preset = presets[key]

        // Regisrer the preset `v-motion-${key}` directive
        app.directive(`motion-${slugify(key)}`, directive(preset))
      }
    }

    // Register plugin-wise directives
    if (options && options.directives) {
      // Loop on options, create a custom directive for each definition
      for (const key in options.directives) {
        // Get directive variants
        const variants = options.directives[key] as MotionVariants

        // Development warning, showing definitions missing `initial` key
        if (!variants.initial && __DEV__) {
          console.warn(
            `Your variant v-motion-${key} is missing initial variant!`,
          )
        }

        // Register the custom `v-motion-${key}` directive
        app.directive(`motion-${key}`, directive(variants))
      }
    }
  },
}

export default MotionPlugin
