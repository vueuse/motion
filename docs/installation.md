# Installation

Install `@vueuse/motion` using your **package manager** of choice.

```bash
yarn add @vueuse/motion
```

Please note that if you are using **Vue 2** or **Nuxt**, you need to install the [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html).

The required packages can be found [here for Vue](https://github.com/vuejs/composition-api), and [here for Nuxt](https://composition-api.nuxtjs.org/).

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
    motion,
  },
}
```
