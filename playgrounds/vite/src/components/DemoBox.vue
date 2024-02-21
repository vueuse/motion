<script setup="props" lang="ts">
import { useToggle } from '@vueuse/core'
import { nextTick } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'

defineProps({
  text: String,
})

const emit = defineEmits(['replay'])

const [visible, toggleVisible] = useToggle(true)

async function replay() {
  toggleVisible()

  emit('replay')

  await nextTick()
  toggleVisible()
}
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-xl border-4 border-violet-600 bg-gray-800 p-4 shadow-2xl">
    <div class="flex h-full w-full flex-wrap-reverse items-center lg:flex-nowrap">
      <div v-if="text" class="flex-1">
        <CodeBlock :text="text" language="javascript" />
      </div>

      <div v-if="visible" class="flex flex-1 items-center justify-center">
        <slot name="demoElement" />
      </div>
    </div>

    <div class="absolute top-6 right-8 cursor-pointer select-none">
      <div class="flex flex-row items-center justify-end">
        <button class="ml-4" @click="replay">🔃</button>
        <slot name="controls" />
      </div>
    </div>

    <slot />
  </div>
</template>
