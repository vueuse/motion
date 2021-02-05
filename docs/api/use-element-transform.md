# useElementTransform

useElementTransform is used to **sync** a reactive **object** to a **target** element **CSS transform**.

It uses [**reactiveTransform**](https://github.com/vueuse/motion/blob/main/src/reactiveTransform.ts) and bind it to a **target**.

## Parameters

- `target`

Target must be an element (**SVG** / **HTML**), or a reference to an element.

If the target **reference** is **updated**, the **current** transform will be **updated** from the new **element** styling.

## Exposed

- `transform`

Transform is the current `target` [**transform properties**](/motion-properties#transform-properties) as a **reactive** object.

When you **change** a value, it will **update** the **element** transform **property** accordingly.

- `stop()`

Stop function will **stop** the **watcher** that **sync** the element **transform** with the reactive object.

## Example

```typescript
const target = ref<HTMLElement>()

const { transform, stop } = useElementTransform(target)

transform.scale = 1.2
```
