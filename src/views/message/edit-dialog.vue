<template lang="pug">
van-dialog.message-edit-dialog(
  v-model="show"
  show-cancel-button
  className="hk-dialog"
  :before-close="handleConfirm"
)
  .message-edit-dialog-bg
  .message-edit-dialog-icon
    van-icon(name="chuli")
  van-cell-group(:border="false")
    van-field(
      v-model="handleTime"
      label="处理时间"
      readonly
    )
    van-field(
      v-model="info.handler"
      label="处理账号"
      placeholder="请输入处理账号"
      :required="!handleStatus"
      :readonly="handleStatus"
    )
    van-field(
      v-model="handleType"
      label="处理方式"
      placeholder="请选择处理方式"
      :required="!handleStatus"
      readonly
      @click="selectType"
    )
    van-field(
      v-model="info.handleDesc"
      label="处理详情"
      type="textarea"
      rows="4"
      autosize
      :required="!handleStatus"
      :readonly="handleStatus"
      placeholder="请输入处理详情"
    )
  van-actionsheet(
    v-model="showHandleType"
    :actions="handleTypes"
    get-container="body"
    @select="onSelect"
  )

</template>

<script>
export default {
  name: 'edit-dialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      showHandleType: false,
      handleTypes: [
        {
          name: '真实报警',
          value: 'REAL_ALARM'
        }, {
          name: '继续观察',
          value: 'CONTINUE_OBSERVE'
        }, {
          name: '重置模块',
          value: 'RESET_MODULE'
        }, {
          name: '排查处理',
          value: 'DISPOSE'
        }, {
          name: '系统调试',
          value: 'SYSTEM_DEBUG'
        }, {
          name: '误报',
          value: 'MISREPORT'
        }, {
          name: '其他',
          value: 'OTHER'
        }
      ]
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    handleStatus () {
      return this.info.handleStatus === 'PROCESSED'
    },
    handleTime () {
      if (this.info.handleTime) {
        return this.$hekr.formatDate(this.info.handleTime, 'YYYY-MM-DD HH:mm')
      } else {
        return this.$hekr.formatDate(new Date(), 'YYYY-MM-DD HH:mm')
      }
    },
    // handler () {
    //   if (this.info.handler) {
    //     return this.info.handler
    //   } else {
    //     return this.$store.getters.user.name
    //   }
    // },
    handleType () {
      let type = this.info.handleType || 'REAL_ALARM'
      let index = this.handleTypes.map(item => item.value).indexOf(type)
      return this.handleTypes[index].name
    }
  },
  watch: {
    show (val) {
      if (!this.info.handler || this.info.handler === '') {
        this.info.handler = this.$store.getters.user.name
      }
    }
  },
  methods: {
    selectType () {
      if (!this.handleStatus) {
        this.showHandleType = true
      }
    },
    onSelect (item) {
      this.showHandleType = false
      this.info.handleType = item.value
    },
    handleConfirm (action, done) {
      if (!this.handleStatus && action === 'confirm') {
        if (!this.info.handler || this.info.handler === '') {
          this.$toast('处理人不能为空')
          done(false)
        }
        // if (!this.info.handleType || this.info.handleType === '') {
        //   this.$toast('处理方式不能为空')
        //   done(false)
        // }
        if (!this.info.handleDesc || this.info.handleDesc === '') {
          this.$toast('处理详情不能为空')
          done(false)
        } else {
          this.info.handleType = this.info.handleType || 'REAL_ALARM'
          // this.info.handler = this.handler
          this.$emit('confirm', this.info)
          done()
        }
      } else {
        done()
      }
    }
  }
}
</script>

<style lang="stylus">
.message-edit-dialog
  background transparent
  .van-dialog__content
    padding-top 80px
    position relative
  &-bg
    width 100%
    background #ffffff
    position absolute
    top 40px
    left 0
    right 0
    bottom 0
    border-radius 0.6rem 0.6rem 0 0
  &-icon
    width 80px
    height 80px
    border-radius 50%
    background #ffffff
    position absolute
    top 0
    left 50%
    margin-left -40px
    display flex
    justify-content center
    align-items center
    font-size 48px
    color #40a0f6
    z-index 9999
  .van-cell-group
    margin 0 0.8rem
  .van-dialog__footer
    background #ffffff
</style>
