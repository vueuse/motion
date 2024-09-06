# 🤹 @vueuse/motion

[![npm](https://img.shields.io/npm/v/@vueuse/motion.svg)](https://www.npmjs.com/package/@vueuse/motion)
[![npm](https://img.shields.io/npm/v/vueuse-motion-nightly.svg)](https://www.npmjs.com/package/vueuse-motion-nightly)
[![npm](https://img.shields.io/npm/dm/@vueuse/motion.svg)](https://npm-stat.com/charts.html?package=@vueuse/motion)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ab1db459-8420-4bc6-9fac-2bc247fa2385/deploy-status)](https://app.netlify.com/sites/vueuse-motion/deploys)

Vue Composables putting your components in motion

- 🏎 **Smooth animations** based on [Popmotion](https://popmotion.io/)
- 🎮 **Declarative** API inspired by [Framer Motion](https://www.framer.com/motion/)
- 🚀 **Plug** & **play** with **20+ presets**
- 🌐 **SSR Ready**
- 🚚 First-class support for **Nuxt 3**
- ✨ Written in **TypeScript**
- 🏋️‍♀️ Lightweight with **<20kb** bundle size

[🌍 Documentation](https://motion.vueuse.org)

[👀 Demos](https://vueuse-motion-demo.netlify.app)

## Quick Start

Let's get started by installing the package and adding the plugin.

From your terminal:

```bash
npm install @vueuse/motion
```

In your Vue app entry file:

```javascript
import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'

const app = createApp(App)

app.use(MotionPlugin)

app.mount('#app')
```

You can now animate any of your component, HTML or SVG elements using `v-motion`.

```vue
<template>
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
</template>
```

To see more about how to use directives, check out [Directive Usage](https://motion.vueuse.org/features/directive-usage).

To see more about what properties you can animate, check out [Motion Properties](https://motion.vueuse.org/features/motion-properties).

To see more about how to create your own animation styles, check out [Transition Properties](https://motion.vueuse.org/features/transition-properties).

To see more about what are variants and how you can use them, check out [Variants](https://motion.vueuse.org/features/variants).

To see more about how to control your declared variants, check out [Motion Instance](https://motion.vueuse.org/features/motion-instance).

## Nightly release channel

You can try out the latest changes before a stable release by installing the nightly release channel.

```bash
npm install @vueuse/motion@npm:vueuse-motion-nightly
```

## Credits

This package is heavily inspired by [Framer Motion](https://www.framer.com/motion/) by [@mattgperry](https://twitter.com/mattgperry).

If you are interested in using [WAAPI](https://developer.mozilla.org/fr/docs/Web/API/Web_Animations_API), check out [Motion.dev](https://motion.dev/)!

I would also like to thank [antfu](https://github.com/antfu), [patak-dev](https://github.com/patak-dev) and [kazupon](https://github.com/kazupon) for their kind help!

If you like this package, consider following me on [GitHub](https://github.com/Tahul) and on [Twitter](https://twitter.com/yaeeelglx).

👋
