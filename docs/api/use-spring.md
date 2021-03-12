# useSpring

**useSpring** is a simpler hook than [**useMotion**](/api/use-motion).

It has been **implemented** in order for you to implement **Spring animations** in your apps, without the pain.

**useSpring** can be bound to a **HTML** or **SVG** element, or to a **simple object**.

It skips the [**Variants**](/variants) system, allowing it to be as **performant** as using **Popmotion** natively, but with a nicer **API**.

## Parameters

### `target`

Target can be an element (**SVG** / **HTML**), or an **object**.

### `spring`

The spring argument takes a [**Spring definition**](https://popmotion.io/#quick-start-animation-animate-spring-options) from **Popmotion**.

It is **optional** as a **default** Spring will be **applied** if you do not specify it.

## Exposed

### `values`

Values are an **object** representing the **current state** from your **Spring animations**.

### `set`

Set is **function** allowing you to **mutate** the **values** with the **transition** specified as **spring** parameter.

### `stop`

Stop is a **function** allowing you to stop all the ongoing **animations** for the **spring**.

## Example

```typescript
const target = ref<HTMLElement>()

const { set, values, stop } = useSpring(target, {
  damping: 50,
  stiffness: 220,
})

const onClick = () => {
  set({
    scale: 2,
  })
}

const onClickOut = () => {
  set({
    scale: 1,
  })
}

const stopTransitions = () => {
  stop()
}
```
