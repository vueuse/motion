import { MaybeRef } from '@vueuse/shared'
import { ref } from 'vue'
import { useStyle } from './useStyle'
import { useTransform } from './useTransform'

export const useMotionProperties = (
  target: MaybeRef<HTMLElement | null | undefined>,
) => {
  const targetRef = ref(target)

  const { style } = useStyle(targetRef)

  const { transform } = useTransform(targetRef)

  return {
    style,
    transform,
  }
}
