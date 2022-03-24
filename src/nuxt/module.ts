import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { addPluginTemplate, addTemplate, defineNuxtModule } from '@nuxt/kit'
import type { MotionVariants } from '../types'

export interface ModuleOptions {
  directives?: Record<string, MotionVariants>
  excludePresets?: boolean
}

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
    // Add templates (options and directives)
    const templatesDir = fileURLToPath(new URL('./templates', import.meta.url).toString())
    addTemplate({
      fileName: 'motion.config.js',
      src: resolve(templatesDir, 'motion.config.js'),
    })
    addPluginTemplate({
      src: resolve(templatesDir, 'motion.js'),
      fileName: 'motion.js',
      options,
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
  },
})
