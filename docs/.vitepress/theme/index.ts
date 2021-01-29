import DefaultTheme from 'vitepress/dist/client/theme-default'
import { plugin } from '../../../src'
import Features from '../components/Features.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(plugin())

    app.component('Features', Features)
  },
}
