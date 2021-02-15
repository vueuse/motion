<template>
  <div class="presetsViewer">
    <div>
      <h2 v-motion-slide-right>Code 👨‍💻</h2>
    </div>
    <div>
      <h2 v-motion-slide-left>Result 🤹</h2>
    </div>
  </div>
</template>

<script setup></script>

<style>
.presetsViewer {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.presetsViewer > div {
  flex: 1;
  width: 50%;
  display: flex;
  justify-content: center;
}
</style>
