import DefaultTheme from 'vitepress/dist/client/theme-default'
import { MotionPlugin } from '../../../src'
import Features from '../components/Features.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(MotionPlugin)

    app.component('Features', Features)
  },
}
