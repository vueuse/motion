import { getCurrentInstance, onMounted, shallowReactive } from 'vue'
import { MotionDirectiveInjection } from './plugin'

/**
 * A Composable giving access to current component instance `$motions` instances declared via `v-motion` from the template.
 */
export function useMotions() {
  // Get the current component instance
  const app = getCurrentInstance()

  // Create a shallow reactive object, holding motions
  const motions = shallowReactive<MotionDirectiveInjection>({})

  // On mounted, get all the $motions, and bind them to the shallow reactive object
  onMounted(() => {
    // Check if the current component instance has $motions injected
    if (app?.proxy?.$motions) {
      // Append the local shallowReactive object with all the $motions injected in the component instance
      Object.assign(motions, app.proxy.$motions)
    } else {
      // If there's no v-motions in the component, this hook shouldn't be present in setup().
      console.warn(
        `Could not find any motion in this component, are you using v-motion anywhere?`,
      )
    }
  })

  return motions
}
