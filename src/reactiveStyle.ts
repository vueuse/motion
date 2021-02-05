import { computed, reactive } from 'vue-demi'
import { StyleProperties } from './types'
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

  // Reactive DOM Element compatible `style` object bound to state
  const style = computed<StyleProperties>(() => {
    // Init result object
    const result: StyleProperties = {}

    for (const [key, value] of Object.entries(state)) {
      // Get value type for key
      const valueType = getValueType(key)
      // Get value as type for key
      const valueAsType = getValueAsType(value, valueType)
      // Append the computed style to result object
      result[key] = valueAsType
    }

    return result
  })

  return {
    state,
    style,
  }
}
