import { TransformProperties } from 'src/types'
import { computed, reactive } from 'vue-demi'

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
      result += `${translateAlias[key] || key}(${value}) `

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
