<template>
  <div :style="{ padding: '100px' }">
    <div
      ref="popRef"
      :style="{
        position: 'relative',
        backgroundColor: 'blue',
        color: 'white',
        padding: '40px',
        borderRadius: '1rem',
      }"
    >
      Hello
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMotion } from '@lib'
import { ref } from 'vue'

const popRef = ref<HTMLElement>()

useMotion(popRef, {
  initial: {
    translateY: 200,
    opacity: 0,
  },
  enter: {
    translateY: -100,
    opacity: 1,
    spring: {
      stiffness: 300,
      damping: 50,
    },
  },
})
</script>
