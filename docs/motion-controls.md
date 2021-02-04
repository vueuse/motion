# Motion Controls

Motion controls are the **object** exposed when **binding** to a target **element**.

It is composed of **three properties**, allowing you to **interact** with the **element**.

## Variant

The variant is a **string reference**, that you can **modify** and **watch**.

It represents the **current variant** name of the **element**.

By modifying this **variant**, you will trigger a **transition** between the **current** variant and the one you just **set**.

```vue
<script setup>
// Define target.
const target = ref<HTMLElement>()

// Get the variant from target motion controls.
const { variant } = useMotion(target, {
    initial: {
        scale: 1,
        opacity: 0,
    },
    enter: {
        opacity: 1
    },
    custom: {
        scale: 2,
        transition: {
            type: spring,
            damping: 100
        }
    }
})

const customEvent = () => {
    // Animate to custom variant.
    variant.value = 'custom'
}
</script>
```

##### _Call customEvent to enable the custom variant_ ☝️

## Apply

Apply is a **method** that lets you **animate** to a **variant** definition, **without changing** the current **variant**.

This is useful when used with **event listeners**, or any **temporary** modification to the **motion** properties of the **element**.

```vue
<script setup>
// Define target.
const target = ref<HTMLElement>()

// Get the variant from target motion controls.
const { apply } = useMotion(target, {
    initial: {
        scale: 1,
        opacity: 0,
    },
    enter: {
        opacity: 1
    }
})

const customEvent = () => {
    // Animate to a temporary variant.
    apply({
        scale: 2,
        transition: {
            type: spring,
            damping: 100
        }
    })
}
</script>
```

##### _Call customEvent to Zboing the element_ ☝️

## Stop

Stop is a **method** that lets you **stop** all the **ongoing** animations for a specific **element**.

```vue
<script setup>
// Define target.
const target = ref<HTMLElement>()

// Get the variant from target motion controls.
const { stop } = useMotion(target, {
    initial: {
        scale: 1,
        opacity: 0,
    },
    visible: {
        opacity: 1
    }
})

const customEvent = () => {
    // Stop the current animations.
    stop()
}
</script>
```

##### _Call customEvent to stop the animations_ ☝️
