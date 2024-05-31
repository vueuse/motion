<script lang="ts" setup>
import { ref } from 'vue'
import type { PropType } from 'vue'
import { useMotion } from '@vueuse/motion'
import { slugify } from '../../../src/utils/slugify'
import Face from './Face.vue'

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

const { data } = await useAsyncData(`preset-${props.name}`, () => parseMarkdown(
  [
    '```vue',
    '<template>',
    `  <div v-motion-${slugify(props.name)} />`,
    '</template>',
    '```',
  ].join('\n'),
))
</script>

<template>
  <div class="presetSection">
    <ProseH3 :id="name" class="capitalize">
      {{ name.replace(/[A-Z]/g, (s: any) => ` ${s}`) }}
    </ProseH3>

    <div class="content">
      <!-- <div class="demoCode"> -->
      <ContentRendererMarkdown class="demoCode" :value="data" />
      <!-- </div> -->

      <div class="demoContainer relative">
        <client-only>
          <button class="absolute right-4 top-4" @click="replay">
            <div ref="replayButton">
              <Icon name="heroicons-outline:refresh" class="h-6 w-6" />
            </div>
          </button>
          <div ref="demoElement" class="demoElement" @click="replay">
            <Face />
          </div>
        </client-only>
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
  gap: 1em;
  align-items: center;
}

.demoCode {
  flex: 2;
  width: 50%;
  height: 100%;
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
