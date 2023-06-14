import { defu } from 'defu'
import { addImports, addPluginTemplate, defineNuxtModule } from '@nuxt/kit'
import type { MotionVariants } from '../types'

export interface MotionModuleOptions<T extends string> {
  directives?: Record<T, MotionVariants<T>>
  excludePresets?: boolean
}

export default defineNuxtModule<MotionModuleOptions<string>>({
  meta: {
    name: '@vueuse/motion',
    configKey: 'motion',
  },
  defaults: {},
  setup(options, nuxt) {
    // Push options and merge to runtimeConfig
    nuxt.options.runtimeConfig.motion = defu(nuxt.options.runtimeConfig?.motion || {}, options)

    // Add Plugin
    addPluginTemplate({
      filename: 'motion.mjs',
      getContents: () => {
        const lines = [
          `import { defineNuxtPlugin, useRuntimeConfig } from \'#imports\';`,
          `import MotionPlugin from \'@vueuse/motion/plugin\';`,
          `export default defineNuxtPlugin((nuxtApp) => {`,
          `  const runtimeConfig = useRuntimeConfig();`,
          `  nuxtApp.vueApp.use(MotionPlugin, runtimeConfig.motion);`,
          `});`,
        ]

        return lines.join('\n')
      },
    })

    // Add auto imports
    const imports = [
      'reactiveStyle',
      'reactiveTransform',
      'useElementStyle',
      'useElementTransform',
      'useMotion',
      'useMotionControls',
      'useMotionProperties',
      'useMotions',
      'useMotionTransitions',
      'useMotionVariants',
      'useSpring',
      'useReducedMotion',
    ].map((name) => ({ name, as: name, from: `@vueuse/motion` }))

    addImports(imports)

    // Transpile necessary packages
    if (!nuxt.options.build.transpile) nuxt.options.build.transpile = []
    const transpileList = ['defu', '@vueuse/motion', '@vueuse/shared', '@vueuse/core']
    transpileList.forEach((pkgName) => {
      if (!nuxt.options.build.transpile.includes(pkgName)) nuxt.options.build.transpile.push(pkgName)
    })
  },
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    motion?: MotionModuleOptions<string>
  }
  interface NuxtOptions {
    motion?: MotionModuleOptions<string>
  }
}
