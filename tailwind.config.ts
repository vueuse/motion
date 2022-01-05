import { defineConfig } from 'vite-plugin-windicss'

defineConfig({
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
