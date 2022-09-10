import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt'
import MotionModule from '../src/nuxt/module'

export default defineNuxtConfig({
  theme: '@nuxt-themes/docus',
  alias: {
    '@vueuse/motion': resolve(__dirname, '../src/index.ts'),
  },
  modules: [MotionModule],
})