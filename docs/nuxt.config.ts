import { resolve } from 'node:path'

export default defineNuxtConfig({
  alias: {
    '@vueuse/motion/plugin': resolve(__dirname, '../../src/plugin/index.ts'),
  },
  theme: '@nuxt-themes/docus',
  modules: ['@vueuse/motion/nuxt'],
  typescript: {
    includeWorkspace: true,
  },
  pinceau: {
    followSymbolicLinks: false,
  },
})
