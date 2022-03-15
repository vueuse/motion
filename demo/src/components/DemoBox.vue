<template>
  <div
    class="
      relative
      w-full
      p-4
      overflow-hidden
      bg-gray-800
      border-4
      shadow-2xl
      rounded-xl
      border-violet-600
    "
  >
    <div
      class="flex flex-wrap-reverse lg:flex-nowrap items-center w-full h-full"
    >
      <div v-if="text" class="flex-1">
        <code-block :text="text" language="javascript" />
      </div>

      <div v-if="visible" class="flex items-center justify-center flex-1">
        <slot name="demoElement" />
      </div>
    </div>

    <div class="absolute cursor-pointer select-none top-6 right-8">
      <div class="flex flex-row items-center justify-end">
        <button class="ml-4" @click="replay">
          🔃
        </button>
        <slot name="controls" />
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup="props" lang="ts">
import { useToggle } from '@vueuse/core'
import { nextTick } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'

defineProps({
  text: String,
})

const emit = defineEmits(['replay'])

const [visible, toggleVisible] = useToggle(true)

const replay = () => {
  toggleVisible()

  emit('replay')

  nextTick(toggleVisible)
}
</script>
