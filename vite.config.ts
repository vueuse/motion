/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  root: __dirname,
  test: {
    environment: 'happy-dom',
    include: ['./tests/**/*.spec.ts'],
    // Temporarily disable `transform` test
    exclude: ['./tests/transform.spec.ts'],
  },
})
