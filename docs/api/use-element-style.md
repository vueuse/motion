# useElementStyle

useElementStyle is used to **sync** a reactive **object** to a **target** element **CSS styling**.

It uses [**reactiveStyle**](/api/reactive-style) and bind it to a **target**.

## Parameters

- `target`

Target must be an element (**SVG** / **HTML**), or a reference to an element.

If the target **reference** is **updated**, the **current** style will be **updated** from the new **element** styling.

```typescript
const target = ref<HTMLElement>()

const { style, stop } = useElementStyle(target)

style.opacity = 0
```
