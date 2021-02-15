<template>
  <div class="presetSection">
    <h2>
      {{ `v-motion-${slugify(name)}` }}

      <span @click="replay">Replay</span>
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
        <div ref="demoElement" class="demoElement" />
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

h2 > span {
  font-size: 16px;
  cursor: pointer;
  user-select: none;
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
  min-height: 8rem;
}

.demoElement {
  height: 4rem;
  width: 4rem;
  background-color: var(--c-brand);
  border-radius: 1rem;
  border: 4px solid var(--c-brand-light);
}
</style>
