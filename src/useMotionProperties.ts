import { MaybeRef } from '@vueuse/shared'
import { ref } from 'vue'
import { useStyle } from './useStyle'
import { useTransform } from './useTransform'

/**
 * A Composable giving access to both `transform` and `style`objects for a single element.
 *
 * @param target
 */
export function useMotionProperties(
  target: MaybeRef<HTMLElement | null | undefined>,
) {
  // Target element ref
  const targetRef = ref(target)

  // Target element style object
  const { style } = useStyle(targetRef)

  // Target element transform object
  const { transform } = useTransform(targetRef)

  return {
    style,
    transform,
  }
}
