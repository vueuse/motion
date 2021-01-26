import { ComputedRef, watch } from 'vue'
import { StyleProperties, TransformProperties, Variant } from './types'

export const useMotionControls = (
  transform: TransformProperties,
  style: StyleProperties,
  currentVariant: ComputedRef<Variant | undefined>,
) => {
  const currentMotions: (() => void)[] = []

  watch(currentVariant, (newVal: Variant) => {
    stop()

    // Run animations
  })

  const stop = () => currentMotions.forEach((stop) => stop())

  return {
    stop,
  }
}
