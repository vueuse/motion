import { resolve } from 'node:path'

export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  features: {
    devLogs: false,
  },
  typescript: {
    includeWorkspace: true,
  },
  devtools: { enabled: false },
  routeRules: { '/api/search.json': { prerender: true } },
  vite: {
    $client: {
      build: {
        rollupOptions: {
          output: {
            chunkFileNames: '_nuxt/[name]-[hash].js',
            entryFileNames: '_nuxt/[name]-[hash].js',
          },
        },
      },
    },
  },

  alias: {
    '@vueuse/motion': resolve(__dirname, '../src/index.ts'),
    '@vueuse/motion/nuxt': resolve(__dirname, '../src/nuxt/module.ts'),
  },
  modules: [
    '@vueuse/motion/nuxt',
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    'nuxt-og-image',
    '@nuxt/image',
  ],

  ui: {
    icons: ['simple-icons'],
  },

  uiPro: { license: 'oss' }, // special license for nuxt & nuxt-modules orgs

  // Nuxt Content
  content: {},

  // Fonts
  googleFonts: {
    display: 'swap',
    download: true,
    families: { 'DM+Sans': [400, 500, 600, 700] },
  },
})
