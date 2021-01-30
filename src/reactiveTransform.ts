import { TransformProperties } from 'src/types/variants'
import { computed, reactive } from 'vue-demi'
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

  // Compute TransformProperties object into a valid CSS transform string
  const transform = computed<string>(() => {
    // Init result
    let result = ''

    // Init transformHasZ (used for GPU optimization)
    let transformHasZ = false

    // Loop on defined TransformProperties state keys
    for (const [key, value] of Object.entries(state)) {
      // Get value type for key
      const valueType = getValueType(key)
      // Get value as type for key
      const valueAsType = getValueAsType(value, valueType)
      // Append the computed transform key to result string
      result += `${translateAlias[key] || key}(${valueAsType}) `
      // Set transformHasZ is already defined in the state
      if (key === 'z' || key === 'translateZ') transformHasZ = true
    }

    if (!transformHasZ && enableHardwareAcceleration) {
      // Append hardware acceleration property if needed
      result += 'translateZ(0)'
    } else {
      // Trim the last space
      result = result.trim()
    }

    return result
  })

  return {
    state,
    transform,
  }
}
