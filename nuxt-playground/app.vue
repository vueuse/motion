<script setup lang="ts">
import Block from './components/Block.vue'

const initial = ref({
  y: -400,
  opacity: 0,
  rotate: 90,
})

const enter = ref({
  y: 0,
  opacity: 1,
  rotate: 0,
})
</script>

<template>
  <div>
    <span
      v-motion="{
        initial,
        enter
      }"
    >
      Nuxt module playground!
    </span>

    <Motion
      is="div"
      :initial="{
        y: 0,
        opacity: 0
      }"
      :enter="{
        y: 100,
        opacity: 1
      }"
    >
      Hello
    </Motion>

    <Motion is="Block" />

    <Motion :is="Block" :color="'red'" />
  </div>
</template>
