<template lang="pug">
</template>
<script>
export default {
  name: 'MixinsScan',
  data () {
    return {
      code: '',
      password: ''
    }
  },
  mounted () {
    document.addEventListener('qrcode', this.qrcodeListener, false)
  },
  destroyed () {
    document.removeEventListener('qrcode', this.qrcodeListener, false)
  },
  methods: {
    /**
     * 调用扫码二维码方法 this.$pm.auth('device$operation')
     */
    scanQR () {
      window.Matrix.scanQRCode('addDevice')
    },
    /**
     * 获取到二维码信息后绑定
     */
    qrcodeListener (data) {
      console.log('qrCode data', data)
      let json = JSON.parse(data.detail)
      let codeUrl = json.qrcode
      let reg = /bind;[\s\S]*;[\s\S]*/
      if (reg.test(codeUrl)) {
        // 短码绑定
        let codes = codeUrl.split(';')
        let code = codes[1]
        let password = codes[2]
        if (code && password) {
          this.code = code
          this.password = password
          // this.queryBindStatus()
          this.goBindPage()
        } else {
          this.$toast.fail('暂不支持此二维码')
        }
      } else {
        this.$toast.fail('暂不支持此二维码')
      }
    },
    /**
     * 查询设备绑定状态
     */
    queryBindStatus () {
      let data = [{
        code: this.code,
        password: this.password
      }]
      let params = {
        type: 'shortCode'
      }
      this.$api.queryDeviceBindStatusApi(data, params)
        .then(resp => {
          if (resp.length > 0) {
            if (!resp[0].forceBind && resp[0].bindToUser) {
              this.queryBindOwner(resp[0].devTid, resp[0].bindKey)
            } else {
              this.goBindPage()
            }
          } else {
            this.goBindPage()
          }
        })
        .catch(({ response }) => {
          this.bindError(response)
        })
    },
    /**
     * 查询绑定宿主
     */
    queryBindOwner (devTid, bindKey) {
      let params = {
        devTid,
        bindKey
      }
      this.$api.queryDeviceBindOwnerApi(params)
        .then(resp => {
          if (this.$store.getters.user.uid === resp.owner) {
            this.goBindPage()
          } else {
            this.$router.push({ name: 'BindError', query: { people: resp.message } })
          }
        })
        .catch(({ response }) => {
          this.bindError(response)
        })
    },
    goBindPage () {
      this.$router.push({
        name: 'Bind',
        query: {
          code: this.code,
          password: this.password
        }
      })
    },
    /**
     * 绑定失败，跳转失败页面
     */
    bindError (response) {
      let rspData = (response || {}).data || {}
      if (rspData.code) {
        this.$router.push({ name: 'BindError', query: { code: rspData.code, desc: rspData.desc } })
      } else {
        this.$router.push({ name: 'BindError' })
      }
    }
  }
}
</script>
