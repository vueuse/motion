import { isHTMLTag } from '@vue/shared'
import type { Component, PropType } from 'vue-demi'
import { defineComponent, h, resolveComponent } from 'vue-demi'

export default defineComponent({
  props: {
    is: {
      type: [String, Object] as PropType<string | Component>,
      required: true,
    },
  },
  setup(props, ctx) {
    // Return empty component is `is` is absent
    if (!props.is) return () => h('div', {})

    let component = props.is
    if (typeof component === 'string' && !isHTMLTag(component)) {
      try {
        component = resolveComponent(component)
      }
      catch (e) {}
    }

    return () => {
      const comp = h(component || props.is as any, {
        ...ctx.attrs,
      })

      return comp
    }
  },
})
