import { defu } from 'defu'
import {
  addComponent,
  addImportsDir,
  addPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'
import type { NuxtModule } from '@nuxt/schema'
import {
  MotionDirectiveTransform,
  fade,
  fadeVisible,
  fadeVisibleOnce,
  pop,
  popVisible,
  popVisibleOnce,
  rollBottom,
  rollLeft,
  rollRight,
  rollTop,
  rollVisibleBottom,
  rollVisibleLeft,
  rollVisibleOnceBottom,
  rollVisibleOnceLeft,
  rollVisibleOnceRight,
  rollVisibleOnceTop,
  rollVisibleRight,
  rollVisibleTop,
  slideBottom,
  slideLeft,
  slideRight,
  slideTop,
  slideVisibleBottom,
  slideVisibleLeft,
  slideVisibleOnceBottom,
  slideVisibleOnceLeft,
  slideVisibleOnceRight,
  slideVisibleOnceTop,
  slideVisibleRight,
  slideVisibleTop,
  slugify,
} from '../index'

import type { ModuleOptions as MotionModuleOpts } from '../types'

const presets = [
  fade,
  fadeVisible,
  fadeVisibleOnce,
  pop,
  popVisible,
  popVisibleOnce,
  rollBottom,
  rollLeft,
  rollRight,
  rollTop,
  rollVisibleBottom,
  rollVisibleLeft,
  rollVisibleRight,
  rollVisibleTop,
  rollVisibleOnceBottom,
  rollVisibleOnceLeft,
  rollVisibleOnceRight,
  rollVisibleOnceTop,
  slideBottom,
  slideLeft,
  slideRight,
  slideTop,
  slideVisibleBottom,
  slideVisibleLeft,
  slideVisibleRight,
  slideVisibleTop,
  slideVisibleOnceBottom,
  slideVisibleOnceLeft,
  slideVisibleOnceRight,
  slideVisibleOnceTop,
]

export interface ModuleOptions extends MotionModuleOpts<string> {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vueuse/motion',
    configKey: 'motion',
  },
  defaults: {},
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Push options and merge to runtimeConfig
    nuxt.options.runtimeConfig.motion = defu(
      nuxt.options.runtimeConfig?.motion || {},
      options,
    )

    // Add templates (options and directives)
    addPlugin(resolve('./runtime/templates/motion'))

    // Add auto imports
    addImportsDir(resolve('./runtime/composables'))

    // Add components
    addComponent({
      name: 'Motion',
      export: 'MotionComponent',
      filePath: '@vueuse/motion',
    })

    addComponent({
      name: 'MotionGroup',
      export: 'MotionGroupComponent',
      filePath: '@vueuse/motion',
    })

    nuxt.options.vue.compilerOptions.directiveTransforms ??= {}
    nuxt.options.vue.compilerOptions.directiveTransforms.motion
      = MotionDirectiveTransform

    // Register presets
    if (!options || (options && !options.excludePresets)) {
      for (const key in presets) {
        // Register the preset `v-motion-${key}` directive
        nuxt.options.vue.compilerOptions.directiveTransforms[
          `motion-${slugify(key)}`
        ] = MotionDirectiveTransform
      }
    }

    // Register plugin-wise directives
    // if (options && options.directives) {
    //   // Loop on options, create a custom directive for each definition
    //   for (const key in options.directives) {
    //     // Get directive variants
    //     const variants = options.directives[key] as MotionVariants<any>

    //     // Development warning, showing definitions missing `initial` key
    //     if (!variants.initial && __DEV__) {
    //       console.warn(
    //         `Your directive v-motion-${key} is missing initial variant!`,
    //       )
    //     }

    //     // Register the custom `v-motion-${key}` directive
    //     app.directive(`motion-${key}`, directive(variants, true))
    //   }
    // }

    // Transpile necessary packages
    const transpileList = [
      'defu',
      '@vueuse/motion',
      '@vueuse/shared',
      '@vueuse/core',
    ]
    nuxt.options.build.transpile ??= []
    transpileList.forEach((pkgName) => {
      if (!nuxt.options.build.transpile.includes(pkgName))
        nuxt.options.build.transpile.push(pkgName)
    })
  },
}) satisfies NuxtModule
