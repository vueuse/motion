<template>
  <div :style="{ padding: '100px' }">
    <div class="popRef" ref="popRef">Hello</div>
  </div>

  <button @click="toggleVariant">Hello</button>
</template>

<script lang="ts" setup>
import { useMotion } from '@lib'
import { ref } from 'vue'

const popRef = ref<HTMLElement>()

const variantRef = ref('enter')

const toggleVariant = () => {
  if (variantRef.value === 'enter') {
    set('initial')
    variantRef.value = 'initial'
  } else {
    set('enter')
    variantRef.value = 'enter'
  }
}

const { set } = useMotion(popRef, {
  initial: {
    backgroundColor: '#64b7d8',
    translateY: 500,
    opacity: 0.25,
  },
  enter: {
    backgroundColor: '#6424d4',
    translateY: 0,
    opacity: 1,
  },
})
</script>

<style lang="postcss">
.popRef {
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.5);
  color: white;
}
</style>
