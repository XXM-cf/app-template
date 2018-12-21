import store from '@/store'

/*
* hasAuth 自定义权限控制方法，可应用与js、v-if中
* perm 判断权限
* role 判断角色
*/

const perm = {
  auth: (type, value) => {
    var at = false
    var authType = type.toUpperCase()
    var authorities = store.getters.authorities
    let userAuths = authorities[authType] || []
    if (userAuths.includes(value)) {
      at = true
    }
    return at
  },
  // 具体项目添加角色判断
  role: (value) => {
    let role = store.getters.role
    return role.includes(value)
  }
}

export default perm
