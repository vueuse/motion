import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
  ],
  ssgOptions: {
    script: 'async',
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
