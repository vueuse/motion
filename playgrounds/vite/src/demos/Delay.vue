<script setup="props" lang="ts">
import { computed } from 'vue'
import DemoBox from '../components/DemoBox.vue'
import delay from '../examples/delay'

const codeText = computed(() => delay())
</script>

<template>
  <DemoBox :text="codeText">
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
        class="h-24 w-24 cursor-pointer rounded-3xl border-8 border-indigo-400 bg-indigo-500 shadow-xl"
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
        class="ml-4 h-24 w-24 cursor-pointer rounded-3xl border-8 border-indigo-400 bg-indigo-500 shadow-xl"
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
        class="ml-4 h-24 w-24 cursor-pointer rounded-3xl border-8 border-indigo-400 bg-indigo-500 shadow-xl"
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
        class="ml-4 h-24 w-24 cursor-pointer rounded-3xl border-8 border-indigo-400 bg-indigo-500 shadow-xl"
      />
    </template>
  </DemoBox>
</template>
