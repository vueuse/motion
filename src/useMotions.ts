import { getCurrentInstance, onMounted, shallowReactive } from 'vue'
import { MotionDirectiveInjection } from './plugin'

export function useMotions() {
  const app = getCurrentInstance()

  const motions = shallowReactive<MotionDirectiveInjection>({})

  onMounted(() => {
    if (app?.proxy?.$motions) {
      Object.assign(motions, app.proxy.$motions)
    } else {
      console.warn(
        `Could not find any motion in this component, are you using v-motion anywhere?`,
      )
    }
  })

  return motions
}
