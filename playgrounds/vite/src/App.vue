<script setup lang="ts">
import { IconBrandGithub } from '@tabler/icons-vue'
import Delay from './demos/Delay.vue'
import Editor from './demos/Editor.vue'
import Transitions from './demos/Transitions.vue'
import Sandbox from './demos/Sandbox.vue'

// you can set this to true to see the sandbox
// sandbox can be edited in Sandbox.vue file
const sandbox = false
</script>

<template>
  <div class="w-full h-full p-2 flex flex-col">
    <div class="navbar flex h-16 -sm:(flex-col gap-1) items-center py-3 gap-3">
      <h1 class="cursor-pointer  flex gap-1 items-center select-none text-lg font-bold">
        🤹 @vueuse/motion | <span class="text-sm text-gray-300">playground</span>
      </h1>

      <p class="text-center ml-auto flex place-items-center justify-center -sm:w-full gap-2 text-sm">
        <a class="px-1 py-[2px] hover:(bg-gray-500 text-white) rounded-md border border-[hsl(var(--border))] flex place-items-center" href="https://github.com/vueuse/motion">
          <IconBrandGithub class="w-5" />
        </a>
        Package Founder:
        <a href="https://twitter.com/yaeeelglx" target="_blank" class="underline"> Yaël Guilloux </a>
      </p>
    </div>
    <div class="flex-1 w-full">
      <!-- show sample views if sandbox mode is off -->
      <template v-if="!sandbox">
        <h1 class="preview-title">
          Delay
        </h1>

        <Delay class="mt-6 mb-6" />

        <h1 class="preview-title">
          Editor
        </h1>

        <Editor class="mt-6 mb-6" />

        <h1 class="preview-title">
          Transitions
        </h1>

        <Transitions class="mt-6 mb-6" />
      </template>

      <div v-else class="flex w-full h-full items-center justify-center">
        <Sandbox />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
a {
  @apply font-bold transition-colors duration-100 ;
}
.preview-title{
  @apply flex items-center justify-center text-3xl font-bold;
}
</style>
