import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt3'
import MyModule from '../dist/nuxt.mjs'

export default defineNuxtConfig({
  alias: {
    '@vueuse/motion': resolve(__dirname, '../src/index.ts'),
  },
  modules: [
    MyModule,
  ],
  motion: {
    directives: {
      'slide-rotate-top': {
        initial: {
          y: -400,
          opacity: 0,
          rotate: 90,
        },
        enter: {
          y: 0,
          opacity: 1,
          rotate: 0,
        },
      },
    },
  },
})
