import { resolve } from 'node:path'
import pkg from '../package.json'

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@vueuse/motion/nuxt',
    'nuxt-og-image',
  ],
  routeRules: {
    '/': { prerender: true },
    '/features': { redirect: '/features/presets' },
    '/api': { redirect: '/api/use-motion' },
    '/api/search.json': { prerender: true },
  },

  // SEO
  site: { url: 'https://motion.vueuse.org' },

  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vueuse/core',
        '@vueuse/motion',
        'shiki-transformer-color-highlight',
      ],
    },
  },

  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },

  alias: {
    '@vueuse/motion': resolve(__dirname, '../src/index.ts'),
    '@vueuse/motion/nuxt': resolve(__dirname, '../src/nuxt/src/module.ts'),
  },

  // Nuxt UI & UI Pro
  ui: { icons: ['heroicons', 'simple-icons'] },

  // special license for nuxt & nuxt-modules orgs
  uiPro: { license: 'oss' },

  // Nuxt Content
  content: {
    build: {
      markdown: {
        highlight: {
          langs: [
            'bash',
            'js',
            'ts',
            'typescript',
            'diff',
            'vue',
            'json',
            'jsonc',
            'yml',
            'css',
            'mdc',
          ],
        },
      },
    },
  },

  mdc: {
    highlight: {
      noApiRoute: false,
    },
  },

  css: ['~/assets/css/main.css'],

  typescript: { strict: false },
  compatibilityDate: '2024-09-26',
})
