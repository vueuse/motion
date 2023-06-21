<script setup lang="ts">
import { useEventListener, useScrollLock } from "@vueuse/core";
import AnimationActions from "../../generic/AnimationActions.vue"

const mouseArea = ref<HTMLDivElement>()
const box = ref<HTMLDivElement>()
const scrollLockState = ref(true)

const { apply } = useMotion(box, {
  initial: {
    translateX: 0,
    translateY: 0,
  }
})

function doMove (clientX: number, clientY: number) {
  const rect = mouseArea.value?.getBoundingClientRect()
  if (!rect) { return }

  const { x, y } = rect

  const left = clientX - x
  const top = clientY - y

  apply({
    translateX: left,
    translateY: top
  })
}

useEventListener(mouseArea, 'mousemove', (e: MouseEvent) => {
  doMove(e.clientX, e.clientY)
})

useEventListener(mouseArea, 'touchmove', (e: TouchEvent) => {
  doMove(e.touches[0].clientX, e.touches[0].clientY)
})

useEventListener(mouseArea, 'touchstart', () => scrollLockState.value = true)

onMounted(() => {
  useEventListener(document, 'touchend', () => scrollLockState.value = false)
  useEventListener(document, 'touchcancel', () => scrollLockState.value = false)

  const _scrollLock = useScrollLock(document.body, false)
  watch(scrollLockState, (v) => _scrollLock.value = v)
})
</script>

<template>
  <AnimationActions
    @replay="() => apply('initial')"
  >
    <div class="container">
      <div class="mouse-area" ref="mouseArea" />
      <div class="preview-area">
        <div class="box" ref="box" />
      </div>
    </div>
  </AnimationActions>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  position: relative;
  width: 100%;
  height: 16rem;
}

.mouse-area {
  border: solid 1px var(--color-primary-500);
  border-radius: 6px;
}

.preview-area {
  position: relative;
  overflow: hidden;
}

.box {
  position: absolute;
  width: 1rem;
  height: 1rem;
  background-color: var(--color-primary-500);
  border-radius: 6px;
}
</style>