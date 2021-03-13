<template>
  <DemoBox class="w-full h-full p-10" :sliders="true" :code-text="codeText" @replay="replay">    
    <template #demoElement>
      <div
        v-motion="'editor'"
        :initial="{
          y: 200,
          opacity: 0,
          rotate: 0,
          scale: 1,
        }"
        :enter="{
          y: 0,
          rotate: 0,
          opacity: 1,
          scale: 1,
        }"
        :hovered="{
          scale: 1.2,
        }"
        :tapped="{
          scale: 0.8,
        }"       
        class="text-center w-24 h-24 bg-white border-8 border-blue-400 shadow-xl cursor-pointer rounded-3xl"
      >
        <div @mouseover.prevent="" class="select-none text-3xl pt-4">🤹</div>
      </div>
    </template>   

     <template #sliders>
      <div class="border-solid border-white border-t-1">
        <div class="w-64 mt-5">
          <div class="flex justify-between">
            <span class="w-2/5 text-white mr-4">Rotation</span>
            <input class="w-3/5" type="range" max="360" min="0" v-model="rotation" step="1" />  
          </div>      
          <div class="flex justify-between">
            <span class="w-2/5 text-white mr-4">X</span>
            <input class="w-3/5" type="range" max="100" min="-100" v-model="xValue" step="1" />
          </div>
          <div class="flex justify-between">
            <span class="w-2/5 text-white mr-4">Y</span>
            <input class="w-3/5" type="range" max="100" min="-100" v-model="yValue" step="1" />
          </div>

          <div class="flex justify-between">
            <span class="w-2/5 text-white mr-4">Scale</span>
            <input class="w-3/5" type="range" max="2" min="0" v-model="scale" step="0.1" />
          </div>
        </div>
      </div>
    </template>
  </DemoBox>
</template>

<script setup="props" lang="ts">
import DemoBox from '../components/DemoBox.vue'
import { useMotions } from '@vueuse/motion'
import { computed, watch, onMounted } from 'vue'
import basic from '../examples/basic'

const motions = useMotions()

ref: rotation = '0' as string
ref: xValue = '-9' as string
ref: yValue = '4' as string
ref: scale = '1.6' as string


ref: codeText = computed(() => {
  return basic(rotation, xValue, yValue, scale, 0.5)
})


watch($rotation, (newVal) => {
  if (motions.editor) {
    motions.editor.apply({
      rotate: parseInt(newVal),
    })
  }
})

watch($yValue, (newVal) => {
  if (motions.editor) {
    motions.editor.apply({
      y: parseInt(newVal),
    })
  }
})

watch($xValue, (newVal) => {
  if (motions.editor) {
    motions.editor.apply({
      x: parseInt(newVal),
    })
  }
})

watch($scale, (newVal) => {
  if (motions.editor) {
    motions.editor.apply({
      scale: parseFloat(newVal),
    })
  }
})

onMounted(() => {

})

const replay = () => {
  $rotation.value = '0'
  $xValue.value = '-9'
  $yValue.value = '4'
  $scale.value = '1'
}
</script>

<style scoped>
 

</style>
