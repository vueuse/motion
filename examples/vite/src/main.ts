import { createApp } from 'vue'
import MotionPlugin from '@vueuse/motion/plugin'
import App from './App.vue'
import Block from './components/Block.vue'

import 'prism-theme-vars/base.css'
import 'windi.css'
import './index.css'

const app = createApp(App)

app.use(MotionPlugin)

app.component('Block', Block)

app.mount('#app')
