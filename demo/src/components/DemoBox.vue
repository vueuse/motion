<template>
  <div
    class="relative w-full p-4 overflow-hidden bg-gray-800 border-4 shadow-2xl rounded-xl border-violet-600"
  >
    <div class="flex items-center w-full h-full">
      <div v-if="codeText" class="flex-1">
        <code-block :code-text="codeText" language="javascript" />
      </div>

      <div v-if="visible" class="flex items-center justify-center flex-1">
        <slot name="demoElement" />
      </div>
    </div>

    <div class="absolute cursor-pointer select-none top-6 right-8">
      <div class="flex flex-row items-center justify-end">
        <button class="ml-4" @click="replay">🔃</button>
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
}>()

const emit = defineEmit(['replay'])

const [visible, toggleVisible] = useToggle(true)

const replay = () => {
  toggleVisible()

  emit('replay')

  nextTick(toggleVisible)
}
</script>
