import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  css: ['~/assets/pico.css'],
  css: ['~/assets/pico.css'],
  alias: {
    '@vueuse/motion': resolve(__dirname, '../../src/index.ts'),
    '@vueuse/motion/nuxt': resolve(__dirname, '../../src/nuxt/module.ts'),
  },
  modules: ['@vueuse/motion/nuxt', '@nuxt/content'],
  content: {
    highlight: {
      theme: 'one-dark-pro',
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue'],
    },
  },
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
