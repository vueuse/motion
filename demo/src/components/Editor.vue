<template>
  <div
    class="relative w-full p-4 overflow-hidden bg-gray-800 border-4 shadow-2xl rounded-xl border-violet-600"
    v-motion
    :initial="{
      y: 200,
      scale: 0.9,
      opacity: 0,
    }"
    :enter="{
      y: 0,
      scale: 1,
      opacity: 1,
    }"
  >
    <div class="flex items-center w-full h-full">
      <div class="flex-1">
        <code-block :code-text="codeText" language="javascript" />
      </div>
      <div v-if="visible" class="flex items-center justify-center flex-1">
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
            transition: {
              type: 'spring',
            },
          }"
          :hovered="{
            scale: 1.2,
            transition: {
              type: 'spring',
              mass: 2,
            },
          }"
          :tapped="{
            scale: 0.8,
            transition: {
              type: 'spring',
              mass: 2,
            },
          }"
          class="w-24 h-24 bg-indigo-500 border-8 border-indigo-400 shadow-xl cursor-pointer rounded-3xl"
        />
      </div>
    </div>

    <div
      @click="replay"
      class="absolute transform -rotate-90 cursor-pointer select-none top-6 right-8"
    >
      <span> 🔃 </span>
    </div>

    <div>
      <input type="range" max="360" min="0" v-model="input" step="1" />
    </div>
  </div>
</template>

<script setup="props" lang="ts">
import { useMotions } from '@lib/useMotions'
import { useToggle } from '@vueuse/core'
import { computed, nextTick, ref, watch } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'
import basic from '../examples/basic'

const [visible, toggleVisible] = useToggle(true)

const replay = () => {
  toggleVisible()

  input.value = '0'

  nextTick(toggleVisible)
}

const motions = useMotions()

const input = ref<string>('0')

const codeText = computed(() => {
  return basic(input.value)
})

watch(input, (newVal) => {
  if (motions.test) {
    motions.test.apply({
      rotate: newVal,
      transition: {
        type: 'spring',
        stiffness: 220,
      },
    })
  }
})
</script>
