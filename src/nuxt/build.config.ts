import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: [
    '@nuxt/kit',
    '@nuxt/schema',
    'nuxt3',
    'nuxt',
    'vue',
    'defu',
    '@vueuse/motion',
    'csstype',
    '@vueuse/shared',
    'framesync',
    'style-value-types',
    '@vue/compiler-core',
    '@babel/parser',
    '@vue/shared',
    '@vueuse/core',
  ],
})
