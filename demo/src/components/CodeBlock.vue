<template>
  <pre ref="pre" class="w-full shadow-xl">
    <code ref="code" :class="['w-full', `language-${language}`]">
        <slot v-if="$slots" />
    </code>
</pre>
</template>

<script setup lang="ts">
import { defineProps, nextTick, ref, watch } from 'vue-demi'
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
const preRender = (codeContent: string) => {
  return codeContent.replace(/\s+data-v-\S+="[^"]*"/g, '')
}

const render = () => {
  if (!Prism.languages[props.language])
    require(`prismjs/components/prism-${props.language}`)

  nextTick(() => {
    if (!code) return

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
