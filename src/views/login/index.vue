<template lang="pug">
.login
  hk-navbar(
    theme="simple"
    fixed
    rightText="注册"
    @click-left="goBack"
    @click-right="goRegister"
  )
    van-icon(v-if="!isIPhone" slot="left" name="guanbi")
  van-row(type="flex" justify="space-between")
    van-col
      .login-title 账号密码登录
      .login-sub 欢迎来到消防APP模板！
    van-col
      img.login-logo(src="~@/assets/images/logo.png")
  van-cell-group
    van-field(
      v-model="username"
      required
      label="用户名"
      icon="close"
      placeholder="请输入手机号"
      :error="!usernameCheck"
      @click-icon="clearUsername"
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
  van-row(type="flex" justify="center")
    .forget-password(
      @click="goForget"
    ) 忘记密码？
  van-button(
    id="loginBtn"
    size="large"
    class="hk-main-button"
    :disabled="!okCheck"
    @click="handleSubmit"
  ) 登录
</template>

<script>
import { mapState } from 'vuex'
import validate from '@/assets/utils/validate'
export default {
  name: 'Login',
  data () {
    return {
      username: '15384037073',
      password: '123456',
      error: '',
      psw: {
        type: 'password',
        icon: 'password-view'
      }
    }
  },
  computed: {
    ...mapState([
      'isIPhone'
    ]),
    usernameCheck () {
      if (this.username !== '') {
        return validate.mobile(this.username)
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
      return this.username !== '' && this.password !== '' && this.usernameCheck && this.passwordCheck
    }
  },
  mounted () {
    window.Matrix.setStatusBarColor('#ffffff')
  },
  methods: {
    goBack () {
      if (this.isIPhone) return
      window.Matrix.back()
    },
    goRegister () {
      this.$router.push({ name: 'Register' })
    },
    goForget () {
      this.$router.push({ name: 'Forget' })
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
          message: '登陆中...'
        })
        let loginForm = {
          account: this.username,
          checkPass: this.password
        }
        this.$store.dispatch('Login', loginForm).then(() => {
          toast.clear()
          window.Matrix.getClientId() // 登录成功获取clientId绑定
          this.$store.dispatch('GetInfo')
          this.$router.replace({ name: 'Home' })
        }).catch(({ response }) => {
          toast.clear()
          const { code } = (response || {}).data || {}
          if (code === 3400010) {
            this.$toast.fail('账号/密码错误')
          } else if (code === 3400032) {
            this.$toast.fail('账号已冻结')
          } else {
            this.$toast.fail('登录失败，请稍后重试')
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.login
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
  .forget-password
    font-size 14px
    color #666666
</style>
