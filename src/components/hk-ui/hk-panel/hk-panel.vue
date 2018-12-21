<template lang="pug">
van-panel.hk-panel(
  :border="false"
)
  van-cell.hk-panel-title(
    slot="header"
    :title="title"
    :icon="icon"
    center
  )
    van-button(type="small" @click="handleClick" v-if="rightText || rightIcon")
      span.button-text(v-if="rightText") {{ rightText }}
      van-icon.button-icon(v-if="rightIcon" :name="rightIcon")
  slot
</template>

<script>
export default {
  name: 'hk-panel',
  props: {
    title: {
      type: String
    },
    icon: {
      type: String
    },
    rightText: {
      type: String
    },
    rightIcon: {
      type: String
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="stylus">
.hk-panel
  padding 0
  .van-panel__content
    padding 0.6rem
  &-title
    line-height 1rem
    padding 0.6rem
    border-radius 0.5rem 0.5rem 0 0
    .van-cell__left-icon
      font-size 14px
      color #d0d0d0
      padding-bottom 2px
      line-height 1rem
    .van-cell__title
      flex 3
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
    .van-button
      background transparent
      border none
      text-align right
      padding 0
      min-width 60px
      height 1rem
      line-height 1rem
      .van-button__text
        display flex
        justify-content flex-end
        align-items center
      .button-text
        font-size 12px
        color #333333
      .button-icon
        margin-left 4px
        font-size 12px
        color #999999
</style>
