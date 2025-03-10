import type { App } from 'vue'
import type { MotionPluginOptions, MotionVariants } from '../types'

import * as presets from '../presets'
import { directive } from '../directive'
import { slugify } from '../utils/slugify'
import { MotionComponent, MotionGroupComponent } from '../components'
import { CUSTOM_PRESETS } from '../utils/keys'

export const MotionPlugin = {
  install(app: App, options?: MotionPluginOptions<string>) {
    // Register default `v-motion` directive
    app.directive('motion', directive())

    // Register presets
    if (!options || (options && !options.excludePresets)) {
      for (const key in presets) {
        // Get preset variants
        // @ts-expect-error - Fix errors later for typescript 5
        const preset = presets[key]

        // Register the preset `v-motion-${key}` directive
        app.directive(`motion-${slugify(key)}`, directive(preset, true))
      }
    }

    // Register plugin-wise directives
    if (options && options.directives) {
      // Loop on options, create a custom directive for each definition
      for (const key in options.directives) {
        // Get directive variants
        const variants = options.directives[key] as MotionVariants<any>

        // Development warning, showing definitions missing `initial` key
        if (!variants.initial && import.meta.env?.MODE === 'development') {
          console.warn(
            `Your directive v-motion-${key} is missing initial variant!`,
          )
        }

        // Register the custom `v-motion-${key}` directive
        app.directive(`motion-${key}`, directive(variants, true))
      }
    }

    app.provide(CUSTOM_PRESETS, options?.directives)

    // Register <Motion> component
    app.component('Motion', MotionComponent)

    // Register <MotionGroup> component
    app.component('MotionGroup', MotionGroupComponent)
  },
}

export default MotionPlugin
