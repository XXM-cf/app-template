import local from '@/assets/utils/local'
const key = {
  token: 'fire-app-template-token' // 存储token的key值
}

const getIsIPhone = () => {
  const iDevice = /ipod|iphone/i.test(navigator.userAgent)
  const likeIDevice = /like (ipod|iphone)/i.test(navigator.userAgent)
  return iDevice && !likeIDevice
}

export default {
  token: local.get(key.token) || {access_token: null, refresh_token: null},
  pid: process.env.PID_ENV,
  clientIds: local.get(key.clientId) || [],
  user: {},

  // 定位天气相关
  positions: {},
  weathers: {},

  // 本地存储key值
  key,
  // 判断是否为iOS手机
  isIPhone: getIsIPhone()
}
