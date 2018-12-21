<template lang="pug">
.user-password
  van-cell-group(:border="false")
    van-field(
      v-model="oldPassword"
      type="password"
      label="原密码"
      input-align="right"
      placeholder="请输入原密码"
    )
    van-field(
      v-model="newPassword"
      type="password"
      label="输入新密码"
      input-align="right"
      placeholder="请输入新密码"
    )
    van-field(
      v-model="newPassword2"
      type="password"
      label="确认新密码"
      input-align="right"
      placeholder="请输入确认密码"
    )
  van-button(
    class="hk-main-button"
    size="large"
    @click="submit"
  ) 确认密码
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserPassword',
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      newPassword2: ''
    }
  },
  computed: {
    ...mapGetters([
      'pid'
    ])
  },
  methods: {
    submit () {
      if (this.oldPassword.length < 6 || this.newPassword.length < 6 || this.newPassword2.length < 6) {
        this.$toast('密码不能少于6位')
      } else if (this.newPassword === this.oldPassword) {
        this.$toast('输入的新旧密码不能一样')
      } else if (this.newPassword !== this.newPassword2) {
        this.$toast('新密码两次输入不一致')
      } else {
        this.$api.changePasswordApi({
          pid: this.pid,
          newPassword: this.newPassword,
          oldPassword: this.oldPassword
        }).then(() => {
          this.$toast.success('修改成功，请重新登录')
          setTimeout(() => {
            this.$store.dispatch('LogOut').then(() => {
              location.reload()
            })
          }, 1000)
        }).catch(({ response }) => {
          const { code } = (response || {}).data || {}
          if (code === 3400007) {
            this.$toast.fail('原密码错误')
          } else {
            this.$toast('修改失败')
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.user-password
  display flex
  flex-direction column
  justify-content space-between
</style>
