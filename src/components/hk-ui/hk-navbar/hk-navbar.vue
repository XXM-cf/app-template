<template lang="pug">
van-nav-bar(
  v-bind="$attrs"
  :class="'hk-navbar--' + theme"
  @click-left="clickLeft"
  @click-right="clickRight"
)
  van-icon(
    v-if="rightIcon"
    slot="right"
    :name="rightIcon"
  )
  span(
    v-if="rightText"
    slot="right"
  ) {{ rightText }}
  slot(name="left" slot="left")
</template>

<script>
export default {
  name: 'hk-navbar',
  props: {
    rightText: {
      type: String
    },
    rightIcon: {
      type: String
    },
    // 主题 simple, colorful
    theme: {
      type: String,
      default: 'colorful'
    }
  },
  methods: {
    clickLeft () {
      this.$emit('click-left')
    },
    clickRight () {
      this.$emit('click-right')
    }
  }
}
</script>

<style lang="stylus">

$--navbar-height = 2.6rem

.van-nav-bar.hk-navbar--simple
  background transparent
  color #333333
  height $--navbar-height
  line-height $--navbar-height
  .van-icon,
  .van-nav-bar__text
    color #333333
  .van-nav-bar__left
    left 0.8rem
    bottom 0.2rem
    font-size 0.8rem
  .van-nav-bar__right
    right 0.8rem
    bottom 0
    font-size 1.2rem
    span
      font-size 0.7rem

.van-nav-bar.hk-navbar--colorful
  // background-color $--hc-main
  background-image linear-gradient(0deg, #46a7fb 0%, #388cee 100%)
  color #ffffff
  height $--navbar-height
  line-height $--navbar-height
  .van-icon,
  .van-nav-bar__text
    color #ffffff
  .van-nav-bar__left
    left 0.8rem
    font-size 0.8rem
  .van-nav-bar__right
    right 0.8rem
    bottom 0.4rem
    font-size 1.2rem
    span
      font-size 0.7rem
.van-nav-bar:after
  display none

</style>
