import request from '../request'
// 设备运行状态和联网状态
export const getDeviceStatePieApi = async (params) => {
  return await request.get(`fire:/api/v1/stat/device/num`, { params })
}

// 报警处理状态饼图
export const getSolveStatePieApi = async (params) => {
  return await request.get(`fire:/api/v1/stat/warning/handleStatus`, { params })
}

// 设备接入增长曲线图
export const getDeviceCountLineApi = async (params) => {
  return await request.get(`fire:/api/v1/stat/device/access`, { params })
}
