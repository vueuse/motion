<script setup="props" lang="ts">
import { useToggle } from '@vueuse/core'
import { useMotions } from '@vueuse/motion'
import { computed } from 'vue'
import DemoBox from '../components/DemoBox.vue'
import transitions from '../examples/transitions'

const [show, toggleShow] = useToggle(true)

const codeText = computed(() => transitions(show.value))

const motions = useMotions()
</script>

<template>
  <DemoBox :text="codeText">
    <template #demoElement>
      <transition :css="false" @leave="(_: any, done: any) => motions.transition.leave(done)">
        <div
          v-if="show"
          v-motion="'transition'"
          :initial="{
            y: 400,
            opacity: 0,
          }"
          :enter="{
            y: 0,
            opacity: 1,
          }"
          :leave="{
            y: -400,
            opacity: 0,
          }"
          class="h-24 w-24 cursor-pointer rounded-3xl border-8 border-indigo-400 bg-indigo-500 shadow-xl"
        />
      </transition>
    </template>

    <div>
      <button class="rounded-lg bg-indigo-600 px-4 py-2 hover:bg-indigo-400" @click="() => toggleShow()">
        Toggle
      </button>
    </div>
  </DemoBox>
</template>
