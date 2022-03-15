<template>
  <DemoBox :text="codeText">
    <template #demoElement>
      <transition
        :css="false"
        @leave="(_, done) => motions.transition.leave(done)"
      >
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
          class="
            w-24
            h-24
            bg-indigo-500
            border-8 border-indigo-400
            shadow-xl
            cursor-pointer
            rounded-3xl
          "
        />
      </transition>
    </template>

    <div>
      <button
        class="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-400"
        @click="() => toggleShow()"
      >
        Toggle
      </button>
    </div>
  </DemoBox>
</template>

<script setup="props" lang="ts">
import { computed } from 'vue'
import { useMotions } from '@vueuse/motion'
import { useToggle } from '@vueuse/core'
import DemoBox from '../components/DemoBox.vue'
import transitions from '../examples/transitions'

const [show, toggleShow] = useToggle(true)

const codeText = computed(() => transitions(show.value))

const motions = useMotions()
</script>
