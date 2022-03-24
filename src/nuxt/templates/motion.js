import { MotionPlugin } from '@vueuse/motion'
import { defineNuxtPlugin } from '#app'
import defu from 'defu'
import appOptions from './motion.config'

const options = defu(appOptions, <%= JSON.stringify(options, null, 2) %>)

export default defineNuxtPlugin(
  (nuxtApp) => {
    nuxtApp.vueApp.use(MotionPlugin, options)
  }
)
