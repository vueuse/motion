<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import Prism from 'prismjs'

const props = defineProps({
  language: {
    type: String,
    default: 'javascript',
  },
  text: {
    type: String,
    default: '',
  },
})

// Refs
const pre = ref<string>()
const code = ref<HTMLElement>()

// Functions
function preRender(codeContent: string) {
  return codeContent.replace(/\s+data-v-\S+="[^"]*"/g, '')
}

async function render() {
  if (!Prism.languages[props.language]) await import(/* @vite-ignore */ `prismjs/components/prism-${props.language}`)

  nextTick(() => {
    if (!(code?.value as any).value) return

    const codeContent = props.text || code?.value?.innerText || ''

    if (code.value) {
      code.value.textContent = preRender(codeContent)

      Prism.highlightElement(code.value)
    }
  })
}

watch(
  props,
  () => {
    render()
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>

<template>
  <pre ref="pre" class="w-full shadow-xl">
    <code ref="code" class="w-full" :class="[`language-${language}`]">
        <slot v-if="$slots" />
    </code>
</pre>
</template>
