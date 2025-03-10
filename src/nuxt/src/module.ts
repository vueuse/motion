import { defu } from 'defu'
import { addComponent, addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { NuxtModule } from '@nuxt/schema'
// @ts-expect-error types exist after build
import type { ModuleOptions as MotionModuleOpts } from '@vueuse/motion'

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
    nuxt.options.runtimeConfig.public.motion = defu(nuxt.options.runtimeConfig.public.motion || {}, options)

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

    // Transpile necessary packages
    if (!nuxt.options.build.transpile)
      nuxt.options.build.transpile = []
    const transpileList = ['defu', '@vueuse/motion', '@vueuse/shared', '@vueuse/core']
    transpileList.forEach((pkgName) => {
      if (!nuxt.options.build.transpile.includes(pkgName))
        nuxt.options.build.transpile.push(pkgName)
    })
  },
}) satisfies NuxtModule
