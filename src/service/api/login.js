import request from '../request'

// 登录相关api

// 获取微信鉴权
export const getWxSignApi = async url => {
  return await request({
    url: 'wechat:/api/v1/wechat-js-sign',
    method: 'POST',
    params: { url }
  })
}
// 请求登陆 ok
export const requestLoginApi = async data => {
  return await request.post('uaa:/login', data)
}
// 刷新token
export const refreshTokenApi = async data => {
  return await request.post('uaa:/token/refresh', data)
}
// 获取用户信息 ok
export const getSelfApi = async () => {
  return await request.get('uaa:/v1/user/self')
}
// 更新用户信息
export const updateSelfApi = async data => {
  return await request.put('fire:/api/v1/account/self', data)
}
// 获取手机验证码
export const getVerifyCodeApi = async params => {
  return await request.get('uaa:/sms/getVerifyCode', { params })
}
// 获取图形验证码
export const getCaptchaApi = async () => {
  return await request.get('uaa:/api/v1/captcha')
}
// 验证图形验证码
export const checkCaptchaApi = async params => {
  return await request.get('uaa:/images/checkCaptcha', { params })
}
// 手机号注册
export const registerByPhoneApi = async data => {
  return await request.post('uaa:/register?type=phone', data)
}
// 重置密码
export const resetByPhoneApi = async data => {
  return await request.post('uaa:/resetPassword?type=phone', data)
}
// 修改密码
export const changePasswordApi = async data => {
  return await request.post('uaa:/changePassword', data)
}
// 绑定推送标签
export const bindPushTagApi = async client => {
  return await request.post('webapi:/user/pushTagBind', {
    pushPlatform: client.channel,
    locale: 'zh-CN',
    clientId: client.clientId
  })
}
// 解除绑定
export const deletePushTagApi = async client => {
  return await request.post('webapi:/user/unbindPushAlias', {
    pushPlatform: client.channel,
    clientId: client.clientId
  })
}
