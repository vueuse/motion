import { resolve } from 'path'

export default defineNuxtConfig({
  theme: '@nuxt-themes/docus',
  alias: {
    '@vueuse/motion': resolve(__dirname, '../src/index.ts'),
    '@vueuse/motion/nuxt': resolve(__dirname, '../src/nuxt/module.ts'),
  },
  modules: ['@vueuse/motion/nuxt'],
  typescript: {
    includeWorkspace: true,
  },
  pinceau: {
    followSymbolicLinks: false,
  },
})
