<template>
  <DemoBox :code-text="codeText">
    <template #demoElement>
      <transition
        :css="false"
        @leave="(el, done) => motions.transition.leave(done)"
      >
        <div
          v-if="show"
          v-motion="'transition'"
          :initial="{
            y: 400,
            opacity: 0,
            rotate: 0,
          }"
          :enter="{
            y: 0,
            opacity: 1,
          }"
          :leave="{
            y: -400,
            opacity: 0,
          }"
          class="w-24 h-24 bg-blue-500 border-8 border-blue-400 shadow-xl cursor-pointer rounded-3xl"
        />
      </transition>
    </template>

    <template #sliders>
      <div class="border-solid border-white border-t-1">
        <div class="mt-2">
          <button class="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-400" @click="toggleShow">Toggle</button>
        </div>
      </div>
    </template>
  </DemoBox>
</template>

<script setup="props" lang="ts">
import DemoBox from '../components/DemoBox.vue'
import { useMotions } from '@vueuse/motion'
import { useToggle } from '@vueuse/core'
import { computed } from 'vue'
import transitions from '../examples/transitions'

const [show, toggleShow] = useToggle(true)

ref: codeText = computed(() => {
  return transitions(show.value)
})

const motions = useMotions()
</script>
