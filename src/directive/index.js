import auth from './auth'
import ripple from './ripple'

export default (Vue) => {
  Vue.directive('auth', {
    inserted: auth
  })
  Vue.directive('ripple', {
    inserted: ripple
  })
}
