<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: 'blue',
  },
})
</script>

<template>
  <div class="block" :style="{ backgroundColor: color, opacity: 1 }">
    <ContentSlot :use="$slots.default" />
  </div>
</template>

<style lang="postcss">
.block {
  margin: 4rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
