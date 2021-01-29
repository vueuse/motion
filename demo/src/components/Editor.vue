<template>
  <div
    v-motion
    ref="block"
    :initial="{
      y: 200,
      opacity: 0.25,
    }"
    :enter="{
      y: 0,
      opacity: 1,
    }"
  >
    <div class="w-full p-6 bg-gray-800 rounded-3xl">
      <div class="flex items-center justify-center w-full h-96">
        <div class="flex-1">
          <code-block :code-text="basic" />
        </div>
        <div class="flex items-center justify-center flex-1">
          <div
            v-motion
            ref="demo"
            :initial="{
              y: 200,
              opacity: 0.25,
            }"
            :enter="{
              y: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                delay: 100,
              },
            }"
            class="w-24 h-24 bg-indigo-500 shadow-lg rounded-3xl"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup="props" lang="ts">
import CodeBlock from '../components/CodeBlock.vue'
import basic from '../examples/basic'
</script>

<style lang="scss" scoped></style>
