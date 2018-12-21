<template lang="pug">
#app
  router-view
  el-amap(
    vid="amap"
    :plugin="plugin"
    style="display:none"
  )
</template>

<script>
import { zipUpdate } from '@/assets/utils/zipUpdate'
import local from '@/assets/utils/local'
import { defaultData } from '@/assets/utils/defaultData.js'
export default {
  name: 'app',
  data () {
    let self = this
    return {
      firstBack: null,
      plugin: [{
        pName: 'Geolocation',
        events: {
          init (o) {
            // o是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              // console.log('result', result) // 获取定位的所有信息
              if (status === 'complete' && result.info === 'SUCCESS') {
                let positions = {
                  lng: result.position.lng,
                  lat: result.position.lat,
                  address: result.formattedAddress,
                  adcode: result.addressComponent.adcode
                }
                console.log('position', positions)
                self.$store.dispatch('SetPositions', positions)
                self.getWeather(positions.adcode)
              } else {
                console.log('定位失败')
                let defaultPositions = {
                  ...defaultData.position
                }
                self.$store.dispatch('SetPositions', defaultPositions)
                self.getWeather(defaultPositions.adcode)
              }
            })
          }
        }
      }]
    }
  },
  mounted () {
    window.Matrix.setStatusBarColor('#388cee') // 设备状态栏颜色
    window.Matrix.back = () => { // 安卓返回键处理
      let closePath = ['Login', 'Home'] // 直接关闭app页面
      let curPath = this.$route.name
      if (closePath.indexOf(curPath) > -1) {
        if (!this.firstBack) {
          this.firstBack = new Date().getTime()
          this.$toast('再按一次退出应用')
          let _this = this
          setTimeout(function () {
            _this.firstBack = null
          }, 1000)
        } else {
          if (new Date().getTime() - this.firstBack < 1000) {
            window.close()
          }
        }
      } else {
        this.$router.back()
      }
    }
    zipUpdate() // 检查app是否有更新
    document.addEventListener('onNotification', this.messageListener, false) // 监听通知消息
    document.addEventListener('getClientId', this.clientIdListener, false) // 监听获取clientId
    window.Matrix.getClientId() // 请求获取clientId
  },
  methods: {
    /**
     * 获取天气情况，使用高德天气
     */
    getWeather (adcode) {
      let self = this
      AMap.plugin('AMap.Weather', () => {
        var weather = new AMap.Weather()
        weather.getLive(adcode, (err, data) => {
          console.log(err, data)
          self.$store.dispatch('SetWeathers', data)
        })
      })
    },
    messageListener (data) {
      console.log('message', data)
      let json = JSON.parse(data.detail)
      let type = json.pushType
      if (type === 'DEVICE_FORCEBIND') { // 强绑类通知
        this.$dialog.alert({
          title: json.title,
          message: json.message,
          className: 'hk-dialog'
        })
      } else if (type === 'DEVICE_ALERT') { // 告警类通知
        window.Matrix.alert()
        this.$dialog.alert({
          title: '温馨提示',
          message: '收到新的警情，请及时处理',
          className: 'hk-dialog'
        })
          .then(() => {
            window.Matrix.cancelAlert()
          })
      } else { // 系统类通知，也许还包括其他类消息，比如授权通知，这要跟业务确定一共有哪几类通知消息
        this.$dialog.alert({
          title: '温馨提示',
          message: '收到新的系统消息，请及时查看',
          className: 'hk-dialog'
        })
      }
    },
    clientIdListener (data) {
      console.log('clientId', data)
      let json = JSON.parse(data.detail)
      if (json) {
        this.$store.dispatch('SetClient', json).then((clients) => {
          if (local.get(this.$store.getters.key.token)) {
            this.$store.dispatch('BindClient', clients)
          }
        })
      }
    }
  },
  destroyed () {
    document.removeEventListener('onNotification', this.messageListener, false)
    document.removeEventListener('getClientId', this.clientIdListener, false)
  }
}
</script>

<style lang="stylus">
@import "~@/assets/stylus/index.styl"
</style>
