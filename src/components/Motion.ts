import { isHTMLTag } from '@vue/shared'
import type { Component, PropType, VNode } from 'vue'
import { computed, defineComponent, h, onUpdated, reactive, resolveComponent, useSlots } from 'vue'
import type { MotionVariants, Variant } from '../types/variants'
import { useMotion } from '../useMotion'
import { variantToStyle } from '../utils/transform'
import * as presets from '../presets'
import type { MotionInstance } from './../types/instance'

export default defineComponent({
  props: {
    // eslint-disable-next-line vue/no-reserved-props
    is: {
      type: [String, Object] as PropType<string | Component>,
      required: false,
    },
    // Preset to be loaded
    preset: {
      type: String,
      required: false,
    },
    // Instance
    instance: {
      type: Object as PropType<MotionInstance>,
      required: false,
    },
    // Variants
    variants: {
      type: Object as PropType<MotionVariants>,
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
  },
  setup(props) {
    const slots = useSlots()

    // Instance map from component content
    const instances = reactive<{ [key: number]: MotionInstance<any> }>({})

    // Return empty component is `is` is absent
    if (!props.is && !slots.default) return () => h('div', {})

    // Preset used
    const _preset = computed(() => {
      let preset
      if (props.preset) preset = presets[props.preset]
      return preset
    })

    // Configuration from inline props (:initial ...)
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

    // Merged useMotion configuration
    const motionConfig = computed(() => {
      const config = {
        ...propsConfig.value,
        ...(_preset.value || {}),
        ...(props.variants || {}),
      }

      if (props.delay) {
        config.enter.transition = { ...config.enter.transition } || {}
        config.enter.transition.delay = parseInt(props.delay as string)
      }
      return config
    })

    // Component to render if `is` is present
    const component = computed(() => {
      if (!props.is) return

      let comp = props.is

      if (typeof component.value === 'string' && !isHTMLTag(comp as string)) {
        comp = resolveComponent(comp as string)
      }

      return comp
    })

    // Replay animations on component update Vue
    if (process?.env?.NODE_ENV === 'development' || (process as any)?.dev) {
      const replayAnimation = (instance: MotionInstance<any>) => {
        if (instance.variants?.initial) instance.set('initial')
        setTimeout(() => {
          if (instance.variants?.enter) instance.apply('enter')
          if (instance.variants?.visible) instance.apply('visible')
          if (instance.variants?.visibleOnce) instance.apply('visibleOnce')
        }, 10)
      }

      onUpdated(() => Object.entries(instances).forEach(([_, value]) => replayAnimation(value)))
    }

    return {
      slots,
      component,
      motionConfig,
      instances,
    }
  },
  render({ slots, motionConfig, instances, component }: any) {
    const style = variantToStyle(motionConfig.initial || {})

    // Apply styling to node and useMotion on mounted hook
    const setNode = (node: VNode, index: number) => {
      if (!node.props) node.props = {}

      node.props.style = style

      node.props.onVnodeMounted = ({ el }) => {
        const instance = useMotion(el as any, motionConfig)
        instances[index] = instance
      }

      return node
    }

    if (component) {
      const node = h(component, undefined, slots)

      setNode(node, 0)

      return node
    }

    const nodes: VNode[] = slots.default?.() || []

    return nodes.map((node, index) => setNode(node, index))
  },
})
