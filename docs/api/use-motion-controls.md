# useMotionControls

useMotionControls is used to **create** motion **controls** from motion **properties** and motions **transitions**.

[**Motion Instance**](/motion-instance) members are **helpers** for you to **interact** with your **element** motion **properties** with ease.

## Parameters

### `motionProperties`

A [**Motion Properties**](/api/use-motion-properties) instance.

### `variants`

A [**Variants**](/variants#custom-variants) definition.

### `motionTransitions`

A [**Motion Transitions**](/api/use-motion-transitions) instance.

## Exposed

### `apply(variant)`

Apply function will take a [**Variant Definition**](/variants) and **apply** it to the element **without** changing the **current** variant **value**.

It also **accepts** a variant **key** from **variants** parameter, that will be applied **without** changing the **current** variant **name**.

Apply is a **promise** that will be **resolved** once all the **transitions** resulting from the **variant** you passed are **done**.

#### Example

```typescript
const target = ref<HTMLElement>()

const { motionProperties } = useMotionProperties(target)

const { apply } = useMotionControls(motionProperties)

apply({
  opacity: 1,
  scale: 2,
})
```

```typescript
const target = ref<HTMLElement>()

const { apply } = useMotion(target, {
  initial: {
    y: 100,
    opacity: 0,
  },
  custom: {
    y: 0,
    opacty: 1,
  },
})

const applyCustom = async () => {
  await apply('custom')

  console.log('Custom applied!')
}
```

### `set(variant)`

Set function will take a [**Variant Definition**](/variants) and **apply** it to the element **without** changing the **current** variant **value**.

It also **accepts** a variant **key** from **variants** parameter, that will be applied **without** changing the **current** variant **name**.

It differs from `apply(variant)` as it will **set** values on target **without** running any **transitions**.

### `stopTransitions()`

Stop Transitions function will **stop** all **ongoing** transitions on the **current** [**useMotionTransitions**](/api/use-motion-transitions) instance.

```typescript
const target = ref<HTMLElement>()

const { motionProperties } = useMotionProperties(target)

const { apply, stopTransitions } = useMotionControls(motionProperties)

apply({
  opacity: 1,
  scale: 2,
})

setTimeout(() => {
  stopTransitions()

  console.log('Stopped after 200ms!')
}, 200)
```
