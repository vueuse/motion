import { MotionPlugin } from '@vueuse/motion'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(
  (nuxtApp) => {
    const config = useRuntimeConfig()
    
    nuxtApp.vueApp.use(MotionPlugin, config.public.motion)
  }
)
