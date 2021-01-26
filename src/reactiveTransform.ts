import { TransformProperties } from 'src/types/variants'
import { computed, reactive } from 'vue-demi'
import { getValueAsType, getValueType } from './utils/style'

const translateAlias: { [key: string]: string } = {
  x: 'translateX',
  y: 'translateY',
  z: 'translateZ',
}

export const reactiveTransform = (
  props: TransformProperties = {},
  enableHardwareAcceleration: boolean = true,
) => {
  const state = reactive<TransformProperties>({ ...props })

  const transform = computed<string>(() => {
    let result = ''

    let transformHasZ = false

    for (const [key, value] of Object.entries(state)) {
      const valueType = getValueType(key)
      const valueAsType = getValueAsType(value, valueType)
      result += `${translateAlias[key] || key}(${valueAsType}) `

      if (key === 'z') transformHasZ = true
    }

    if (!transformHasZ && enableHardwareAcceleration) {
      result += 'translateZ(0)'
    } else {
      result = result.trim()
    }

    return result
  })

  return {
    state,
    transform,
  }
}
