// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
// import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import '@/assets/css/my-theme/index.less'
import '@/assets/icons/iconfont.css'
// import TreeTable from 'tree-table-vue'
// import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
// import BaiduMap from 'vue-baidu-map'
// import vuescroll from 'vuescroll/dist/vuescroll-native'
// import 'vuescroll/dist/vuescroll.css'
import filter from '@/libs/filter.js'

import registryWindowInfo from '_c/windowInfo/index.js'
Vue.use(registryWindowInfo)
// import mapInfo from '@/view/show/components/windowInfo/info.vue'
// var MyComponent = Vue.extend(mapInfo)

// Vue.use(vuescroll)
// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')

// Vue.use(BaiduMap, {
//   // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: 'QPPRPzUYlpEqGNkyylz2OuTBQCeWVHAd'
// })

Vue.use(iView)
// Vue.use(iView, {
//   i18n: (key, value) => i18n.t(key, value)
// })
// Vue.use(TreeTable)
// Vue.use(VOrgTree)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // i18n,
  store,
  render: h => h(App)
})
