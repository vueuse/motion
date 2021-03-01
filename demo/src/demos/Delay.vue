<template>
  <DemoBox :code-text="codeText">
    <template #demoElement>
      <div
        v-motion
        :initial="{
          y: 400,
        }"
        :enter="{
          y: 0,
          transition: {
            repeat: Infinity,
            repeatType: 'mirror',
            repeatDelay: 1000,
          },
        }"
        class="w-24 h-24 bg-blue-500 border-8 border-blue-400 shadow-xl cursor-pointer rounded-3xl"
      />

      <div
        v-motion
        :initial="{
          y: 400,
        }"
        :enter="{
          y: 0,
          transition: {
            repeat: Infinity,
            repeatType: 'mirror',
            repeatDelay: 1000,
          },
        }"
        :delay="100"
        class="w-24 h-24 ml-4 bg-red-500 border-8 border-red-400 shadow-xl cursor-pointer rounded-3xl"
      />

      <div
        v-motion
        :initial="{
          y: 400,
        }"
        :enter="{
          y: 0,
          transition: {
            repeat: Infinity,
            repeatType: 'mirror',
            repeatDelay: 1000,
          },
        }"
        :delay="200"
        class="w-24 h-24 ml-4 bg-yellow-500 border-8 border-yellow-400 shadow-xl cursor-pointer rounded-3xl"
      />

      <div
        v-motion
        :initial="{
          y: 400,
        }"
        :enter="{
          y: 0,
          transition: {
            repeat: Infinity,
            repeatType: 'mirror',
            repeatDelay: 1000,
          },
        }"
        :delay="300"
        class="w-24 h-24 ml-4 bg-green-500 border-8 border-green-400 shadow-xl cursor-pointer rounded-3xl"
      />
    </template>
  </DemoBox>
</template>

<script setup="props" lang="ts">
import { computed } from 'vue';
import DemoBox from '../components/DemoBox.vue'
import delay from '../examples/delay'

const codeText = computed(() => {
    return delay()
})
</script>
