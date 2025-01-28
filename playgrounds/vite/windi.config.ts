import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
      },
    },
  },
})
