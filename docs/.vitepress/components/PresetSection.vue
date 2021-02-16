<template>
  <div class="presetSection">
    <h2 style="text-transform: capitalize">
      {{ name.replace(/[A-Z]/g, (s) => ' ' + s) }}

      <button @click="replay">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          focusable="false"
          role="img"
          width="1.2em"
          height="1.5em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 344 432"
        >
          <path
            d="M171 91q70 0 120 50t50 120.5T291 382t-120.5 50T50 382T0 261h43q0 53 37.5 90.5T171 389t90.5-37.5T299 261t-37.5-90.5T171 133v86L64 112L171 5v86z"
            style="fill: var(--c-text)"
          ></path>
        </svg>
      </button>
    </h2>
    <div class="content">
      <div class="demoCode">
        <code>
          {{ `
          <div v-motion-${slugify(name)} />
          ` }}
        </code>
      </div>

      <div class="demoContainer">
        <div ref="demoElement" class="demoElement">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <path
              class="a"
              fill="#35495e"
              d="M735.07,67.05V531.58c0,129.83-105.24,235.07-235.07,235.07S264.93,661.41,264.93,531.58V67.05h166.3V531.58a68.77,68.77,0,1,0,137.54,0V67.05Z"
            />
            <path
              class="b"
              fill="#41b883"
              d="M901.36,67.05V531.58C901.36,753.25,721.67,933,500,933S98.64,753.25,98.64,531.58V67.05H264.93V531.58c0,129.83,105.25,235.07,235.07,235.07S735.07,661.41,735.07,531.58V67.05Z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup="props" lang="ts">
import { ref, defineProps, nextTick } from 'vue'
import { useMotion } from '@vueuse/motion'
import { slugify } from '../../../src/utils/slugify'

const { preset, name } = defineProps({
  name: {
    type: String,
  },
  preset: {
    type: Object as MotionVariants,
  },
})

const demoElement = ref<HTMLElement>()

const { apply, set } = useMotion(demoElement, preset)

const replay = () => {
  set(preset['initial'])

  nextTick(() => {
    if (preset.visible) {
      apply(preset.visible)
    }

    if (preset.enter) {
      apply(preset.enter)
    }
  })
}
</script>

<style scoped>
.presetSection {
  width: 100%;
  display: flex;
  flex-direction: column;
}

h2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h2 > button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.content {
  display: flex;
}

.demoCode {
  flex: 1;
  width: 50%;
}

.demoContainer {
  width: 50%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 12rem;
  background-color: var(--code-inline-bg-color);
  overflow: hidden;
  border-radius: 16px;
}

.demoElement {
  width: 6rem;
}
</style>
