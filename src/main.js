import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Prototype from './prototype' // vue 原型
import Directive from './directive' // vue 指令
import Rem from './assets/utils/rem' // 移动端适配rem
// import VantUI from '~/vant-ui' // vant-ui
import {
  Button,
  Icon,
  Cell,
  CellGroup,
  Field,
  List,
  Toast,
  Row,
  Col,
  Tabbar,
  TabbarItem,
  NavBar,
  Tab,
  Tabs,
  SwipeCell,
  Dialog,
  Panel,
  PullRefresh,
  Actionsheet,
  Tag,
  Loading,
  Popup,
  Search,
  Checkbox,
  RadioGroup,
  Radio,
  Swipe,
  SwipeItem
} from 'vant'
import HkUI from '~/hk-ui'
import './assets/utils/permission' // 权限控制
import matrix from './assets/utils/matrix'
import FastClick from 'fastclick' // 处理移动端click事件300毫秒延迟
import Vconsole from 'vconsole' // 调试工具
import AMap from 'vue-amap' // 地图
import preview from 'vue-photo-preview' // 图片预览

Vue.config.productionTip = false
Vue.use(Rem)
// Vue.use(VantUI)
Vue.use(Button)
  .use(Icon)
  .use(Cell)
  .use(CellGroup)
  .use(Field)
  .use(List)
  .use(Toast)
  .use(Row)
  .use(Col)
  .use(Tabbar)
  .use(TabbarItem)
  .use(NavBar)
  .use(Tab)
  .use(Tabs)
  .use(SwipeCell)
  .use(Dialog)
  .use(Panel)
  .use(PullRefresh)
  .use(Actionsheet)
  .use(Tag)
  .use(Loading)
  .use(Popup)
  .use(Search)
  .use(Checkbox)
  .use(RadioGroup)
  .use(Radio)
  .use(Swipe)
  .use(SwipeItem)
Vue.use(HkUI)
Vue.use(Directive)
Vue.use(AMap)
Vue.use(Prototype)
AMap.initAMapApiLoader({
  key: 'c2c0558aba12ce2404cbc5dd7fe48643',
  plugin: ['AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Weather'],
  // 默认高德 sdk 版本为 1.4.4
  uiVersion: '1.0.11',
  v: '1.4.4'
})

let options = {
  fullscreenEl: false
}
Vue.use(preview, options)

FastClick.attach(document.body)
// 本地开发模拟Matrix
if (process.env.NODE_ENV !== 'production') {
  window.Matrix = matrix
}
// vconsole调试工具
if (process.env.API_ENV !== 'prod' && process.env.NODE_ENV === 'production') {
  window.vConsole = new Vconsole()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
