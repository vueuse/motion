<script setup lang="ts">
defineProps<{
  actions?: {
    name: string
    action: () => any
  }[]
}>()

const emit = defineEmits<{
  (e: 'replay'): void
  (e: 'action', v: string): void
}>()
</script>

<template>
  <div class="example_block">
    <button @click="emit('replay')">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path fill="currentColor" d="M8 5v14l11-7z"/>
      </svg>
      <span>
        Play
      </span>
    </button>

    <button v-for="action in actions" @click="action.action">
      <span>
        {{ action.name }}
      </span>
    </button>

  </div>
  <slot />
</template>

<style scoped>
.example_block {
  color: var(--color-primary-500);

  display: flex;
  gap: 1rem;
}

.example_block > button {
  --button-color-hover: transparent;
  --button-color-active: var(--color-primary-100);

  @media (hover: hover), (pointer: fine) {
    --button-color-hover: var(--color-primary-100);
  }

  margin-bottom: 1rem;
  display: inline-flex;
  user-select: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.dark .example_block > button {
  --button-color-hover: transparent;
  --button-color-active: var(--color-primary-800);

  @media (hover: hover), (pointer: fine) {
    --button-color-hover: var(--color-primary-800);
  }
}

.example_block > button:hover {
  background-color: var(--button-color-hover);
}

.example_block > button:active {
  background-color: var(--button-color-active);
}

.example_block > button > svg {
  margin: auto 0.25rem auto 0;
}

.example_block > button > span {
  font-weight: 500;
  margin: auto 0;
}
</style>