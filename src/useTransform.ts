import { computed, reactive } from 'vue-demi'
import { TransformProperties } from './types'

export const useTransform = (
  props: TransformProperties,
  enableHardwareAcceleration: boolean = true,
) => {
  const state = reactive({ ...props })

  const transform = computed(() => {
    let result = ''

    let transformHasZ = false

    for (const [key, value] of Object.entries(state)) {
      result += `${key}(${value}) `

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
