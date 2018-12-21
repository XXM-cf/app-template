import { requestLoginApi, getSelfApi, refreshTokenApi, bindPushTagApi, deletePushTagApi } from '@/service/api/login'
import local from '@/assets/utils/local'
export const Login = ({ commit, state }, userInfo) => {
  var username = userInfo.account.trim()
  var checkPass = userInfo.checkPass.trim()
  var loginData = {
    username: username,
    password: checkPass,
    clientType: 'APP',
    pid: state.pid
  }
  return new Promise((resolve, reject) => {
    requestLoginApi(loginData).then(rsp => {
      const respToken = {
        access_token: rsp.access_token,
        refresh_token: rsp.refresh_token
      }
      local.set(state.key.token, respToken)
      commit('SET_TOKEN', respToken)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

export const RefreshToken = ({ commit, state }, token) => {
  return new Promise((resolve, reject) => {
    refreshTokenApi({
      refresh_token: token
    }).then(rsp => {
      const respToken = {
        access_token: rsp.access_token,
        refresh_token: rsp.refresh_token
      }
      local.set(state.key.token, respToken)
      commit('SET_TOKEN', respToken)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

export const GetInfo = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    getSelfApi().then(rsp => {
      commit('SET_USER', rsp)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

export const LogOut = ({ commit, state }) => {
  return new Promise(resolve => {
    commit('SET_TOKEN', {})
    local.remove(state.key.token)
    resolve()
  })
}

export const SetPositions = ({ commit }, positions) => {
  commit('SET_POSITIONS', positions)
}

export const SetWeathers = ({ commit }, weathers) => {
  commit('SET_WEATHERS', weathers)
}

// 删除绑定clientID, 只有成功删除之后才会接收不到消息
export const DeleteClient = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    // commit('SET_CLIENTID', null)
    // local.remove(state.key.clientId)
    Promise.all(state.clientIds.map(async client => {
      await deletePushTagApi(client)
    })).then(() => {
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}

// 设备clientID, vux中保存一份，便于退出时候解绑， clientID有个推，小米和华为，是一个数组结构
export const SetClient = ({ commit, state }, clientIds) => {
  return new Promise(resolve => {
    let sorceClient = []
    if (!Array.isArray(clientIds)) {
      sorceClient = [{
        clientId: clientIds.clientId,
        channel: 'GETUI'
      }]
    } else {
      sorceClient = clientIds
    }
    let clients = [
      ...state.clientIds,
      ...sorceClient
    ]
    let hash = {}
    clients = clients.reduce((item, next) => {
      if (!hash[next.channel]) {
        hash[next.channel] = true
        item.push(next)
      }
      return item
    }, [])
    commit('SET_CLIENTID', clients)
    resolve(clients)
  })
}

// 绑定clientID，如果绑定失败则收不到推送消息
export const BindClient = ({ commit, state }, clients) => {
  return new Promise((resolve, reject) => {
    Promise.all(clients.map(async client => {
      await bindPushTagApi(client)
    })).then(() => {
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}
