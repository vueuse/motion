import { addAutoImport, addPlugin, createResolver, defineNuxtModule, resolveModule } from '@nuxt/kit'
import type { ModuleOptions, MotionPluginOptions } from '../types'

const DEFAULTS: ModuleOptions = {}

const CONFIG_KEY = 'motion'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vueuse/motion',
    configKey: CONFIG_KEY,
    compatibility: {
      nuxt: '>=3.0.0',
      bridge: true,
    },
  },
  defaults: DEFAULTS,
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const resolveRuntimeModule = (path: string) => resolveModule(path, { paths: resolve('./runtime') })

    // Push options to runtimeConfig
    nuxt.options.publicRuntimeConfig.motion = options

    // Add templates (options and directives)
    addPlugin({
      src: resolveRuntimeModule('./templates/motion.js'),
    })

    // Transpile necessary packages at build time
    if (!nuxt.options.build.transpile)
      nuxt.options.build.transpile = []
    const transpileList = ['defu', '@vueuse/motion', '@vueuse/shared', '@vueuse/core']
    transpileList.forEach(
      (pkgName) => {
        if (!nuxt.options.build.transpile.includes(pkgName))
          nuxt.options.build.transpile.push(pkgName)
      },
    )

    /**
     * Workaround for TSLib issue on @nuxt/bridge and nuxt3
     */
    if (!nuxt.options.alias)
      nuxt.options.alias = {}
    if (!nuxt.options.alias.tslib)
      nuxt.options.alias.tslib = 'tslib/tslib.es6.js'

    // Add auto imports
    addAutoImport([
      { name: 'useMotion', as: 'useMotion', from: resolveRuntimeModule('../../index') },
    ])
  },
})

interface ModulePublicRuntimeConfig extends MotionPluginOptions {}

interface ModulePrivateRuntimeConfig extends MotionPluginOptions {}

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      motion: ModulePublicRuntimeConfig
    }
    privateRuntimeConfig?: {
      motion: ModulePrivateRuntimeConfig
    }
  }
}
