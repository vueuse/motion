<script setup lang="ts">
import AnimationActions from '../../generic/AnimationActions.vue';

const blocks = ref<HTMLDivElement[]>()

const applyFuncs = computed(() => blocks.value?.map(block => useMotion(block, {
  initial: {
    scale: 1,
    transition: { type: 'tween', duration: 300 }
  }
})) ?? [])

function calculateDelays(index: number) {
  return blocks.value?.map((_, idx) => 100 * Math.abs(index - idx)) ?? []
}

function startStagger (index: number) {
  calculateDelays(index).forEach((delay, idx) => applyFuncs.value[idx].apply({
    scale: 0,
    transition: { delay }
  }))
}
</script>

<template>
  <AnimationActions
    @replay="() => applyFuncs?.forEach(({ apply }) => apply('initial'))"
  >
    <ul>
      <li
        v-for="_, index in Array(16)"
        ref="blocks"
        class="block"
        @click="startStagger(index)"
      >

      </li>
    </ul>
  </AnimationActions>
</template>

<style scoped>
ul {
  display: flex;
  gap: 0.5rem
}

.block {
  width: 1rem;
  height: 1rem;
  background-color: var(--color-primary-500);
  border-radius: 0.25rem;
}
</style>