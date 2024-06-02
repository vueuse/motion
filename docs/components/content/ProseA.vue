<template>
  <Motion
    :initial="{ y: '1em', opacity: 0 }"
    :visible-once="{ y: '0em', opacity: 1 }"
    is="span"
    style="display: inline-block"
  >
    <NuxtLink :href="href" :target="target">
      <slot />
    </NuxtLink>
  </Motion>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String as PropType<
      | '_blank'
      | '_parent'
      | '_self'
      | '_top'
      | (string & object)
      | null
      | undefined
    >,
    default: undefined,
    required: false,
  },
})
</script>
