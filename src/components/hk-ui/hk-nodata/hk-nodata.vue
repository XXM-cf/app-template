<template lang="pug">
.hk-nodata
  img(v-if="type === 'message'" src="~@/assets/images/nodata-message.png")
  img(v-else-if="type === 'error'" src="~@/assets/images/nodata-error.png")
  img(v-else src="~@/assets/images/nodata-data.png")
  span {{ text }}
</template>

<script>
export default {
  name: 'hk-nodata',
  props: {
    // 无数据类型，data: 无数据 message: 无消息 error: 加载失败
    type: {
      type: String,
      default: 'data'
    }
  },
  computed: {
    text () {
      if (this.type === 'message') {
        return '暂无消息'
      } else if (this.type === 'error') {
        return '加载失败'
      } else {
        return '暂无数据'
      }
    }
  }
}
</script>

<style lang="stylus">
.hk-nodata
  width 100%
  height 100%
  min-height 20rem
  display flex
  flex-direction column
  justify-content center
  align-items center
  img
    max-width 40%
  span
    font-size 16px
    color #666
    margin-top 12px
</style>
