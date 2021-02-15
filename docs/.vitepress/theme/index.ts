import { MotionPlugin } from '@vueuse/motion'
import DefaultTheme from 'vitepress/dist/client/theme-default'
import Features from '../components/Features.vue'
import Hero from '../components/Hero.vue'
import PresetsViewer from '../components/PresetsViewer.vue'
import Layout from '../Layout.vue'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(MotionPlugin)

    app.component('Features', Features)

    app.component('PresetsViewer', PresetsViewer)

    app.component('Hero', Hero)
  },
}
