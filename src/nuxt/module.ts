import { defu } from 'defu'
import { addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { ModuleOptions as MotionModuleOpts } from '../types'

export interface ModuleOptions extends MotionModuleOpts {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vueuse/motion',
    configKey: 'motion',
  },
  defaults: {},
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const resolveRuntimeModule = (path: string) => resolve('./runtime', path)

    // Push options and merge to runtimeConfig
    nuxt.options.runtimeConfig.motion = defu(nuxt.options.runtimeConfig?.motion || {}, options)

    // Add templates (options and directives)
    addPlugin(resolveRuntimeModule('./templates/motion'))

    // Add auto imports
    addImportsDir(resolve('./runtime/composables'))

    // Transpile necessary packages at build time
    if (!nuxt.options.build.transpile) nuxt.options.build.transpile = []
    const transpileList = ['defu', '@vueuse/motion', '@vueuse/shared', '@vueuse/core']
    transpileList.forEach((pkgName) => {
      if (!nuxt.options.build.transpile.includes(pkgName)) nuxt.options.build.transpile.push(pkgName)
    })

    /**
     * Workaround for TSLib issue on @nuxt/bridge and nuxt3
     */
    if (!nuxt.options.alias) nuxt.options.alias = {}
    if (!nuxt.options.alias.tslib) nuxt.options.alias.tslib = 'tslib/tslib.es6.js'
  },
})
