<template>
  <div>
    <div
      v-motion
      ref="title"
      :initial="{ opacity: 0, y: 100 }"
      :enter="{
        opacity: 1,
        y: 0,
      }"
    >
      Hello
    </div>

    <div
      v-motion
      ref="title2"
      :initial="{ opacity: 0, y: 100 }"
      :enter="{
        opacity: 1,
        y: 0,
      }"
    >
      Hello
    </div>

    <div
      v-motion
      ref="title3"
      :initial="{ opacity: 0, y: 100 }"
      :enter="{
        opacity: 1,
        y: 0,
      }"
    >
      Hello
    </div>
  </div>
</template>

<script setup>
import { useMotions } from '@lib'
import { nextTick, onMounted } from 'vue'

const motions = useMotions()

onMounted(() => {
  console.log(motions)
})
</script>
