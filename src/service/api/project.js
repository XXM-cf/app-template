import request from '../request'

// 获取项目列表
export const getProjectListApi = async (params) => {
  return await request.get(`fire:/api/v1/project`, { params })
}

// 获取项目详情
export const getProjectDetailApi = async id => {
  return await request.get(`fire:/api/v1/project/${id}`)
}

// 修改项目信息
export const updateProjectApi = async (data) => {
  return await request.put(`fire:/api/v1/project/${data.id}`, data)
}
