// 所有接口服务
import Api from '@/service/api'
// 权限控制文件
import HasAuth from './hasAuth'
// 挂载在hekr上的公共方法
import Hekr from './hekr'

const goBack = () => {
  window.Matrix.back()
}

export default Vue => {
  Vue.prototype.$api = Api
  Vue.prototype.$pm = HasAuth
  Vue.prototype.$hekr = Hekr
  Vue.prototype.$goBack = goBack
}
