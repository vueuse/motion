# Variants

Variants represent an **animatable state** for your element.

They are composed of any [**Motion Properties**](/motion-properties) and an optional [**Transition Declaration**](/transitions).

```vue
<div
  v-motion
  :initial="{
    opacity: 0,
    y: 100,
  }"
  :enter="{
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: '100',
      delay: 100,
    },
  }"
/>
```

##### _This element will fade in smoothly after 100ms._ ☝️

## Initial Variant

The **initial** variant represents the **base state** of the focused element.

It combines with **:style**, and is applied at the **creation** of the element.

It is **recommended** to **include** a base state for **each parameter** that you are willing to **animate** using subsequent variants.

```vue
<div
  v-motion
  :initial="{
    opacity: 0,
    y: 100,
  }"
/>
```

##### _This element will be hidden, and 100px above of its original position._ ☝️

## Lifecycle Variants

### Enter

The **enter** variant will be applied on the second tick of the element, right after its creation.

You can use it to **trigger** an animation when the element **appears**, transitioning from [**Initial**](#initial-variant) variant.

```vue
<div
  v-motion
  :initial="{
    opacity: 0,
    y: 100,
  }"
  :enter="{
    opacity: 1,
    y: 0,
  }"
/>
```

##### _This element will fade in smoothly on page mount._ ☝️

### Leave

_This feature is currently work in progress._ 👷‍♂️

## Visibility Variants

### Visible

The **visible** variant will be applied when the element enters the viewport.

When the element leaves, the [**Initial**](#initial-variant) variant will be applied again.

```vue
<div
  v-motion
  :initial="{
    opacity: 0,
    y: 100,
  }"
  :enter="{
    opacity: 1,
    y: 0,
  }"
/>
```

##### _This element will fade in smoothly each times it enters the viewport._ ☝️

## Events Variants

Variants can also be used to **interact** with the **element** using **event listeners**.

These **event listeners** are **only** registered if you **specify** those **variants**.

Note that these variants won't be replacing the **current** variant of the element, but only alter it while the event are active.

A **meta-variant** will be **generated** by **combining** all the **active** ones, using the following **order**:

- Hovered (lowest priority)
- Focused
- Tapped (highest priority)

Doing this allows a **smoother transition** between each of these **states** and allows you to **interact** with elements **while** they're being **animated**.

### Hovered

A **regular hover** event listener, it will **not work** on **mobile** devices.

```vue
<div
  v-motion
  :initial="{
    scale: 1,
  }"
  :hovered="{
    scale: 1.2,
  }"
/>
```

##### _This element will scale up on hover._ ☝️

### Focused

A **regular focus** event listener.

```vue
<div
  v-motion
  :initial="{
    scale: 1,
  }"
  :focused="{
    scale: 1.1,
  }"
/>
```

##### _This element will scale up on focus._ ☝️

### Tapped

An event listener combining **mouse** and **touch** events **seamlessly**.

It will **switch** between them **depending** on the user **supported** pointer events.

```vue
<div
  v-motion
  :initial="{
    scale: 1,
  }"
  :tapped="{
    scale: 0.8,
  }"
/>
```

##### _This element will scale down on tap._ ☝️

## Custom variants

You can create your **own variants** and **apply** them using the **motion instance**.

```vue
<template>
  <div v-motion="'customElement'" :initial="{ scale: 1, }" :variants="{ custom:
  { scale: 2, transition: { type: "spring", stiffness: 100 } } }" />
</template>

<script setup>
import { useMotions } from '@vueuse/motion'

// Access the motion instance using useMotions.
const { customElement } = useMotions()

// Dummy custom event function
const yourCustomEvent = () => {
  // Edit the variant using the motion instance.
  customElement.variant.value = 'custom'
}
</script>
```

##### _A nice custom variant example._ ☝️
