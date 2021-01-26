import { ComputedRef, watch } from 'vue'
import { StyleProperties, TransformProperties, Variant } from './types/variants'

export const useMotionControls = (
  transform: TransformProperties,
  style: StyleProperties,
  currentVariant: ComputedRef<Variant | undefined>,
) => {
  const currentMotions: (() => void)[] = []

  watch(currentVariant, (newVal: Variant | undefined) => {
    stop()

    // Current variant is undefined, just stop the current motions
    if (!newVal) return
  })

  const stop = () => currentMotions.forEach((stop) => stop())

  return {
    stop,
  }
}
