<template lang="pug">
.home
  hk-navbar(
    title="首页"
    :right-icon="rightIcon"
    fixed
    theme="simple"
    :z-index="10"
    @click-right="scanQR"
  )
  .home-bg
    .home-bg-text
      .home-bg-text-left {{ weather }}
      hk-realtime.home-bg-text-right
  van-row.home-data
    van-col(span="8")
      div(@click="goDevice('alarm')" class="van-hairline--right")
        .home-data-value(style="color: #d0021b") {{ alarmCount || 0 }}
        .home-data-title 报警设备
    van-col(span="8")
      div(@click="goDevice('fault')" class="van-hairline--right")
        .home-data-value(style="color: #f5a623") {{ faultCount || 0 }}
        .home-data-title 故障设备
    van-col(span="8")
      div(@click="goDevice('normal')")
        .home-data-value(style="color: #50e3c2") {{ normalCount || 0 }}
        .home-data-title 正常设备
  tab-bar
</template>
<script>
import mixinsScan from '@/mixins/scan'
import TabBar from '~/page/tab-bar'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    TabBar
  },
  mixins: [mixinsScan],
  data () {
    return {
      normalCount: 0,
      alarmCount: 0,
      faultCount: 0
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'isAppUser',
      'weathers',
      'positions'
    ]),
    weather () {
      if (this.weathers.weather) {
        return this.weathers.weather + '  ' + this.weathers.temperature + '℃'
      } else {
        return ''
      }
    },
    rightIcon () {
      // if (this.$pm.auth('device$operation')) {
      //   return 'tubiaosaoyisao'
      // } else {
      //   return ''
      // }
      return 'tubiaosaoyisao'
    }
  },
  methods: {
    goDevice (type) {
      // this.$router.push({ name: 'Device', query: { type: type } })
    }
  }
}
</script>
<style lang="stylus">
.home
  width 100%
  padding-top 9.6rem
  margin-bottom 3.4rem
  .van-nav-bar.hk-navbar--simple
    color #ffffff
    .van-icon,
    .van-nav-bar__text
      color #ffffff
    .van-nav-bar__left
      top 12px
    .van-nav-bar__right
      bottom 8px
  &-avatar
    width 28px
    height 28px
    border-radius 50%
    background-position center
    background-repeat no-repeat
    background-size cover
  &-bg
    width 100%
    height 9rem
    position absolute
    top 0
    left 0
    z-index 8
    background-image url('~@/assets/images/homeBg.png')
    background-size cover
    background-position center
    &-text
      position absolute
      left 0.8rem
      bottom 0.6rem
      right 0.8rem
      display flex
      justify-content space-between
      align-items center
      color #fff
      font-size 0.6rem
  &-data
    padding $--hk-padding 0
    margin 0 $--hk-margin
    font-size 12px
    text-align center
    background #ffffff
    border-radius $--hk-radius
    .van-col
      position relative
    &-value
      font-size 20px
    &-title
      margin-top 10px
      font-size 14px
      color #5d6e84
  .van-tabbar.hk-tabbar--simple
    box-shadow 0 -6px 8px 0 rgba(0,0,0,0.05)
  &-warns
    padding-bottom 2.6rem
    .hk-nodata
      min-height 12rem
</style>
