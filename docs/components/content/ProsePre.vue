<template>
  <Motion
    is="pre"
    :initial="{ y: 100, opacity: 0, transition: { mass: .1, damping: 10 } }"
    :visible-once="{ y: 0, opacity: 1, transition: { mass: .1, damping: 10 } }"
    :class="$props.class"
    ><slot
  /></Motion>
</template>

<script setup lang="ts">
defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})
</script>

<style>
pre code .line {
  display: block;
}
</style>
