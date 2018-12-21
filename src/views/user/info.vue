<template lang="pug">
.user-info
  van-cell-group(:border="false")
    van-cell(
      title="昵称"
      :value="user.name"
      :is-link="canEdit"
      :border="false"
      class="hk-divider"
      @click="editName"
    )
      van-icon(
        v-if="canEdit"
        class="van-cell__right-icon"
        slot="right-icon"
        name="edit"
      )
    van-cell(
      v-for="(item, index) in infoLists"
      :key="index"
      :title="item.title"
      :value="item.value"
      :border="false"
      class="hk-divider"
    )
  van-dialog.user-info-dialog(
    v-model="show"
    title="修改昵称"
    className="hk-dialog"
    show-cancel-button
    @confirm="editConfirm"
  )
    van-field(
      v-model="username"
      placeholder="请输入昵称"
    )
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserInfo',
  data () {
    return {
      show: false,
      username: ''
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'isAppUser'
    ]),
    canEdit () {
      return this.$pm.auth('account', 'selfMod')
    },
    infoLists () {
      return [
        {
          title: '账户',
          value: this.user.phoneNumber
        },
        {
          title: '所属单位',
          value: (this.user.companyInfo || {}).companyName
        },
        {
          title: '单位地址',
          value: (this.user.companyInfo || {}).companyAddress
        },
        {
          title: '邮箱',
          value: this.user.email
        }
      ]
    }
  },
  methods: {
    editName () {
      if (this.canEdit) {
        this.show = true
        this.username = this.user.name
      }
    },
    editConfirm () {
      if (this.username === '') {
        this.$toast('昵称不能为空')
      } else {
        this.$api.updateSelfApi({
          displayName: this.username
        }).then(() => {
          this.$toast.success('修改成功')
          this.$store.dispatch('GetInfo')
          this.username = ''
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.user-info
  .van-cell__value
    flex 2
  .user-info-dialog
    .van-dialog__content
      padding 0.8rem
</style>
