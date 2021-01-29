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
        ref="github"
        href="https://github.com/Tahul/vue-use-motion"
        class="mt-12 mb-6"
      >
        ↩️&nbsp;&nbsp;Bring me back to GitHub
      </a>

      <p ref="credits" class="mb-6 text-center">
        This package has been written by
        <a href="https://twitter.com/yaeeelglx" target="_blank">
          Yaël Guilloux
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MotionVariants } from '@lib'
import { useMotion } from '@lib'
import { ref } from 'vue'
import Editor from './components/Editor.vue'

const defaultAnimation = (index: number): MotionVariants => ({
  initial: {
    y: -100,
    scale: 0,
    opacity: 0,
  },
  enter: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: index * 250,
      type: 'spring',
    },
  },
})

ref: title = ref<HTMLElement>()
ref: github = ref<HTMLElement>()
ref: credits = ref<HTMLElement>()

useMotion($title, defaultAnimation(0))
useMotion($github, defaultAnimation(1))
useMotion($credits, defaultAnimation(2))
</script>

<style lang="postcss" scoped>
a {
  @apply font-bold transition-colors duration-100 hover:text-blue-400;
}
</style>
