import type { Component, PropType, VNode } from 'vue'

import { Fragment, defineComponent, h, useSlots } from 'vue'
import { variantToStyle } from '../utils/transform'
import { MotionComponentProps, setupMotionComponent } from '../utils/component'

export default defineComponent({
  name: 'MotionGroup',
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
        const n = nodes[i]

        // Recursively assign fragment child nodes
        if (n.type === Fragment && Array.isArray(n.children)) {
          n.children.forEach(function setChildInstance(child, index) {
            if (child == null)
              return

            if (Array.isArray(child)) {
              setChildInstance(child, index)
              return
            }

            if (typeof child === 'object') {
              setNodeInstance(child, index, style)
            }
          })
        }
        else {
          setNodeInstance(n, i, style)
        }
      }

      // Wrap child nodes in component if `props.is` is passed
      if (props.is) {
        return h(props.is, undefined, nodes)
      }

      return nodes
    }
  },
})
