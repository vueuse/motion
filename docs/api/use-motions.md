# useMotions

useMotions is used to **access** the **motion controls** from v-motion directives **declared** from **templates**.

If you **declare** a **name** using `v-motion` attribute **value**, the **motion controls** will be added to the **global** useMotions **state** and be **accessible** from any **component**.

Be **careful** about **duplicating** the same **name**, note that the **name** can be including a **variable**.

```vue
<template>
    <div v-motion="'myName'">
</template>

<script setup>
import { useMotions } from '@vueuse/motions'

const { myName } = useMotions()
</script>
```