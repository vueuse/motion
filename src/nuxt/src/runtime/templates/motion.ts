import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import { MotionPlugin } from '@vueuse/motion'

export default defineNuxtPlugin(
  (nuxtApp) => {
    const config = useRuntimeConfig()

    nuxtApp.vueApp.use(MotionPlugin, config.public.motion)
  },
)
