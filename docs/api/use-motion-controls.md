# useMotionControls

useMotionControls is used to **create** motion **controls** from motion **properties** and motions **transitions**.

[**Motion Instance**](/motion-instance) members are **helpers** for you to **interact** with your **element** motion **properties** with ease.

## Parameters

- `motionProperties`

A [**Motion Properties**](/api/use-motion-properties) instance.

- `motionTransitions`

A [**Motion Transitions**](/api/use-motion-transitions) instance.

## Exposed

- `apply(variant)`

Apply function will take a [**Variant Definition**](/variants) and **apply** it to the element **without** changing the **current** variant **value**.

## Example

```typescript
const target = ref<HTMLElement>()

const { motionProperties } = useMotionProperties(target)

const { apply } = useMotionControls(motionProperties)

apply({
  opacity: 1,
  scale: 2,
})
```
