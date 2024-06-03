export default defineComponent({
  setup() {
    const MotionComponent = resolveComponent('Motion')
    const slots = useSlots()

    return () => {
      const nodes: VNode[] = slots.default?.() || []

      return h(
        'ul',
        {
          // is: 'ul',
          'initial': { y: 100, opacity: 0 },
          'visible-once': { y: 0, opacity: 1 },
        },
        nodes.map((node, i) => {
          node.props ??= {}
          node.props.is = 'li'
          node.props.initial ??= { x: 100, opacity: 0 }
          node.props.hovered ??= {
            x: 10,
            opacity: 1,
            transition: { mass: 0.5, damping: 5, delay: 0 },
          }
          node.props['visible-once'] ??= {
            x: 0,
            opacity: 1,
            transition: { delay: 50 * i, mass: 0.5, damping: 5 },
          }

          // @ts-expect-error type conflict but seems to work fine
          return h(MotionComponent, { ...node.props }, node.children)
        }),
      )
    }
  },
})
