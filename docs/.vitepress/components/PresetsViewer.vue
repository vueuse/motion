<template>
  <div class="presetsViewer">
    <preset-section
      v-for="[key, preset] in Object.entries(presets)"
      :key="key"
      :name="key"
      :preset="preset"
    />
  </div>
</template>

<script setup="props" lang="ts">
import PresetSection from './PresetSection.vue'
import { ref } from 'vue'
import { useMotion } from '@vueuse/motion'
import {
  fade,
  fadeVisible,
  rollBottom,
  rollLeft,
  rollRight,
  rollTop,
  rollVisibleBottom,
  rollVisibleLeft,
  rollVisibleRight,
  rollVisibleTop,
  pop,
  popVisible,
  slideBottom,
  slideLeft,
  slideRight,
  slideTop,
  slideVisibleBottom,
  slideVisibleLeft,
  slideVisibleRight,
  slideVisibleTop,
} from '@vueuse/motion'

const presets = {
  fade,
  fadeVisible,
  rollBottom,
  rollLeft,
  rollRight,
  rollTop,
  rollVisibleBottom,
  rollVisibleLeft,
  rollVisibleRight,
  rollVisibleTop,
  pop,
  popVisible,
  slideBottom,
  slideLeft,
  slideRight,
  slideTop,
  slideVisibleBottom,
  slideVisibleLeft,
  slideVisibleRight,
  slideVisibleTop,
}
</script>

<style scoped>
.presetsViewer {
  display: flex;
  flex-direction: column;
}
</style>
