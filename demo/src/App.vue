<template>
  <div>
    <div ref="title" class="flex items-center justify-center">
      <h1 class="m-6 text-4xl font-bold cursor-pointer select-none">
        🤹&nbsp;@vueuse/motion
      </h1>
    </div>

    <Editor />

    <div class="flex flex-col items-center justify-center">
      <a
        class="mt-12 mb-6"
        ref="github"
        href="https://github.com/Tahul/vue-use-motion"
      >
        ↩️&nbsp;&nbsp;Bring me back to GitHub
      </a>

      <p class="mb-6 text-center" ref="credits">
        This package has been written by
        <a href="https://twitter.com/yaeeelglx" target="_blank">
          Yaël Guilloux
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MotionVariants, MotionTarget } from '@vueuse/motion'
import { useMotion } from '@vueuse/motion'
import { ref } from 'vue-demi'
import Editor from './components/Editor.vue'

const defaultAnimation = (delay: number): MotionVariants => {
  return {
    initial: {
      y: 100,
      scale: 0.8,
      opacity: 0,
    },
    enter: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        delay,
      },
    },
  }
}

ref: title = ref<MotionTarget>()
ref: github = ref<MotionTarget>()
ref: credits = ref<MotionTarget>()

useMotion($title, defaultAnimation(100))
useMotion($github, defaultAnimation(500))
useMotion($credits, defaultAnimation(600))
</script>

<style lang="postcss" scoped>
a {
  @apply font-bold transition-colors duration-100 hover:text-blue-400;
}
</style>
