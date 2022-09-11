<script setup lang="ts">
</script>

<template>
  <h2
    v-motion="{
      initial: {
        y: 200,
        opacity: 0,
      },
      enter: {
        y: 0,
        opacity: 1,
      },
    }"
  >
    Hello
  </h2>
  <p>World</p>
</template>

<style>
#app {
  padding: 4em 8em;
  font-family: sans-serif;
}
</style>
