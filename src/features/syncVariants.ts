import { ComputedRef, watch } from 'vue-demi'
import { Variant } from '../types'
import { MotionControls } from '../useMotionControls'

export function registerVariantsSync(
  currentVariant: ComputedRef<Variant | undefined>,
  { apply }: MotionControls,
) {
  // Watch for variant changes and apply the new one
  const stop = watch(
    currentVariant,
    (newVal: Variant | undefined, oldVal: Variant | undefined) => {
      if (newVal === oldVal) return

      // Current variant is undefined, just stop the current motions
      if (!newVal) return

      apply(newVal)
    },
    {
      immediate: true,
    },
  )

  return { stop }
}
