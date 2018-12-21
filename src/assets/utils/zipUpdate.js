import axios from 'axios'
import { Dialog } from 'vant'

export function zipUpdate () {
  let apiEnv = process.env.API_ENV
  let pidEnv = process.env.PID_ENV
  let versionEnv = process.env.VERSION_ENV
  let buildTimeEnv = process.env.BUILDTIME_ENV
  console.log('当前APP版本号', versionEnv)
  console.log('当前build版本号', buildTimeEnv)
  axios.get(`https://hy.hekr.me/h5update/version-${pidEnv}-${apiEnv}.json?` + Math.random())
    .then(({ data }) => {
      let newVersion = data.h5
      let oldAppVersion = versionEnv.split('.').join('')
      let newAppVersion = newVersion.version.split('.').join('')
      if (oldAppVersion === newAppVersion) { // app版本一致才去判断zip版本是否有更新
        if (Number(newVersion.time) > Number(buildTimeEnv)) {
          Dialog.confirm({
            title: '温馨提示',
            message: '发现新的版本，是否更新？否则可能会影响您的正常使用！',
            className: 'hk-dialog'
          })
            .then(() => {
              let url = 'https://hy.hekr.me/h5update/' + newVersion.address.slice(2)
              let md5 = newVersion.md5
              window.Matrix.upgradeH5(`${newVersion.version}(${newVersion.time})`, url, md5)
            })
            .catch(() => {
              console.log('update error')
            })
        }
      } else if (Number(newAppVersion) > Number(oldAppVersion)) { // app版本号有更新，要下载重装app
        Dialog.alert({
          title: '温馨提示',
          message: '发现新版本的应用程序，需要下载重装新应用！否则可能会影响您的正常使用！',
          className: 'hk-dialog'
        })
      }
    })
}
