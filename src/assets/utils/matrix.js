let $file = null
export default {
  /**
   * 安卓返回键执行方法
   */
  back () {},

  /**
   * 获取本机clientId，用于绑定后接收推送
   */
  getClientId () {
    const event = document.createEvent('Event')
    event.initEvent('getClientId')
    const detail = [
      {
        clientId: 'f4d047bc6bae5ed2b52b116b0093d165',
        channel: 'GETUI'
      }, {
        clientId: 'f4d047bc6bae5weeewefsdfdsf0sddds',
        channel: 'XIAOMI'
      }]
    // const detail = {
    //   clientId: 'f4d047bc6bae5ed2b52b888888888888'
    // }
    event.detail = JSON.stringify(detail)
    document.dispatchEvent(event)
  },

  /**
   * 设置状态栏颜色
   * @param {*} color 颜色值
   */
  setStatusBarColor (color) {
    console.log('color', color)
  },

  /**
   * 获取本地数据
   */
  getData () {
    let user = localStorage.getItem('user')
    if (user) {
      try {
        user = JSON.parse(user)
      } catch (e) { }
    }
    if (user && typeof user === 'object') {
      return user
    }
    return {}
  },
  /**
   * 存储本地数据
   * @param {*} user 用户信息
   */
  putData (user) {
    localStorage.setItem('user', JSON.stringify(user))
  },

  /**
   * 调用原生扫码功能
   * @param {*} key 标识
   */
  scanQRCode (key) {
    const event = document.createEvent('Event')
    event.initEvent('qrcode')
    const detail = {
      key,
      // qrcode: 'http://www.hekr.me?action=bind&devTid=01_df75986c92e41&bindKey=818c5040418f432ea6f52572044d6a05'
      qrcode: 'bind;gzabkCk6;RU9VGJ' // 模拟短码返回
    }
    event.detail = JSON.stringify(detail)
    document.dispatchEvent(event)
  },

  /**
   * 获取本机照片
   * @param {*} key 标识
   * @param {*} max 最多选择几张
   */
  takePhoto (key, max) {
    if (!$file) {
      $file = document.createElement('input')
      $file.setAttribute('style', 'display: none')
      $file.setAttribute('type', 'file')
      $file.setAttribute('accept', 'image/*')

      document.body.appendChild($file)
      const event = document.createEvent('Event')
      event.initEvent('photo')

      $file.addEventListener('change', () => {
        const file = $file.files[0]
        if (file) {
          if ('FileReader' in window) {
            const reader = new FileReader()
            reader.onload = (e) => {
              const detail = {
                key,
                image: reader.result.replace(/^data:image\/\w+;\w+,/, '')
              }
              event.detail = JSON.stringify(detail)
              document.dispatchEvent(event)
              document.body.removeChild($file)
              $file = null
            }
            reader.readAsDataURL(file)
          }
        }
      })
    }
    $file.click()
  },

  /**
   * 播放音频
   * @param {*} src 视频路径
   */
  video (src) {
    const $video = document.createElement('video')
    const style = {
      position: 'fixed',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      'z-index': 2000,
      'background-color': '#000'
    }
    let styleStr = []
    Object.keys(style).forEach(key => {
      styleStr.push(`${key}:${style[key]}`)
    })
    $video.setAttribute('style', styleStr.join(';'))
    $video.setAttribute('autoplay', true)
    document.body.appendChild($video)

    // 关闭播放器
    $video.addEventListener('click', () => {
      document.body.removeChild($video)
    })
    $video.setAttribute('src', src)
  },

  /**
   * 地图
   */
  AMapReady () {
    console.log('AMap ready')
  },

  /**
   * 调用声音
   */
  alert () {
    console.log('声音提示')
  },

  /**
   * 模拟发送消息
   * @param {*} type 消息类型 bind为强绑类型通知
   */
  sendMessage (type) {
    const event = document.createEvent('Event')
    event.initEvent('onNotification')
    const alertDetail = {
      pushType: 'DEVICE_ALERT',
      ctrlKey: '2695879324594aef80c0ed46b9c4b940',
      devTid: '01_a44a298c3c026e0406b6ccb10b12b'
    }
    const bindDetail = {
      pushType: 'DEVICE_FORCEBIND',
      title: '设备被绑定通知',
      message: '设备: \n01_a44a298c3c026e0406b6ccb10b12b, 绑定人: \n测试修改'
    }
    if (type === 'bind') {
      event.detail = JSON.stringify(bindDetail)
    } else {
      event.detail = JSON.stringify(alertDetail)
    }
    document.dispatchEvent(event)
  }
}
