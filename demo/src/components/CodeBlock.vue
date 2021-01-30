<template>
  <pre ref="pre" class="w-full shadow-xl">
    <code ref="code" :class="['w-full', `language-${language}`]">
        <slot v-if="$slots" />
    </code>
</pre>
</template>

<script setup="props" lang="ts">
import { onMounted, ref, nextTick, defineProps } from 'vue'
import Prism from 'prismjs'

const { language, codeText } = defineProps({
  language: {
    type: String,
    default: 'javascript',
  },
  codeText: {
    type: String,
    default: '',
  },
})

// Refs
ref: pre = ref<string>()
ref: code = ref<HTMLElement>()

// Functions
const preRender = (codeContent: string) => {
  return codeContent.replace(/\s+data-v-\S+="[^"]*"/g, '')
}

const render = () => {
  if (!Prism.languages[language]) {
    require(`prismjs/components/prism-${language}`)
  }

  nextTick(() => {
    if (!code) return

    const codeContent = codeText || code.innerText

    code.textContent = preRender(codeContent)

    Prism.highlightElement(code)
  })
}

// Hooks
onMounted(() => {
  render()
})
</script>
