import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

// 简单配置
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

const whiteList = ['/login', '/register', '/forget'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.getters.token.access_token) {
    // 本地存储的有token信息，可直接登陆
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 刷新token, 拉取最新用户信息  执行场景：1.刷新页面 2.每次自动登陆
      if (JSON.stringify(store.getters.user) === '{}') {
        store.dispatch('RefreshToken', store.getters.token.refresh_token).then(() => {
          store.dispatch('GetInfo').then(() => {
            next()
          }).catch(() => {
            store.dispatch('LogOut').then(() => {
              next({ path: '/login' })
            })
          })
        }).catch(() => {
          store.dispatch('LogOut').then(() => {
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login' })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
