# useElementStyle

useElementStyle is used to **sync** a reactive **object** to a **target** element **CSS styling**.

It uses [**reactiveStyle**](https://github.com/vueuse/motion/blob/main/src/reactiveStyle.ts) and bind it to a **target**.

## Parameters

- `target`

Target must be an element (**SVG** / **HTML**), or a reference to an element.

If the target **reference** is **updated**, the **current** style will be **updated** from the new **element** styling.

## Exposed

- `style`

Style is the current `target` [**Style Properties**](/motion-properties#style-properties) as a **reactive** object.

When you **change** a value, it will **update** the **element** style **property** accordingly.

- `stop()`

Stop function will **stop** the **watcher** that **sync** the element **style** with the reactive object.

## Example

```typescript
const target = ref<HTMLElement>()

const { style, stop } = useElementStyle(target)

style.opacity = 0
```
