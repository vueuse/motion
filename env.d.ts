/// <reference types="vite/client" />

// Global compile-time constants
declare const __DEV__: boolean
declare const __BROWSER__: boolean
declare const __CI__: boolean

// Global .vue shim
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
