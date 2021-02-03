# Installation

Install the package using your package manager of choice.

```bash
yarn add @vueuse/motion
```

## Plugin installation

If you are planning on using the directives (`v-motion`) from this package, you might want to add the plugin to your Vue instance.

```javascript
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App)

app.use(MotionPlugin)

app.mount('#app')
```
