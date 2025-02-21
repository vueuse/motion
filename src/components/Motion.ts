import type { Component } from '@nuxt/schema'
import type { PropType } from 'vue'

import { defineComponent, h, useSlots } from 'vue'
import { MotionComponentProps, setupMotionComponent } from '../utils/component'
import { variantToStyle } from '../utils/transform'

export default defineComponent({
  name: 'Motion',
  props: {
    ...MotionComponentProps,
    is: {
      type: [String, Object] as PropType<string | Component>,
      default: 'div',
    },
  },
  setup(props) {
    const slots = useSlots()

    const { motionConfig, setNodeInstance } = setupMotionComponent(props)

    return () => {
      const style = variantToStyle(motionConfig.value.initial || {})
      const node = h(props.is, undefined, slots)

      setNodeInstance(node, 0, style)

      return node
    }
  },
})
