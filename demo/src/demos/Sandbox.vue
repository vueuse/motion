<template>
  <div
    class="h-200 w-full border-4 rounded-4xl border-red-400 flex items-center justify-center"
  >
    <Block ref="block" style="transform: perspective(500px)" />
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { useMotion } from '@vueuse/motion'

const block = ref()

const instance = useMotion(block, {
  initial: {
    y: 200,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
})
</script>
