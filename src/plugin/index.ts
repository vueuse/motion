import { Plugin } from 'vue'
import { directive } from '../directive'

export const MotionPlugin: Plugin = {
  install(app) {
    app.directive('motion', directive)
  },
}

export default MotionPlugin
