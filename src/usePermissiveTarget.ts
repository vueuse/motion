import { watch } from 'vue'
import { unrefElement } from '@vueuse/core'
import type { MaybeRef } from 'vue'
import type { PermissiveTarget } from './types'

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
