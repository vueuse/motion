<template>
  <Motion
    is="code"
    :initial="{ y: 100, opacity: 0 }"
    :visible-once="{ y: 0, opacity: 1 }"
    ><slot
  /></Motion>
</template>
