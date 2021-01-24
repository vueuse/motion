<template>
  <div :style="{ padding: '100px' }">
    <div ref="popRef" :style="{ position: 'relative', backgroundColor: 'red' }">
      Hello
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStyle } from '@lib'
import { animate } from 'popmotion'
import { onMounted, ref } from 'vue'

const popRef = ref<HTMLElement>()

const { style } = useStyle(popRef)

onMounted(() => {
  animate({
    from: -100,
    to: 0,
    type: 'spring',
    onUpdate: (latest) => (style.bottom = `${latest}px`),
  })

  animate({
    from: 0,
    to: 1,
    onUpdate: (latest) => (style.opacity = `${latest}`),
  })
})
</script>
