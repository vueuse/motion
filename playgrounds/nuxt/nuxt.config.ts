import { resolve } from 'node:path'

export default defineNuxtConfig({
  features: {
    devLogs: false,
  },
  css: ['~/assets/pico.css'],
  alias: {
    '@vueuse/motion': resolve(__dirname, '../../src/index.ts'),
    '@vueuse/motion/nuxt': resolve(__dirname, '../../src/nuxt/src/module.ts'),
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
  runtimeConfig: {
    public: {
      motion: {
        directives: {
          'pop-bottom': {
            initial: {
              scale: 0,
              opacity: 0,
              y: 100,
            },
            visible: {
              scale: 1,
              opacity: 1,
              y: 0,
            },
          },
        },
      },
    },
  },
  typescript: {
    includeWorkspace: true,
  },
})
