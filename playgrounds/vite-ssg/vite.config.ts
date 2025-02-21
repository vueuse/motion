import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'prettify',
  },
  resolve: {
    alias: [
      {
        find: '@vueuse/motion',
        replacement: resolve(__dirname, '../../src/index.ts'),
      },
    ],
  },
})
