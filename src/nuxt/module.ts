import { addImportsDir, addPlugin, createResolver, defineNuxtModule, resolveModule } from '@nuxt/kit'
import type { ModuleOptions, MotionPluginOptions } from '../types'

const DEFAULTS: ModuleOptions = {}

const CONFIG_KEY = 'motion'

const module = defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vueuse/motion',
    configKey: CONFIG_KEY,
  },
  defaults: DEFAULTS,
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const resolveRuntimeModule = (path: string) => resolveModule(path, { paths: resolve('./runtime') })

    // Push options to runtimeConfig
    nuxt.options.runtimeConfig.public.motion = options

    // Add templates (options and directives)
    addPlugin({
      src: resolveRuntimeModule('./templates/motion.js'),
    })

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

    // Add auto imports
    addImportsDir(resolve('./composables/'))
  },
}) as any

export interface ModulePublicRuntimeConfig extends MotionPluginOptions {}

export interface ModulePrivateRuntimeConfig extends MotionPluginOptions {}

export default module
