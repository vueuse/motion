import { Variant } from '@lib/types/variants'
import { MotionControls } from '@lib/useMotionControls'
import { tryOnUnmounted } from '@vueuse/core'
import { ComputedRef, watch } from 'vue'

export function registerVariantsSync(
  currentVariant: ComputedRef<Variant | undefined>,
  { apply }: MotionControls,
) {
  // Watch for variant changes and apply the new one
  const stopVariantWatch = watch(
    currentVariant,
    (newVal: Variant | undefined, oldVal: Variant | undefined) => {
      if (newVal === oldVal) return

      stop()

      // Current variant is undefined, just stop the current motions
      if (!newVal) return

      apply(newVal)
    },
    {
      immediate: true,
    },
  )

  // Stop watchers on unmount
  tryOnUnmounted(() => {
    stopVariantWatch()
  })
}
