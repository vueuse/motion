import type { Ref } from 'vue'
import { reactive, ref, watch } from 'vue'
import type { StyleProperties } from './types'
import { getValueAsType, getValueType } from './utils/style'

/**
 * Reactive style object implementing all native CSS properties.
 *
 * @param props
 */
export function reactiveStyle(props: StyleProperties = {}) {
  // Reactive StyleProperties object
  const state = reactive<StyleProperties>({
    ...props,
  })

  const style = ref({}) as Ref<StyleProperties>

  // Reactive DOM Element compatible `style` object bound to state
  watch(
    state,
    () => {
      // Init result object
      interface Result {
        [key: string]: any
      }
      const result: Result = {}

      for (const [key, value] of Object.entries(state)) {
        // Get value type for key
        const valueType = getValueType(key)
        // Get value as type for key
        const valueAsType = getValueAsType(value, valueType)
        // Append the computed style to result object
        result[key] = valueAsType
      }

      style.value = result
    },
    {
      immediate: true,
      deep: true,
    },
  )

  return {
    state,
    style,
  }
}
