<template>
  <div style="padding: 4rem">
    <Block
      v-motion
      :initial="{
        y: 500,
        opacity: 0,
      }"
      :enter="{
        y: 0,
        opacity: 1,
      }"
    />
  </div>
</template>
