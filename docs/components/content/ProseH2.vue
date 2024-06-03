<template>
  <Motion
    is="h2"
    :initial="{ y: 100, opacity: 0, transition: { mass: .75, damping: 10 } }"
    :visible-once="{ y: 0, opacity: 1, transition: { mass: .75, damping: 10 } }"
    ><slot
  /></Motion>
</template>
