export default () => `
<script setup="props" lang="ts">
import { computed, ref } from "vue";
import { MotionComponent as Motion, useMotion } from "@vueuse/motion";

const lines = ref([
  { x1: 5, y1: 25, x2: 11, y2: 9 },
  // { x1: 7, y1: 27, x2: 13, y2: 11 },
  // { x1: 9, y1: 29, x2: 15, y2: 23 },
]);

const varients = ref([
  {
    pathLength: 1,
    pathSpacing: 1,
    pathOffset: 1,
    transition: {
      duration: 300,
    },
  },

  {
    pathLength: 1,
    pathSpacing: 1,
    pathOffset: [1, 2],
    transition: {
      duration: 1000,
    },
  },
]);

const target = ref<HTMLElement>();
const instance = useMotion(target, {
  initial: varients.value[0],
  enter: varients.value[1],
});

function enter() {
  const varient = varients.value[1];
  instance.apply(varient);
}
function leave() {
  const varient = varients.value[0];
  instance.apply(varient);
}
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="500"
    height="500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-loader-circle"
    @mouseenter="enter"
    @mouseleave="leave"
  >
    <Motion
      is="line"
      ref="target"
      :x1="lines[0].x1 + 3"
      :x2="lines[0].x2 + 3"
      :y1="lines[0].y1 - 3"
      :y2="lines[0].y2 - 3"
    />

    <line
      v-motion
      stroke="yellow"
      :x1="lines[0].x1 + 5"
      :x2="lines[0].x2 + 5"
      :y1="lines[0].y1 - 3"
      :y2="lines[0].y2 - 3"
      :initial="{
        pathLength: 1,
        pathSpacing: 1,
        pathOffset: 2,
        transition: {
          duration: 300,
        },
      }"
      :enter="{
        pathLength: 1,
        pathSpacing: 1,
        pathOffset: 2,
        transition: {
          duration: 300,
        },
      }"
      :hovered="{
        pathLength: 1,
        pathSpacing: 1,
        pathOffset: [2, 1],
      }"
    />
  </svg>
</template>
`
