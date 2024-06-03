<template>
  <Motion
    :initial="{ y: '0em', opacity: 1, scaleY: 1.15, scaleX: 0.95, transition: {damping:5,mass:1 } }"
    :visible-once="{ y: '0em', opacity: 1,rotate: 0, scaleY: 1, scaleX: 1, transition: {damping:5,mass:1 } }"
    :hovered="{scaleY: 1.05, scaleX: 1.05, rotate: -0.25, transition: {damping:5,mass:1 }}"
    :tapped="{scaleY: 0.95, scaleX:0.95, rotate: 0.25, transition: {damping:5,mass:1 }}"
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
