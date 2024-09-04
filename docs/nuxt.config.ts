import { resolve } from 'node:path'

export default defineNuxtConfig({
  theme: '@nuxt-themes/docus',
  alias: {
    '@vueuse/motion': resolve(__dirname, '../src/index.ts'),
    '@vueuse/motion/nuxt': resolve(__dirname, '../src/nuxt/src/module.ts'),
  },
  modules: ['@vueuse/motion/nuxt'],
  features: {
    devLogs: false,
  },
  typescript: {
    includeWorkspace: true,
  },
  pinceau: {
    followSymbolicLinks: false,
  },
})
