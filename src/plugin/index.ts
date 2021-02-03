import { Plugin } from 'vue-demi'
import { directive } from '../directive'

export const MotionPlugin: Plugin = {
  install(app) {
    app.directive('motion', directive)
  },
}

export default MotionPlugin
