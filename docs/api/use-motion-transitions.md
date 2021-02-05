# useMotionTransitions

useMotionTransitions is used to **handle** the multiple **animations** created when you animate your **elements**.

It exposes `push` and `stop` which are both **functions**.

## Exposed

- `push(key, value, target, transition)`

Push function **run** and **add** a transition to the current useMotionTransitions **instance**.

- `stop()`

Stop function **reset** the current transition **instance** by looping on all current animations and **stopping** them all.

Once each **animation** has been **stopped**, it resets the current animations array.

## Example

```typescript
const target = ref<HTMLElement>()

const { motionProperties } = useMotionProperties(target)

motionProperties.x = 0

const { push, stop } = useMotionTransitions()

push('x', 100, motionProperties, { type: 'spring', bounce: 4 })

setTimeout(stop, 4000)
```
