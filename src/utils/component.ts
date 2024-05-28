import { type ExtractPropTypes, type PropType, type VNode, computed, nextTick, onUpdated, reactive } from 'vue'
import type { LooseRequired } from '@vue/shared'
import defu from 'defu'
import * as presets from '../presets'
import type { MotionInstance } from '../types/instance'
import type { MotionVariants, StyleProperties, Variant } from '../types/variants'
import { useMotion } from '../useMotion'

/**
 * Type guard, checks if passed string is an existing preset
 */
const isPresetKey = (val: string): val is keyof typeof presets => val in presets

/**
 * Shared component props for <Motion> and <MotionGroup>
 */
export const MotionComponentProps = {
  // Preset to be loaded
  preset: {
    type: String as PropType<keyof typeof presets>,
    validator: (val: string) => isPresetKey(val),
    required: false,
  },
  // Instance
  instance: {
    type: Object as PropType<MotionInstance<string, MotionVariants<string>>>,
    required: false,
  },
  // Variants
  variants: {
    type: Object as PropType<MotionVariants<string>>,
    required: false,
  },
  // Initial variant
  initial: {
    type: Object as PropType<Variant>,
    required: false,
  },
  // Lifecycle hooks variants
  enter: {
    type: Object as PropType<Variant>,
    required: false,
  },
  leave: {
    type: Object as PropType<Variant>,
    required: false,
  },
  // Intersection observer variants
  visible: {
    type: Object as PropType<Variant>,
    required: false,
  },
  visibleOnce: {
    type: Object as PropType<Variant>,
    required: false,
  },
  // Event listeners variants
  hovered: {
    type: Object as PropType<Variant>,
    required: false,
  },
  tapped: {
    type: Object as PropType<Variant>,
    required: false,
  },
  focused: {
    type: Object as PropType<Variant>,
    required: false,
  },
  // Helpers
  delay: {
    type: [Number, String] as PropType<number | string>,
    required: false,
  },
  duration: {
    type: [Number, String] as PropType<number | string>,
    required: false,
  },
}

/**
 * Shared logic for <Motion> and <MotionGroup>
 */
export function setupMotionComponent(props: LooseRequired<ExtractPropTypes<typeof MotionComponentProps>>) {
  // Motion instance map
  const instances = reactive<{ [key: number]: MotionInstance<string, MotionVariants<string>> }>({})

  // Preset variant or empty object if none is provided
  const preset = computed(() => (props.preset ? structuredClone(presets[props.preset]) : {}))

  // Motion configuration using inline prop variants (`:initial` ...)
  const propsConfig = computed(() => ({
    initial: props.initial,
    enter: props.enter,
    leave: props.leave,
    visible: props.visible,
    visibleOnce: props.visibleOnce,
    hovered: props.hovered,
    tapped: props.tapped,
    focused: props.focused,
  }))

  // Merged motion configuration using `props.preset`, inline prop variants (`:initial` ...), and `props.variants`
  const motionConfig = computed(() => {
    const config = defu({}, propsConfig.value, preset.value, props.variants || {})

    for (const transitionKey of ['delay', 'duration'] as const) {
      if (!props[transitionKey])
        continue

      const transitionValueParsed = Number.parseInt(props[transitionKey] as string)

      // TODO: extract to utility function
      // Apply transition property to existing variants where applicable
      for (const variantKey of ['enter', 'visible', 'visibleOnce'] as const) {
        const variantConfig = config[variantKey]

        if (variantConfig == null)
          continue

        variantConfig.transition ??= {}
        // @ts-expect-error `duration` does not exist on `inertia` type transitions
        variantConfig.transition[transitionKey] = transitionValueParsed
      }
    }

    return config
  })

  // Replay animations on component update Vue
  if (import.meta.env.DEV) {
    const replayAnimation = (instance: MotionInstance<any, any>) => {
      if (instance.variants?.initial) {
        instance.set('initial')
      }

      nextTick(() => {
        if (instance.variants?.enter)
          instance.apply('enter')
        if (instance.variants?.visible)
          instance.apply('visible')
        if (instance.variants?.visibleOnce)
          instance.apply('visibleOnce')
      })
    }

    onUpdated(() => {
      for (const key in instances) {
        replayAnimation(instances[key])
      }
    })
  }

  // Set node style and register to `instances` on mount
  function setNodeInstance(node: VNode, index: number, style: StyleProperties) {
    node.props ??= {}
    node.props.style ??= {}

    // Merge node style with variant style
    node.props.style = { ...node.props.style, ...style }

    // Track motion instance locally using `instances`
    node.props.onVnodeMounted = ({ el }) => {
      instances[index] = useMotion<string, MotionVariants<string>>(el as any, motionConfig.value)
    }

    return node
  }

  return {
    motionConfig,
    setNodeInstance,
  }
}
