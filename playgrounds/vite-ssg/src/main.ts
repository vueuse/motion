import { ViteSSG } from 'vite-ssg/single-page'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'

export const createApp = ViteSSG(App, ({ app, initialState }) => {
  app.use(MotionPlugin)

  if (import.meta.env.SSR) {
    //
  }
})
