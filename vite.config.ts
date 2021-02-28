import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  root: 'demo/',
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  plugins: [vue(), WindiCSS()],
  resolve: {
    alias: [
      {
        find: '@vueuse/motion',
        replacement: resolve(__dirname, './src/index.ts'),
      },
    ],
  },
})
