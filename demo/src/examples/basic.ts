export default `
<template>
  <div
    v-motion
    ref="block"
    :initial="{
      y: 200,
      opacity: 0.25,
    }"
    :enter="{
      y: 0,
      opacity: 1,
    }"
  >
</template>
`
