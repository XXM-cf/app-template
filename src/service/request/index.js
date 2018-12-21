import axios from 'axios'
import store from '@/store'
import router from '@/router/index'
import { Toast } from 'vant'
import api from '../server'

const $axios = axios.create({
  timeout: 15000 // 请求超时时间
})
const cancelToken = {}
const symbol = ':'
const translateURL = (config) => {
  let list = config.url.split(symbol)
  if (list.length >= 2) {
    let target = list[0]
    config.url = config.url.replace(target + symbol, api[target])
  }
}
// get方法添加时间戳，解决缓存问题
const addRandom = (config) => {
  let method = config.method
  let url = config.url
  let params = url.split('?')
  if (method === 'get') {
    if (params[1]) {
      config.url += '&_=' + new Date().getTime()
    } else {
      config.url += '?_=' + new Date().getTime()
    }
  }
}

// 请求拦截处理
$axios.interceptors.request.use(config => {
  translateURL(config)
  addRandom(config)
  const token = store.getters.token.access_token
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`
  }
  const source = axios.CancelToken.source()
  config.cancelToken = source.token

  const fullPath = router.currentRoute.fullPath
  // 把token存入到对象里面
  if (!cancelToken[fullPath]) {
    cancelToken[fullPath] = []
  }

  // 页面跳转是否自动取消请求
  if (!config.isAutoCancel) {
    cancelToken[fullPath].push(source)
  }

  return config
}, error => Promise.reject(error))

// 响应拦截处理
$axios.interceptors.response.use(({ data }) => data, error => {
  if (error.response && error.response.status === 403) {
    Toast('没有访问权限或登录已过期，请重新登录')
  }
  if (error.response && error.response.status === 500) {
    Toast('服务器错误')
  } else if (error.code === 'ECONNABORTED' && /^timeout/.test(error.message)) {
    Toast('请求超时')
  } else if (error.message === 'Network Error') {
    Toast('网络错误')
  }
  return Promise.reject(error)
})

// 页面切换之后就关闭Ajax请求
// router.afterEach((to, from) => {
//   if (Array.isArray(cancelToken[from.fullPath])) {
//     cancelToken[from.fullPath].forEach(item => item.cancel())
//     cancelToken[from.fullPath] = []
//   }
// })

// $axios.install = Vue => {
//   Vue.prototype.$axios = $axios
// }

// 挂载到Vue原型上
export default $axios
