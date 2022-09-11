import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  theme: '@nuxt-themes/docus',
  alias: {
    '@vueuse/motion': resolve(__dirname, '../src/index.ts'),
    '@vueuse/motion/nuxt': resolve(__dirname, '../src/nuxt/module.ts'),
  },
  modules: ['@vueuse/motion/nuxt'],
})
