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
        class="
          w-24
          h-24
          bg-indigo-500
          border-8 border-indigo-400
          shadow-xl
          cursor-pointer
          rounded-3xl
        "
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
        class="
          w-24
          h-24
          ml-4
          bg-indigo-500
          border-8 border-indigo-400
          shadow-xl
          cursor-pointer
          rounded-3xl
        "
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
        class="
          w-24
          h-24
          ml-4
          bg-indigo-500
          border-8 border-indigo-400
          shadow-xl
          cursor-pointer
          rounded-3xl
        "
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
        class="
          w-24
          h-24
          ml-4
          bg-indigo-500
          border-8 border-indigo-400
          shadow-xl
          cursor-pointer
          rounded-3xl
        "
      />
    </template>
  </DemoBox>
</template>
