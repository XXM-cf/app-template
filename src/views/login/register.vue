<template lang="pug">
.register
  hk-navbar(
    title=""
    right-text="已有账号登录"
    theme="simple"
    fixed
    @click-left="$goBack"
    @click-right="goLogin"
  )
    van-icon(slot="left" name="guanbi")
  van-row(type="flex" justify="space-between")
    van-col
      .login-title 手机号注册
      .login-sub 欢迎来到消防APP模板！
    van-col
      img.login-logo(src="~@/assets/images/logo.png")
  van-cell-group
    van-field(
      v-model="username"
      required
      label="手机号"
      icon="close"
      placeholder="请输入手机号"
      :error="!usernameCheck"
      @click-icon="clearUsername"
    )
    hk-code(
      v-if="usernameCheck && username !== ''"
      v-model="code"
      type="register"
      :phone="username"
      :error="!codeCheck"
    )
    van-field(
      v-model="password"
      :type="psw.type"
      label="密码"
      :icon="psw.icon"
      placeholder="请输入密码"
      :error="!passwordCheck"
      @click-icon="toggleShowPassword"
      required
    )
  van-button(
    size="large"
    class="hk-main-button"
    :disabled="!okCheck"
    @click="handleSubmit"
  ) 注册
</template>

<script>
import validate from '@/assets/utils/validate'
import { mapGetters } from 'vuex'
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password: '',
      code: '',
      error: '',
      psw: {
        type: 'password',
        icon: 'password-view'
      }
    }
  },
  computed: {
    ...mapGetters([
      'pid'
    ]),
    usernameCheck () {
      if (this.username !== '') {
        return validate.mobile(this.username)
      } else {
        return true
      }
    },
    codeCheck () {
      if (this.code !== '') {
        return validate.code(this.code)
      } else {
        return true
      }
    },
    passwordCheck () {
      if (this.password !== '') {
        return validate.password(this.password)
      } else {
        return true
      }
    },
    okCheck () {
      return this.username !== '' && this.password !== '' && this.code !== '' && this.usernameCheck && this.passwordCheck && this.codeCheck
    }
  },
  methods: {
    goLogin () {
      this.$router.push({ name: 'Login' })
    },
    clearUsername () {
      this.username = ''
    },
    toggleShowPassword () {
      if (this.psw.type === 'password') {
        this.psw.type = 'text'
        this.psw.icon = 'password-not-view'
      } else {
        this.psw.type = 'password'
        this.psw.icon = 'password-view'
      }
    },
    handleSubmit () {
      if (this.okCheck) {
        const toast = this.$toast.loading({
          mask: true,
          message: '注册中...'
        })
        let params = {
          pid: this.pid,
          phoneNumber: this.username,
          password: this.password,
          code: this.code
        }
        this.$api.registerByPhoneApi(params).then(data => {
          toast.clear()
          this.$toast.success('注册成功')
          setTimeout(() => {
            this.$router.replace({ name: 'login' })
          }, 1000)
        }).catch(({ response }) => {
          toast.clear()
          const { code } = (response || {}).data || {}
          if (code === 3400001) {
            this.$toast.fail('手机号码无效')
          } else if (code === 3400002) {
            this.$toast.fail('验证码错误')
          } else if (code === 3400003) {
            this.$toast.fail('验证码已过期，请重新认证')
          } else {
            this.$toast.fail('注册失败，请重试')
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.register
  height 100vh
  padding 2.6rem 0.8rem 0.8rem
  background #ffffff
  &-title
    font-size 22px
    color #101b36
  &-sub
    font-size 12px
    color #9ca1ac
    margin-top 10px
  &-logo
    width 50px
    height 50px
  .van-cell-group
    margin 28px 0 16px
    padding 0
  .van-row
    margin-top 20px
  .hk-main-button
    width 100%
    margin 16px 0
</style>
