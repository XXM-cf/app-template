import request from '../request'
import store from '@/store'

// 系统消息
// export const getSystemListApi = async params => {
//   return await request.get(`mock:/api/v1/app/push/history`, { params })
// }
// // 设置系统已读
// export const readSystemMessageApi = async id => {
//   return await request.put(`mock:/api/v1/app/push/history/${id}/read`)
// }
// // 系统消息未读数量
// export const getSystemUnreadCountApi = async params => {
//   return await request.get(`mock:/api/v1/app/push/history/unread/count`, { params })
// }

// 告警消息
export const getMessageListApi = async (params) => {
  return await request.get('fire:/api/v1/warning', { params })
}
// 设置告警已读
export const readMessageApi = async (id, type) => {
  let url = ''
  if (type === 'SYSTEM') {
    url = `mock:/api/v1/app/push/history/${id}/read`
  } else {
    url = `mock:/api/v1/app/warning/${id}/read`
  }
  return await request.put(url)
}
// 系统消息未读数量
export const getMessageUnreadCountApi = async (params, type) => {
  let isAppUser = store.getters.isAppUser
  let url = ''
  if (type === 'SYSTEM') {
    url = 'mock:/api/v1/app/push/history/unread/count'
  } else {
    url = isAppUser ? 'mock:/api/v1/app/warning/ordinary/unread/count' : 'mock:/api/v1/app/warning/unread/count'
  }
  return await request.get(url, { params })
}
// 告警处理
export const handleMessageApi = async data => {
  return await request.post(`fire:/api/v1/warning/handle`, data)
}
