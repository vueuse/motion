import { px } from 'style-value-types'
import { reactive, ref, watch } from 'vue-demi'
import { TransformProperties } from './types'
import { getValueAsType, getValueType } from './utils/style'

/**
 * Aliases translate key for simpler API integration.
 */
const translateAlias: { [key: string]: string } = {
  x: 'translateX',
  y: 'translateY',
  z: 'translateZ',
}

/**
 * Reactive transform string implementing all native CSS transform properties.
 *
 * @param props
 * @param enableHardwareAcceleration
 */
export function reactiveTransform(
  props: TransformProperties = {},
  enableHardwareAcceleration: boolean = true,
) {
  // Reactive TransformProperties object
  const state = reactive<TransformProperties>({ ...props })

  const transform = ref('')

  watch(
    state,
    (newVal) => {
      // Init result
      let result = ''
      let hasHardwareAcceleration = false

      // Use translate3d by default has a better GPU optimization
      // And corrects scaling discrete behaviors
      if (enableHardwareAcceleration && (newVal.x || newVal.y || newVal.z)) {
        const str = [newVal.x || 0, newVal.y || 0, newVal.z || 0]
          .map(px.transform as any)
          .join(',')

        result += `translate3d(${str}) `

        hasHardwareAcceleration = true
      }

      // Loop on defined TransformProperties state keys
      for (const [key, value] of Object.entries(newVal)) {
        if (
          enableHardwareAcceleration &&
          (key === 'x' || key === 'y' || key === 'z')
        )
          continue

        // Get value type for key
        const valueType = getValueType(key)
        // Get value as type for key
        const valueAsType = getValueAsType(value, valueType)
        // Append the computed transform key to result string
        result += `${translateAlias[key] || key}(${valueAsType}) `
      }

      if (enableHardwareAcceleration && !hasHardwareAcceleration) {
        result += `translateZ(0px) `
      }

      transform.value = result.trim()
    },
    {
      immediate: true,
      deep: true,
    },
  )

  return {
    state,
    transform,
  }
}
