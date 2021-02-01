import { MotionPlugin } from '@lib'
import 'prism-theme-vars/base.css'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

const app = createApp(App)

app.use(MotionPlugin)

app.mount('#app')
