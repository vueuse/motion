<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
import { ref } from 'vue'

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

const replay = () => (instance.variant.value = 'enter')
</script>

<template>
  <div class="h-200 rounded-4xl flex w-full items-center justify-center border-4 border-red-400" @click="replay">
    <Block ref="block" />
  </div>
</template>
