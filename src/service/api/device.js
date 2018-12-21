import request from '../request'

// 设备相关Api

// 扫码绑定
export const bindDeviceApi = async (data) => {
  return await request.post('fire:/api/v1/device/bind', data)
}
// 获取设备绑定状态 ok
export const queryDeviceBindStatusApi = async (data, params) => {
  return await request.post(`webapi:/deviceBindStatus`, data, { params })
}
// 查看已绑定宿主信息 ok
export const queryDeviceBindOwnerApi = async (data) => {
  return await request.post(`webapi:/queryOwner`, data)
}
// 设备列表 ok
export const getDeviceListApi = async (params) => {
  return await request.get(`fire:/api/v1/device/list`, { params })
}
// 单个设备详情
export const getDeviceDetailApi = async (ctrlKey) => {
  return await request.get(`fire:/api/v1/device/${ctrlKey}/detail`)
}
// 修改设备信息
export const editDeviceDetailApi = async (ctrlKey, data) => {
  return await request.put(`fire:/api/v1/device/${ctrlKey}`, data)
}
// 删除单个设备
export const deleteDeviceApi = async (ctrlKey) => {
  return await request.delete(`fire:/api/v1/device/${ctrlKey}`)
}
// 设备数量统计
export const getDeviceCountApi = async (params) => {
  return await request.get('fire:/api/v1/device/count', { params })
}
// 告警数量统计
export const getWarningCountApi = async params => {
  return await request.get(`mock:/api/v1/app/dashboard/warning/count`, { params })
}
// 控制设备
export const controlDeviceApi = async (data) => {
  return await request.post(`fire:/api/v1/device/control`, data)
}
// 设备快照
export const getSnapshotApi = async (ctrlKey) => {
  return await request.get(`fire:/api/v1/device/${ctrlKey}/snapshot`)
}
// 拉取协议
export const getProtocolApi = async (ppk) => {
  return await request.get(`console:/external/device/protocolTemplate`, {
    headers: {
      'X-Hekr-ProdPubKey': ppk
    }
  })
}
// 获取产品类型
export const getProductTypeApi = async () => {
  return await request.get(`fire:/api/v1/product/list`)
}
