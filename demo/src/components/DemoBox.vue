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
        <slot name="demoElement" />
      </div>
    </div>

    <div class="absolute cursor-pointer select-none top-6 right-8">
      <div class="flex flex-row items-center justify-end">
        <span class="pl-4" @click="replay">🔃</span>
        <slot name="controls" />
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup="props" lang="ts">
import { useToggle } from '@vueuse/core'
import CodeBlock from './CodeBlock.vue'
import { defineProps, nextTick } from 'vue'

const props = defineProps<{
  onReplay?: () => void
  codeText?: string
}>()

const [visible, toggleVisible] = useToggle(true)

const replay = () => {
  toggleVisible()

  props?.onReplay?.()

  nextTick(toggleVisible)
}
</script>
