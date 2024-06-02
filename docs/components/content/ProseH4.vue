<template>
  <Motion
    is="h4"
    :initial="{ y: 100, opacity: 0 }"
    :visible-once="{ y: 0, opacity: 1 }"
    ><slot
  /></Motion>
</template>
