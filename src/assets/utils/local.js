const local = {
  /**
   * 读取本地缓存
   */
  get: (key) => {
    let info = localStorage.getItem(key)
    if (info) {
      try {
        info = JSON.parse(info)
      } catch (e) { }
    }
    if (info && typeof info === 'object') {
      return info
    }
    return false
  },
  /**
   * 存储信息
   */
  set: (key, info) => {
    return localStorage.setItem(key, JSON.stringify(info))
  },
  /**
   * 删除本地存储
   */
  remove: (key) => {
    return localStorage.removeItem(key)
  }
}

export default local
