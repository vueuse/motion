<template>
  <pre ref="pre" class="w-full shadow-xl">
    <code ref="code" :class="['w-full', `language-${language}`]">
        <slot />
    </code>
</pre>
</template>

<script lang="ts">
import Prism from 'prismjs'
import { onMounted, ref, nextTick } from 'vue'

export default {
  props: {
    codeText: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: 'javascript',
    },
  },
  setup({ language, codeText }) {
    // Refs
    const pre = ref<string>()
    const code = ref<HTMLElement>()

    // Functions
    const preRender = (codeContent: string) => {
      return codeContent.replace(/\s+data-v-\S+="[^"]*"/g, '')
    }
    const render = () => {
      if (!Prism.languages[language]) {
        require(`prismjs/components/prism-${language}`)
      }

      nextTick(() => {
        const codeContent = codeText || code.value.innerText

        code.value.textContent = preRender(codeContent)
        Prism.highlightElement(code.value)
      })
    }

    // Hooks
    onMounted(() => {
      render()
    })

    return {
      pre,
      code,
      language,
    }
  },
}
</script>
