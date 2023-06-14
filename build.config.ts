import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  rollup: {
    emitCJS: true,
  },
  declaration: true,
  entries: [
    // Core
    'src/index',
    // Plugin
    { input: 'src/plugin/index', name: 'plugin' },
    // Presets
    { input: 'src/presets/index', name: 'presets' },
    // Nuxt
    { input: 'src/nuxt/module', name: 'nuxt' },
  ],
  externals: ['@nuxt/kit', '@nuxt/schema', '@vueuse/core', '@vueuse/shared', 'nuxt', 'vue', 'defu', 'csstype', 'framesync', 'style-value-types', '@vue/shared'],
})
