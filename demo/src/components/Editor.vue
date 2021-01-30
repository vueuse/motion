<template>
  <div
    class="w-full p-6 bg-gray-800 border-4 shadow-2xl rounded-3xl border-violet-600"
    v-motion="'block'"
    :initial="{
      y: 100,
      scale: 0.9,
      opacity: 0,
    }"
    :enter="{
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        delay: 200,
      },
    }"
  >
    <div class="flex items-center justify-center w-full h-96">
      <div
        v-motion="'code'"
        :initial="{
          y: 100,
          opacity: 0,
        }"
        :enter="{
          y: 0,
          opacity: 1,
          transition: {
            delay: 300,
          },
        }"
        class="flex-1"
      >
        <code-block :code-text="basic" language="javascript" />
      </div>
      <div class="flex items-center justify-center flex-1">
        <div
          v-motion="'demo'"
          :initial="{
            y: 100,
            opacity: 0,
          }"
          :enter="{
            y: 0,
            opacity: 1,
            transition: {
              delay: 400,
            },
          }"
          class="w-24 h-24 bg-indigo-500 shadow-lg rounded-3xl"
        />
      </div>
    </div>
  </div>
</template>

<script setup="props" lang="ts">
import CodeBlock from '../components/CodeBlock.vue'
import basic from '../examples/basic'
</script>
