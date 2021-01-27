import { Plugin } from 'vue'
import { directive } from '../directive'

export function plugin(): Plugin {
  return {
    install(app, options) {
      app.directive('motion', directive)
    },
  }
}

export default plugin()
