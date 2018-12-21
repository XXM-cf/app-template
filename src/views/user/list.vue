<template lang="pug">
.user-list
  .user-list-top
    .user-list-base
      hk-avatar(
        :url="user.avatarUrl"
        :loading="upLoading"
        @success="uploadAvatar"
      )
      .base-text
        .base-text-name {{ user.name }}
        .base-text-account 绑定账户: {{ user.phoneNumber }}
    van-cell-group(:border="false")
      van-cell(
        v-for="(item, index) in items"
        :key="index"
        :title="item.title"
        is-link
        :border="false"
        class="hk-divider"
        @click="goPage(item.name)"
      )
      van-cell(
        title="服务热线"
      )
        a.user-list-tel(:href="`tel:${telePhone}`") {{ telePhone }}
  van-button(
    size="large"
    @click="logout"
  ) 退出登录
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserList',
  data () {
    return {
      upLoading: false,
      items: [
        {
          title: '基本信息',
          name: 'UserInfo'
        },
        {
          title: '修改密码',
          name: 'UserPassword'
        },
        {
          title: '反馈建议',
          name: 'UserFaq'
        },
        {
          title: '关于我们',
          name: 'UserAboutus'
        }
      ],
      telePhone: '0571-28993537'
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch('DeleteClient').then(() => {
        this.goLogin()
      }).catch(() => {
        this.goLogin()
      })
    },
    goLogin () {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.replace({ name: 'Login' })
      })
    },
    goPage (name) {
      this.$router.push({ name })
    },
    uploadAvatar (url) {
      this.upLoading = true
      this.$api.updateSelfApi({
        avatarUrl: url
      }).then(() => {
        this.upLoading = false
        this.$toast.success('修改成功')
        this.$store.dispatch('GetInfo')
      }).catch(() => {
        this.upLoading = false
        this.$toast.fail('修改失败')
      })
    }
  }
}
</script>

<style lang="stylus">
.user-list
  display flex
  flex-direction column
  justify-content space-between
  &-base
    height 6rem
    padding-bottom 1rem
    padding-left 1.4rem
    background $--hc-main
    display flex
    flex-direction row
    justify-content flex-start
    align-items center
    .base-text
      color #ffffff
      &-name
        font-size 18px
      &-account
        font-size 16px
        margin-top 8px
  .van-button--large
    width auto
    margin 16px
    color #fc4049
  &-tel
    color #333
    outline none
</style>
