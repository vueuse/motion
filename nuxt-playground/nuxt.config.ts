import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt3'
import MyModule from '../src/nuxt/module'

export default defineNuxtConfig({
  alias: {
    '@vueuse/motion': resolve(__dirname, '../src/index.ts'),
  },
  modules: [
    MyModule,
  ],
  components: {
    dirs: [
      {
        path: './components',
        global: true,
      },
    ],
  },
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
