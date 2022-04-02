<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: 'blue',
  },
})
</script>

<template>
  <div :style="`width: 300px; height: 300px; background-color: ${color};`" />
</template>
