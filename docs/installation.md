# Installation

Install `@vueuse/motion` using your **package manager** of choice.

```bash
yarn add @vueuse/motion
```

Please note that if you are using **Vue 2** or **Nuxt**, you need to install the [**Composition API**](https://v3.vuejs.org/guide/composition-api-introduction.html).

The **required** packages can be found [**here for Vue 2**](https://github.com/vuejs/composition-api), and [**here for Nuxt**](https://composition-api.nuxtjs.org/).

## Plugin Installation

If you are planning on using the **directives** (`v-motion`) from this **package**, you might want to add the **plugin** to your **Vue instance**.

### Global Installation

You can add the **support** for `v-motion` **globally**, by installing the **plugin**.

```javascript
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App)

app.use(MotionPlugin)

app.mount('#app')
```

### Component Installation

If you want to import the **directive code** only from **components** that uses it, **import** the **directive** and install it at **component level**.

```javascript
import { directive as motion } from '@vueuse/motion'

export default {
  directives: {
    motion: motion(),
  },
}
```

## Nuxt Module

If you are using [**Nuxt**](https://nuxtjs.org/), this **package** has a specific **implementation** that makes the **declaration** of custom **directives** even **easier**.

It is called [**nuxt-use-motion**](https://github.com/Tahul/nuxt-use-motion).

You **must** have [**@nuxtjs/composition-api**](https://composition-api.nuxtjs.org/) setup in your **project** in order to make this **work**.

Once you **installed** it, just add `nuxt-use-motion` to your project:

```bash
yarn add nuxt-use-motion
```

Add `nuxt-use-motion` to the `modules` section of `nuxt.config.js`:

```javascript
{
  // nuxt.config.js
  modules: ['nuxt-use-motion']
}
```

Then, **configure** your **animations** 🤹:

```javascript
{
  // nuxt.config.js
  motions: {
    directives: {
      'pop-bottom': {
        initial: {
          scale: 0,
          opacity: 0,
          y: 100
        },
        visible: {
          scale: 1,
          opacity: 1,
          y: 0
        },
      }
    }
  }
}
```
