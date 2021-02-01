<template>
  <div
    class="relative w-full overflow-hidden bg-gray-800 border-4 shadow-2xl rounded-xl border-violet-600"
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
        <code-block :code-text="basic" language="javascript" />
      </div>
      <div class="flex items-center justify-center flex-1">
        <div v-if="visible">
          <div
            v-motion="'test'"
            :initial="{
              x: 0,
              y: 100,
              opacity: 0,
            }"
            :enter="{
              y: 0,
              x: 0,
              opacity: 1,
              transition: {
                delay: 400,
                type: 'spring',
                bounce: 0.3,
              },
            }"
            class="w-24 h-24 bg-indigo-500 border-8 border-indigo-400 shadow-xl rounded-3xl"
          />
        </div>
      </div>
    </div>

    <div
      @click="replay"
      class="absolute transform -rotate-90 cursor-pointer select-none top-4 right-8"
    >
      <span> 🔃 </span>
    </div>
  </div>
</template>

<script setup="props" lang="ts">
import { useMotions } from '@lib/useMotions'
import { useToggle } from '@vueuse/core'
import { nextTick, ref, watch } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'
import basic from '../examples/basic'

const [visible, toggleVisible] = useToggle(true)

const replay = () => {
  toggleVisible()

  nextTick(() => toggleVisible())
}

const motions = useMotions()

const input = ref<number>(0)

watch(input, (newVal) => {
  if (motions.test) {
    motions.test.apply({
      x: newVal,
      transition: {
        type: 'spring',
      },
    })
  }
})
</script>
