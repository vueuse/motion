import { defu } from 'defu'
import {
  addComponent,
  addImportsDir,
  addPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'
import type { NuxtModule } from '@nuxt/schema'
import { MotionDirectiveTransform } from '@vueuse/motion'

import type { ModuleOptions as MotionModuleOpts } from '../types'

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
