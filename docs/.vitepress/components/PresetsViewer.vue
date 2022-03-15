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
  fadeVisibleOnce,
  rollBottom,
  rollLeft,
  rollRight,
  rollTop,
  rollVisibleBottom,
  rollVisibleLeft,
  rollVisibleRight,
  rollVisibleTop,
  rollVisibleOnceBottom,
  rollVisibleOnceLeft,
  rollVisibleOnceRight,
  rollVisibleOnceTop,
  pop,
  popVisible,
  popVisibleOnce,
  slideBottom,
  slideLeft,
  slideRight,
  slideTop,
  slideVisibleBottom,
  slideVisibleLeft,
  slideVisibleRight,
  slideVisibleTop,
  slideVisibleOnceBottom,
  slideVisibleOnceLeft,
  slideVisibleOnceRight,
  slideVisibleOnceTop,
} from '@vueuse/motion'

const presets = {
  fade,
  fadeVisible,
  fadeVisibleOnce,
  rollBottom,
  rollLeft,
  rollRight,
  rollTop,
  rollVisibleBottom,
  rollVisibleLeft,
  rollVisibleRight,
  rollVisibleTop,
  rollVisibleOnceBottom,
  rollVisibleOnceLeft,
  rollVisibleOnceRight,
  rollVisibleOnceTop,
  pop,
  popVisible,
  popVisibleOnce,
  slideBottom,
  slideLeft,
  slideRight,
  slideTop,
  slideVisibleBottom,
  slideVisibleLeft,
  slideVisibleRight,
  slideVisibleTop,
  slideVisibleOnceBottom,
  slideVisibleOnceLeft,
  slideVisibleOnceRight,
  slideVisibleOnceTop,
}
</script>

<style scoped>
.presetsViewer {
  display: flex;
  flex-direction: column;
}
</style>
