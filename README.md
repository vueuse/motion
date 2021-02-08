# 🤹 vue-use-motion

[![npm](https://img.shields.io/npm/v/@vueuse/motion.svg)](https://www.npmjs.com/package/@vueuse/motion)
[![npm](https://img.shields.io/npm/dm/@vueuse/motion.svg)](https://npm-stat.com/charts.html?package=@vueuse/motion)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ab1db459-8420-4bc6-9fac-2bc247fa2385/deploy-status)](https://app.netlify.com/sites/vue-use-motion/deploys)

**Vue Composables** putting your **components** in **motion**

[🧩] Written in **TypeScript**.
[🏎] **Smooth animations** based on [**Popmotion**](https://popmotion.io/).
[🎮] **Declarative** API.
[🤟] Vue **2** & **3** support using [**vue-demi**](https://github.com/antfu/vue-demi).
[🏋️‍♀️] Lightweight with **<15kb** bundle size

[🌍 **Documentation**](https://vue-use-motion.netlify.app)

This repository is still **experimental**, the **API** might be subject to **changes**.

Last update: **08/02/2021**

## Quick Start

Let's **get started** quick by **installing** the **package** and adding the **plugin**.

From your **terminal**:

```bash
yarn add @vueuse/motion
```

In your **Vue** app **entry** file:

```javascript
import { createApp } from 'vue-demi'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'

const app = createApp(App)

app.use(MotionPlugin)

app.mount('#app')
```

You can now **animate** any of your **component**, **HTML** or **SVG** elements using `v-motion`.

```vue
<template>
  <div
    v-motion="'smoothestDiv'"
    :initial="{
      opacity: 0,
      y: 100,
    }"
    :enter="{
      opacity: 1,
      y: 0,
    }"
  />
</template>

<script setup>
import { useMotions } from '@vueuse/motion'

// Get access to motion controls using useMotions
const { smoothestDiv } = useMotions()

// From smoothest div to biggest div real quick 😎
smoothestDiv.apply({ scale: 4 })
</script>
```

If you want to know more about what **properties** you can **animate**, consider taking a look at [**Motion Properties**](https://vue-use-motion.netlify.app/motion-properties).

If you want to know more about how to **create** your own **animations** styles, consider taking a look at [**Transition Properties**](https://vue-use-motion.netlify.app/transition-properties).

If you want to know more about what are **variants** and how you can **use** them, consider taking a look at [**Variants**](https://vue-use-motion.netlify.app/variants).

If you want to know more about how to **control** your declared **variants**, consider taking a look at [**Motion Controls**](https://vue-use-motion.netlify.app/motion-controls).

## Credits

This package is **heavily** inspired by [**Framer Motion**](https://www.framer.com/motion/).

I would also like to **thank** [**antfu**](https://github.com/antfu) and [**patak**](https://twitter.com/patak_js) for their kind help!

If you **like** this package, consider **following me** on [**GitHub**](https://github.com/Tahul) and on [**Twitter**](https://twitter.com/yaeeelglx).

👋
