# useElementTransform

useElementTransform is the **composable** used to **sync** a reactive **object** to a **target** element **CSS transform**.

It uses [**reactiveTransform**](/api/reactive-transform) and bind it to a **target**.

## Parameters

- `target`

Target must be an element (**SVG** / **HTML**), or a reference to an element.

If the target **reference** is **updated**, the **current** transform will be **updated** from the new **element** styling.

```typescript
const target = ref<HTMLElement>()

const { transform, stop } = useElementTransform(target)

transform.scale = 1.2
```
