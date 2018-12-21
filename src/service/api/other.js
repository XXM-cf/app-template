import request from '../request'
// 问题反馈
export const postFeedbackApi = async data => {
  return await request.post(`console:/external/feedback`, data)
}
// 上传文件
export const uploadFileApi = async file => {
  const formData = new FormData()
  const filename = `${Math.round(new Date().getTime() * Math.random()) + new Date().getTime()}.png`
  formData.append('file', file, filename)
  formData.append('prefix', 'hekr-fire')
  return await request({
    method: 'post',
    url: `console:/api/v1/file`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 获取项目
// export const getProjectListApi = async () => {
//   return await request.get(`mock:/api/v1/app/project`)
// }

// 获取平台信息
export const getPlatformInfoApi = async () => {
  return await request.get(`mock:/api/v1/platform/info`)
}

// 获取视频列表
export const getVideoListApi = async (params) => {
  return await request.get(`fire:/api/v1/video/list`, { params })
}
