export const token = ({ token }) => token
export const user = ({ user }) => user
// 权限相关
export const authorities = ({ user }) => user.authorities
export const role = ({ user }) => user.role
// 判断是否是app注册用户
export const isAppUser = ({ user }) => {
  if (user.enterprise) {
    return false
  } else {
    return true
  }
}

export const pid = ({ pid }) => pid
export const clientIds = ({ clientIds }) => clientIds
export const key = ({ key }) => key

export const positions = ({ positions }) => positions
export const weathers = ({ weathers }) => weathers
