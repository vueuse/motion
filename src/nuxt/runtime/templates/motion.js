import { MotionPlugin } from '@vueuse/motion'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(
  (nuxtApp) => {
    const { motion: options } = useRuntimeConfig()

    nuxtApp.vueApp.use(MotionPlugin, options)
  }
)
