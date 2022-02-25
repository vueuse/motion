import { join, resolve } from 'path'
import { writeFileSync } from 'fs'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  root: 'demo/',
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  plugins: [
    vue(),
    WindiCSS(),
    {
      name: 'add-common-js-package-plugin',
      writeBundle(options) {
        if (options.format === 'cjs') {
          writeFileSync(
            join(options.dir, 'package.json'),
            JSON.stringify({ type: 'commonjs' }),
          )
        }
      },
    },
  ],
  resolve: {
    alias: [
      {
        find: '@vueuse/motion',
        replacement: resolve(__dirname, './src/index.ts'),
      },
    ],
  },
  test: {
    global: true,
    environment: 'happy-dom',
    include: ['tests/**/*.spec.ts'],
    // Temporarily disable `transform` test
    exclude: ['tests/transform.spec.ts'],
  },
})
