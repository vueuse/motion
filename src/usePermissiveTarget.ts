import type { MaybeRef } from '@vueuse/shared'
import type { PermissiveTarget } from './types'
import { unrefElement } from '@vueuse/core'
import { watch } from 'vue'

export function usePermissiveTarget(target: MaybeRef<PermissiveTarget>, onTarget: (target: HTMLElement | SVGElement) => void) {
  watch(
    () => unrefElement(target),
    (el) => {
      if (!el)
        return

      onTarget(el)
    },
    {
      immediate: true,
    },
  )
}
