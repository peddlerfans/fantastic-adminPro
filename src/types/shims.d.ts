declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}
declare interface Window {
  webkitDevicePixelRatio: any
  mozDevicePixelRatio: any
}

declare const __SYSTEM_INFO__: {
  pkg: {
    version: string
    dependencies: Record<string, string>
    devDependencies: Record<string, string>
  }
  lastBuildTime: string
}
