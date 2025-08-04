//让ts知道.vue文件都是vue组件，解决找不到模块的报错
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
