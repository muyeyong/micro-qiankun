/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare var window: Window;
interface Window {
  Vue: any,
  __POWERED_BY_QIANKUN__ : any
}

