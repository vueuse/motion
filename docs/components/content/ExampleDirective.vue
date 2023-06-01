<script setup lang="ts">
import AnimationActions from '../generic/AnimationActions.vue';

const el = ref<HTMLDivElement>()

const { apply } = useMotion(el, {
  initial: {
    opacity: 0,
    y: 100,
    transition: { duration: 0 }
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 200 }
  },
  hovered: {
    scale: 1.2,
    transition: { delay: 200 }
  },
  custom: {
    scale: 2,
    transition: { delay: 200 }
  },
})
</script>

<template>
  <AnimationActions
    @replay="() => apply('initial')?.then(() => apply('enter'))"
    :actions="[
      { name: 'custom', action: () => apply('custom') }
    ]"
  >
    <div
      ref="el"
      class="block"
    />
  </AnimationActions>
</template>

<style scoped>
.block {
  width: 2rem;
  height: 2rem;
  background-color: var(--color-primary-500);
  border-radius: 0.25rem;
}
</style>