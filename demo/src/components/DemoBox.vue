<template>
  <div
    class="relative w-full p-4 overflow-hidden bg-gray-800 border-4 shadow-2xl rounded-xl border-blue-600"
  >
    <div class="flex flex-col md:flex-row justify-between w-full h-full">    
      <div v-if="visible" class="flex items-center justify-center flex-1">
        <slot name="demoElement" />
      </div>

      <div class="flex flex-col flex-1">
        <div v-if="codeText" class="">
          <code-block :code-text="codeText" language="javascript" />
        </div>
        <div>
        <slot name="sliders"/>
        </div>
      </div>
    </div>

    <div class="absolute cursor-pointer select-none top-6 right-8">
      <div class="flex flex-row items-center justify-end">
        <button class="ml-4 text-white" @click="replay"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>
        <slot name="controls" />
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup="props" lang="ts">
import { useToggle } from '@vueuse/core'
import CodeBlock from './CodeBlock.vue'
import { defineProps, nextTick, defineEmit } from 'vue'

defineProps<{
  codeText?: string
  sliders?: boolean
}>()

const emit = defineEmit(['replay'])

const [visible, toggleVisible] = useToggle(true)

const replay = () => {
  toggleVisible()

  emit('replay')

  nextTick(toggleVisible)
}
</script>
