import { writeFileSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  resolve: {
    alias: [
      {
        find: '@vueuse/motion',
        replacement: resolve(
          fileURLToPath(import.meta.url),
          '../../src/index.ts',
        ),
      },
    ],
  },
  plugins: [
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
})
