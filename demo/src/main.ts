import { MotionPlugin } from '@lib'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/themes/prism.css'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

const app = createApp(App)

app.use(MotionPlugin)

app.mount('#app')
