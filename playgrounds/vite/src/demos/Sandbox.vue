<script setup lang="ts">
import { ref } from 'vue'
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

function replay() {
  // set animation state to initial
  instance.variant.value = 'initial'

  // wait for 200ms and set it back to enter
  setTimeout(() => {
    instance.variant.value = 'enter'
  }, 200)
}
</script>

<template>
  <div class="h-full rounded-lg flex w-full items-center justify-center border-1 border-gray-200" @click="replay">
    <Block ref="block" />
  </div>
</template>
