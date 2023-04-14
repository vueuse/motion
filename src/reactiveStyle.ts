import type { Ref } from 'vue-demi'
import { reactive, ref, watch } from 'vue-demi'
import type { MotionProperties } from './types'
import { getValueAsType, getValueType } from './utils/style'

/**
 * Reactive style object implementing all native CSS properties.
 *
 * @param props
 */
export function reactiveStyle(props: MotionProperties = {}) {
  // Reactive StyleProperties object
  const state = reactive<MotionProperties>({
    ...props,
  })

  const style = ref({}) as Ref<MotionProperties>

  // Reactive DOM Element compatible `style` object bound to state
  watch(
    state,
    () => {
      // Init result object
      const result: MotionProperties = {}

      for (const [key, value] of Object.entries(state)) {
        // Get value type for key
        const valueType = getValueType(key)
        // Get value as type for key
        const valueAsType = getValueAsType(value, valueType)
        // Append the computed style to result object
        result[key as keyof MotionProperties] = valueAsType
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
  } as {
    state: MotionProperties
    style: Ref<MotionProperties>
  }
}
