# useMotion

useMotion is the **core** composable of this **package**.

This composable **imports** every other **composable** and **expose** a **motion instance**.

[**useMotionProperties**](/api/use-motion-properties) is used to make the **element** styling properties **reactive**.

[**useMotionTransitions**](/api/use-motion-transitions) is used to manage **transitions** scheduling and **execution**.

[**useMotionVariants**](/api/use-motion-variants) is used to handle **variants** and variant **selection**.

[**useMotionControls**](/api/use-motion-controls) is used to create motion **controls** from variants, properties and transitions.

[**useMotionFeatures**](/api/use-motion-features) is used to register **lifecycle** hooks bindings, **visibility** and **events** listeners.

## Parameters

- `target`

Target must be an element (**SVG** / **HTML**), or a reference to an element.

If the target **reference** is **updated**, the **current** variant will be **applied** to the new **element**.

```typescript
const target = ref<HTMLElement>()

const motionControls = useMotion(target)
```

- `variants`

**Variants** must be an **object** or an object **reference**.

Keys are **variants** names, values are [**variants declarations**](/variants).

```typescript
const target = ref<HTMLElement>()

const variants: MotionVariants = ref({
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 1
    }
})

const motionControls = useMotion(target, variants)
```

- `options`

Options is an **object**, supporting **4** parameters:

1. `syncVariants` (boolean): Whether or not the variants will be synchronized on update.
2. `lifeCycleHooks` (boolean): Whether or not the lifecycle hooks will be followed.
3. `visibilityHooks` (boolean): Whether or not the visibility hooks will be applied.
4. `eventListeners` (boolean): Whether or not the event listeners will be registered.

You should **not** be **pushed** to use those **options**, as if you are **not declaring** the related **variants**, they will **not** be **registered** anyway.

```typescript
const target = ref<HTMLElement>()

const variants: MotionVariants = ref({
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 1
    }
})

const motionControls = useMotion(target, variants)
```
