import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/home/index.vue'], resolve)
// 登录注册相关
const Login = resolve => require(['@/views/login/index.vue'], resolve)
const Register = resolve => require(['@/views/login/register.vue'], resolve)
const Forget = resolve => require(['@/views/login/forget.vue'], resolve)
// 404页面
const Error404 = resolve => require(['@/views/404/index.vue'], resolve)
// 设备列表
const Bind = resolve => require(['@/views/bind/index.vue'], resolve)
const BindError = resolve => require(['@/views/bind/error.vue'], resolve)
// 消息中心
const Message = resolve => require(['@/views/message/index.vue'], resolve)
// 用户相关界面
const User = resolve => require(['@/views/user/index.vue'], resolve)
const UserList = resolve => require(['@/views/user/list.vue'], resolve)
const UserInfo = resolve => require(['@/views/user/info.vue'], resolve)
const UserAboutus = resolve => require(['@/views/user/aboutus.vue'], resolve)
const UserPassword = resolve => require(['@/views/user/password.vue'], resolve)
const UserFaq = resolve => require(['@/views/user/faq.vue'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    },
    {
      path: '/bind',
      name: 'Bind',
      component: Bind
    },
    {
      path: '/error',
      name: 'BindError',
      component: BindError
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/user',
      name: 'User',
      redirect: '/user/list',
      component: User,
      children: [
        {
          path: 'list',
          name: 'UserList',
          component: UserList,
          meta: {
            title: '个人中心'
          }
        },
        {
          path: 'aboutus',
          name: 'UserAboutus',
          component: UserAboutus,
          meta: {
            title: '关于我们'
          }
        },
        {
          path: 'info',
          name: 'UserInfo',
          component: UserInfo,
          meta: {
            title: '基本信息'
          }
        },
        {
          path: 'password',
          name: 'UserPassword',
          component: UserPassword,
          meta: {
            title: '修改密码'
          }
        },
        {
          path: 'faq',
          name: 'UserFaq',
          component: UserFaq,
          meta: {
            title: '用户反馈'
          }
        }
      ]
    },
    {
      path: '*',
      component: Error404
    }
  ]
})
