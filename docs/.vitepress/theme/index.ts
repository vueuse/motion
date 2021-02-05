import DefaultTheme from 'vitepress/dist/client/theme-default'
import { MotionPlugin } from '@vueuse/motion'
import Features from '../components/Features.vue'
import Hero from '../components/Hero.vue'
import Layout from '../Layout.vue'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(MotionPlugin)

    app.component('Features', Features)

    app.component('Hero', Hero)
  },
}
