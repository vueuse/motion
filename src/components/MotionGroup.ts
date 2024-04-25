import type { PropType, VNode } from 'vue'
import type { Component } from '@nuxt/schema'

import { defineComponent, h, useSlots } from 'vue'
import { variantToStyle } from '../utils/transform'
import { MotionComponentProps, setupMotionComponent } from '../utils/component'

export default defineComponent({
  props: {
    ...MotionComponentProps,
    is: {
      type: [String, Object] as PropType<string | Component>,
      required: false,
    },
  },
  setup(props) {
    const slots = useSlots()

    const { motionConfig, setNodeInstance } = setupMotionComponent(props)

    return () => {
      const style = variantToStyle(motionConfig.value.initial || {})
      const nodes: VNode[] = slots.default?.() || []

      // Set node style on slots and register to `instances` on mount
      for (let i = 0; i < nodes.length; i++) {
        setNodeInstance(nodes[i], i, style)
      }

      // Wrap child nodes in component if `props.is` is passed
      if (props.is) {
        return h(props.is, undefined, nodes)
      }

      return nodes
    }
  },
})
