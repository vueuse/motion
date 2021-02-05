import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  alias: {
    '@vueuse/motion': path.resolve(__dirname, '../src/index.ts'),
  },
})
