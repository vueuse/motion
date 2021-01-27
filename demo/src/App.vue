<template>
  <div>
    <div ref="title" class="flex items-center justify-center">
      <h1 class="m-6 text-4xl font-bold cursor-pointer select-none">
        🤹&nbsp;@vueuse/motion
      </h1>
    </div>

    <div class="flex flex-col items-center justify-center">
      <a
        ref="github"
        href="https://github.com/VueUse/motion"
        class="mt-12 mb-6"
      >
        ↩️&nbsp;&nbsp;Bring me back to GitHub
      </a>

      <p ref="credits" class="mb-6 text-center">
        This package has been written by
        <a href="https://twitter.com/yaeeelglx" target="_blank"
          >Yaël Guilloux</a
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMotion } from '@lib'
import { MotionVariants } from 'src/types/variants'
import { ref } from 'vue'

const defaultAnimation: MotionVariants = {
  initial: {
    y: -100,
    scale: 0,
    opacity: 0,
  },
  enter: {
    y: 0,
    scale: 1,
    opacity: 1,
  },
}

const title = ref<HTMLElement>()
const github = ref<HTMLElement>()
const credits = ref<HTMLElement>()

const { name: titleVariant } = useMotion(title, defaultAnimation)

const { name: githubVariant } = useMotion(github, defaultAnimation)

const { name: creditsVariant } = useMotion(credits, defaultAnimation)

console.log({ titleVariant, githubVariant, creditsVariant })
</script>

<style lang="postcss" scoped>
a {
  @apply font-bold transition-colors duration-100 hover:text-blue-400;
}
</style>
