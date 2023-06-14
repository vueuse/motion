export default defineNuxtConfig({
  css: ['~/assets/pico.css'],
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
  typescript: {
    includeWorkspace: true,
  },
})
