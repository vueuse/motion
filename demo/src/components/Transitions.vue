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
          class="w-24 h-24 bg-indigo-500 border-8 border-indigo-400 shadow-xl cursor-pointer rounded-3xl"
        />
      </transition>
    </template>

    <div>
      <button @click="toggleShow">Toggle</button>
    </div>
  </DemoBox>
</template>

<script setup="props" lang="ts">
import DemoBox from './DemoBox.vue'
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
