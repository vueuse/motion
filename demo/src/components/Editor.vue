<template>
  <DemoBox :code-text="codeText">
    <template #demoElement>
      <div
        v-motion="'test'"
        :initial="{
          x: 0,
          y: 200,
          opacity: 0,
          rotate: 0,
        }"
        :enter="{
          y: 0,
          x: 0,
          rotate: 0,
          opacity: 1,
          scale: 1,
        }"
        :hovered="{
          scale: 1.2,
        }"
        :tapped="{
          scale: 0.8,
        }"
        class="w-24 h-24 bg-indigo-500 border-8 border-indigo-400 shadow-xl cursor-pointer rounded-3xl"
      />
    </template>

    <div>
      <input type="range" max="360" min="0" v-model="input" step="1" />
    </div>
  </DemoBox>
</template>

<script setup="props" lang="ts">
import DemoBox from './DemoBox.vue'
import { useMotions } from '@vueuse/motion'
import { computed, watch } from 'vue'
import basic from '../examples/basic'

const motions = useMotions()

ref: input = '0' as string

ref: codeText = computed(() => {
  return basic(input)
})

watch($input, (newVal) => {
  if (motions.test) {
    motions.test.apply({
      rotate: newVal,
    })
  }
})
</script>
