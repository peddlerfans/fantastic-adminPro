// src/shims-vue.d.ts 或 src/vue.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}
