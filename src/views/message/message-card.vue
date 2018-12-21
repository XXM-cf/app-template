<template lang="pug">
van-panel.message-card(
  :border="false"
  :class="{'message-card--unread': info.handleStatus !== 'PROCESSED'}"
)
  .message-card-title(slot="header" class="van-hairline--bottom")
    van-icon(
      :name="icon"
      :class="'card-icon--' + info.type"
    )
    span {{ showTitle }}
    .point
  .messsge-card-content {{ showContent }}
  .message-card-actions(slot="footer")
    van-button(
      v-if="$pm.auth('warning', 'handle')"
      size="small"
      :class="['solve-button', {'solve-button--solved': info.handleStatus === 'PROCESSED'}]"
      @click="solve"
    ) {{ info.handleStatus === 'PROCESSED' ? '已处理' : '处理' }}
    van-button(
      size="small"
      :class="['view-button', {'view-button--viewed': info.read}]"
      @click="view"
    ) {{ info.read ? '已查看' : '查看' }}
</template>

<script>
export default {
  name: 'message-card',
  props: {
    // 消息类型：ALARM, FAULT, SYSTEM
    type: {
      type: String
    },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    title: {
      type: String
    },
    icon: {
      type: String
    }
  },
  computed: {
    showTitle () {
      if (this.title) {
        return this.title
      } else if (this.type === 'SYSTEM') {
        return this.$hekr.formatDate(this.info.pushTime, 'YYYY-MM-DD HH:mm')
      } else {
        return this.$hekr.formatDate(this.info.createTime, 'YYYY-MM-DD HH:mm')
      }
    },
    showContent () {
      if (this.type === 'ALARM' || this.type === 'FAULT') {
        return (this.info.deviceName || '--') + '，在 ' + this.$hekr.formatDate(this.info.createTime, 'YYYY-MM-DD HH:mm') + ' 监测到' + this.info.categories.join('、') + '，位于' + (this.info.detailedAddress || '--') + (this.info.installationSite || '--') + '，请及时确认并处理'
      } else {
        return this.info.content
      }
    }
  },
  methods: {
    solve () {
      this.$emit('solve', this.info)
    },
    view () {
      this.$emit('view', this.info)
    }
  }
}
</script>

<style lang="stylus">
.message-card
  .message-card-title
    padding-bottom 12px
    font-size 14px
    .van-icon
      font-size 16px
      color #ccc
    .card-icon--ALARM
      color $--hc-alarm
    .card-icon--FAULT
      color $--hc-fault
    span
      padding-left 8px
    .point
      display none
      width 6px
      height 6px
      background #ff001f
      border-radius 50%
      position absolute
      right 0
      top 0
  &--unread
    .message-card-title
      // .van-icon
      //   color #ff8600
      .point
        display block
  .van-panel__content
    padding 12px 0
    font-size 12px
    line-height 1.6
  .van-panel__footer
    padding 12px 0 0 0
    text-align right
    .van-button
      border-radius 20px
      color #fff
      font-size 12px
      width 3rem
      height 26px
      line-height 24px
    .solve-button
      background #f39800
      box-shadow 0 3px 6px 0 rgba(0,0,0,0.07)
      &--solved
        background-image linear-gradient(-161deg, #c4c4c4 0%, #e5e5e5 90%)
        box-shadow 0 3px 7px 0 rgba(0,0,0,0.07)
    .view-button
      background-image linear-gradient(-225deg, #ffb869 0%, #ff7e8a 100%)
      box-shadow 0 3px 6px 0 rgba(0,0,0,0.07)
      margin-left 12px
      &--viewed
        background-image linear-gradient(-161deg, #c4c4c4 0%, #e5e5e5 90%)
        box-shadow 0 3px 7px 0 rgba(0,0,0,0.07)
</style>
