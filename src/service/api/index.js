/*
* Api命名建议:
* 组成: {动作}{接口用处}{Api}
* 1.动作(get查询, add增加, update修改, delete删除, handle处理)
* 2.接口用处, 如userList, deviceDetail
* 3.Api, 表明是Api接口, 区别于其他方法
* 目的: 语义化明确, 看到接口就知道类型用处
* 示例: getUserListApi(获取用户列表api), handleAlarmApi(处理告警api)
*/
import * as login from './login'
import * as device from './device'
import * as message from './message'
import * as project from './project'
import * as other from './other'
import * as analysis from './analysis'

export default {
  ...login,
  ...device,
  ...message,
  ...project,
  ...other,
  ...analysis
}
