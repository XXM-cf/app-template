<template lang="pug">
.hk-code
  van-field(
    v-model="val"
    center
    required
    :error="error"
    label="验证码"
    placeholder="请输入验证码"
  )
    van-button(
      slot="button"
      size="small"
      @click="showImgCodeDiaglog"
    ) {{ btnText }}
  van-dialog(
    v-model="isShowDialog"
    class="hk-code-dialog"
    title="图形验证码"
    show-cancel-button
    @cancel="dialogCancle"
    @confirm="dialogConfirm"
  )
    input.hk-code-dialog-input(
      v-model="imgcode"
      type="text"
      maxlength="4"
      placeholder="请输入图形验证码"
    )
    img.hk-code-dialog-img(
      :src="codeImg"
      @click="getCaptchaImg"
    )

</template>

<script>
import { mapGetters } from 'vuex'
import validate from '@/assets/utils/validate'
export default {
  name: 'HkCode',
  props: {
    value: {
      type: String
    },
    phone: {
      type: String
    },
    type: {
      type: String
    },
    error: {
      type: Boolean
    }
  },
  data () {
    return {
      loading: false,
      time: 0,
      isShowDialog: false,
      imgcode: '',
      rid: '',
      png: '',
      captchaToken: ''
    }
  },
  computed: {
    ...mapGetters([
      'pid'
    ]),
    val: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    btnText () {
      if (this.loading) return '正在请求...'
      return this.time ? `重新获取(${this.time}s)` : '获取验证码'
    },
    codeImg () {
      return 'data:image/png;base64,' + this.png
    }
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    showImgCodeDiaglog () {
      if (this.time || this.loading) return
      if (!validate.mobile(this.phone)) {
        return this.$toast.fail('手机号不正确')
      }
      this.getCaptchaImg()
      this.isShowDialog = true
    },
    dialogCancle () {
      this.imgcode = ''
      this.isShowDialog = false
    },
    dialogConfirm () {
      this.$api.checkCaptchaApi({
        rid: this.rid,
        code: this.imgcode
      }).then(data => {
        this.captchaToken = data.captchaToken
        this.imgcode = ''
        this.isShowDialog = false
        this.getCode()
      }).catch(err => {
        console.log('err', err)
        this.$toast.fail('验证码错误')
        this.imgcode = ''
        this.getCaptchaImg()
      })
    },
    getCaptchaImg () {
      this.$api.getCaptchaApi().then(data => {
        this.rid = data.rid
        this.png = data.png
      })
    },
    getCode () {
      this.loading = true
      this.$api.getVerifyCodeApi({
        pid: this.pid,
        phoneNumber: this.phone,
        type: this.type,
        token: this.captchaToken
      }).then(() => {
        this.loading = false
        this.time = 60
        this.timer = setInterval(() => {
          --this.time
          if (!this.time) clearInterval(this.timer)
        }, 1000)
      }).catch(err => {
        this.loading = false
        if (err.response &&
          err.response.data &&
          err.response.data.code === 3400011) {
          return this.$toast.fail('手机号未注册')
        }
        if (err.response &&
          err.response.data &&
          err.response.data.code === 3400008) {
          return this.$toast.fail('账号已注册')
        }
        this.$toast.fail('获取验证码失败')
      })
    }
  }
}
</script>

<style lang="stylus">
$height=36px
.hk-code
  &-container
    height 50px
    display flex
    border-bottom 1px solid #ccc
    padding 6px 0
    &-control
      flex 1
      height $height
      input
        display block
        width 100%
        height $height
        padding 6px 1px
        text-align left
        font-size 12px
        color #fff
        border none
        outline none
        background none
        &::-webkit-input-placeholder
          color rgba(255, 255, 255, 0.5)
    &-button
      height $height
      line-height $height
      min-width 90px
      text-align right
      font-size 12px
      padding 0 6px
      color #40e4bd
  .hk-code-dialog
    .van-dialog__content
      padding 16px
      display flex
      align-items center
    &-input
      width 70%
      height 1.8rem
      padding 0 4px
      border 1px solid #ddd
      border-radius 3px
      outline none
      font-size 0.7rem
      color #555
      &:focus
        border-color #bbb
    &-img
      width 30%
      height 1.8rem
      margin-left 4px
</style>
