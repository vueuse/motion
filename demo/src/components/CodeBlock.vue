<template>
  <pre ref="pre" class="w-full shadow-xl">
    <code ref="code" :class="['w-full', `language-${language}`]">
        <slot v-if="$slots" />
    </code>
</pre>
</template>

<script setup lang="ts">
import { ref, nextTick, defineProps, watch } from 'vue'
import Prism from 'prismjs'

const props = defineProps({
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
  if (!Prism.languages[props.language]) {
    require(`prismjs/components/prism-${props.language}`)
  }

  nextTick(() => {
    if (!code) return

    const codeContent = props.codeText || code.innerText

    code.textContent = preRender(codeContent)

    Prism.highlightElement(code)
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
