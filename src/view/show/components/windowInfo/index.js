import windowInfo from './info.vue'
import vue from 'vue'

const WindowInfo =  vue.extend(windowInfo)

export default WindowInfo

// const WINDOWINFO = {
//   install(Vue) {
//     if (typeof window !== 'undefined' && window.Vue) {
//       Vue = window.Vue
//     }
//     Vue.component('MyWindowInfo', windowInfo)
//   }
// }