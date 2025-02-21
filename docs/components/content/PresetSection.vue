<script setup="props" lang="ts">
import type { PropType } from 'vue'
import { useMotion } from '@vueuse/motion'
import { ref } from 'vue'
import { slugify } from '../../../src/utils/slugify'

const props = defineProps({
  name: {
    type: String as PropType<any>,
  },
  preset: {
    type: Object as PropType<any>,
  },
})

const isReplaying = ref(false)
const replayButton = ref<SVGElement>()
const demoElement = ref<HTMLElement>()

const { apply } = useMotion(demoElement, props.preset)

const replayInstance = useMotion(replayButton, {
  initial: {
    rotate: 0,
  },
})

async function replay() {
  if (isReplaying.value)
    return

  isReplaying.value = true

  replayInstance.apply({
    rotate: -360,
  })

  await apply(props.preset.initial)

  if (props.preset.visible)
    await apply(props.preset.visible)

  if (props.preset.visibleOnce)
    await apply(props.preset.visibleOnce)

  if (props.preset.enter)
    await apply(props.preset.enter)

  replayInstance.set({ rotate: 0 })

  isReplaying.value = false
}
</script>

<template>
  <div class="presetSection">
    <ProseH3 :id="name" class="capitalize">
      {{ name.replace(/[A-Z]/g, (s: any) => ` ${s}`) }}
    </ProseH3>

    <div class="content">
      <div class="demoCode">
        <ProseCodeInline>
          {{ `
          <div v-motion-${slugify(name)} />
          ` }}
        </ProseCodeInline>
      </div>

      <div class="demoContainer relative">
        <button class="absolute right-4 top-4" @click="replay">
          <Icon ref="replayButton" name="heroicons-outline:refresh" class="h-6 w-6" />
        </button>
        <div ref="demoElement" class="demoElement" @click="replay">
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

<style scoped>
.presetSection {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.content {
  display: flex;
}

.demoCode {
  flex: 1;
  width: 50%;
}

.demoContainer {
  @apply bg-blue-50/25 dark:bg-blue-900/25;
  width: 50%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 12rem;
  overflow: hidden;
  border-radius: 16px;
}

.demoElement {
  width: 6rem;
}

.relative {
  position: relative;
}

.capitalize {
  text-transform: capitalize;
}

.absolute {
  position: absolute;
}

.top-4 {
  top: 1rem;
}

.right-4 {
  right: 1rem;
}

.h-6 {
  height: 1.5rem;
}

.w-6 {
  width: 1.5rem;
}
</style>
