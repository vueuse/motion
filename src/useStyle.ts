import { MaybeRef } from '@vueuse/shared'
import { ref, watch } from 'vue'
import { reactiveStyle } from './reactiveStyle'
import { valueTypes } from './utils/style'

/**
 * A Composable giving access to a StyleProperties object, and binding the generated style object to a target.
 *
 * @param target
 */
export function useStyle(target: MaybeRef<HTMLElement | null | undefined>) {
  // Target element ref
  const targetRef = ref(target)

  // Create a reactive style object
  const { state, style } = reactiveStyle()

  // Sync existing style from supplied element
  watch(
    targetRef,
    (newVal: HTMLElement | null | undefined) => {
      if (!newVal || !newVal.style) return

      // Loop on style keys
      for (const key of Object.keys(valueTypes)) {
        if (
          newVal.style[key] === undefined ||
          newVal.style[key] === null ||
          newVal.style[key] === ''
        )
          continue

        // Append a defined key to the local StyleProperties state object
        state[key] = newVal.style[key]
      }
    },
    {
      immediate: true,
    },
  )

  // Sync reactive style to element
  watch(
    style,
    (newValue) => {
      if (!targetRef || !targetRef.value || !newValue) return

      // Append the state object to the target style properties
      Object.assign(targetRef.value.style, newValue)
    },
    {
      immediate: true,
    },
  )

  return {
    style: state,
  }
}
