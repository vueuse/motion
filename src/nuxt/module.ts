import { addAutoImport, addPlugin, createResolver, defineNuxtModule, resolveModule } from '@nuxt/kit'
import type { ModuleOptions, MotionPluginOptions } from '../types'

const DEFAULTS: ModuleOptions = {}

const CONFIG_KEY = 'motion'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vueuse/motion',
    configKey: CONFIG_KEY,
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
    addAutoImport([
      { name: 'reactiveStyle', as: 'reactiveStyle', from: resolveRuntimeModule('../../index') },
      { name: 'reactiveTransform', as: 'reactiveTransform', from: resolveRuntimeModule('../../index') },
      { name: 'useElementStyle', as: 'useElementStyle', from: resolveRuntimeModule('../../index') },
      { name: 'useElementTransform', as: 'useElementTransform', from: resolveRuntimeModule('../../index') },
      { name: 'useMotion', as: 'useMotion', from: resolveRuntimeModule('../../index') },
      { name: 'useMotionControls', as: 'useMotionControls', from: resolveRuntimeModule('../../index') },
      { name: 'useMotionProperties', as: 'useMotionProperties', from: resolveRuntimeModule('../../index') },
      { name: 'useMotions', as: 'useMotions', from: resolveRuntimeModule('../../index') },
      { name: 'useMotionTransitions', as: 'useMotionTransitions', from: resolveRuntimeModule('../../index') },
      { name: 'useMotionVariants', as: 'useMotionVariants', from: resolveRuntimeModule('../../index') },
      { name: 'useSpring', as: 'useSpring', from: resolveRuntimeModule('../../index') },
      { name: 'useReducedMotion', as: 'useReducedMotion', from: resolveRuntimeModule('../../index') },
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
