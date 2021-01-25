import { MaybeRef } from '@vueuse/shared'
import { animate } from 'popmotion'
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'
import { MotionVariants, Variant } from './types'
import { useMotionProperties } from './useMotionProperties'
import { isTransformProp } from './utils/transform'

export const useMotion = (
  target: MaybeRef<HTMLElement | null | undefined>,
  variants: MotionVariants = {},
) => {
  const currentMotions: (() => void)[] = []

  const targetRef = ref(target)

  const { style, transform } = useMotionProperties(targetRef)

  const applyVariant = (variant: Variant, instant = false) => {
    currentMotions.forEach((stop) => stop())

    Object.entries(variant).forEach(([key, value]) => {
      if (isTransformProp(key)) {
        instant
          ? // @ts-expect-error
            (transform[key] = value)
          : currentMotions.push(
              animate({
                // @ts-expect-error
                from: transform[key] || 0,
                to: value,
                type: 'spring',
                ...variant.spring,
                // @ts-expect-error
                onUpdate: (latest) => (transform[key] = latest + 'px'),
              }).stop,
            )
      } else {
        instant
          ? // @ts-expect-error
            (style[key] = value)
          : currentMotions.push(
              animate({
                // @ts-expect-error
                from: style[key] || 0,
                to: value,
                type: 'spring',
                ...variant.spring,
                // @ts-expect-error
                onUpdate: (latest) => (style[key] = latest),
              }).stop,
            )
      }
    })
  }

  if (variants.initial)
    onBeforeMount(() => applyVariant(variants.initial, true))

  if (variants.enter) onMounted(() => applyVariant(variants.enter))

  if (variants.exit) onBeforeUnmount(() => applyVariant(variants.exit))
}
