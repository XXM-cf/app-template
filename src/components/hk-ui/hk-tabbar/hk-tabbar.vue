<template lang="pug">
van-tabbar(
  v-model="active"
  :class="'hk-tabbar--' + theme"
  v-bind="$attrs"
  @change="change"
)
  van-tabbar-item(
    v-for="(tab, index) in tabs"
    :key="index"
    :icon="tab.icon"
  ) {{ tab.desc }}
</template>

<script>
export default {
  name: 'hk-tabbar',
  props: {
    value: {},
    // 格式 value, desc, icon
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 主题 simple, colorful
    theme: {
      type: String,
      default: 'simple'
    }
  },
  computed: {
    active: {
      get () {
        let index = this.tabs.map(item => item.value).indexOf(this.value)
        return index
      },
      set (val) {
        let value = this.tabs[val].value
        this.$emit('input', value)
      }
    }
  },
  methods: {
    change (index) {
      let value = this.tabs[index].value
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="stylus">

$--tabbar-height = 5rem

.van-tabbar
  .van-tabbar-item
    .van-tabbar-item__icon
      font-size 1.2rem
      margin-bottom 0.4rem
    .van-tabbar-item__text
      font-size 0.7rem
.van-tabbar:after
  display none

// 多彩模式
.van-tabbar.hk-tabbar--colorful
  height $--tabbar-height
  background-color $--hc-main
  .van-tabbar-item
    color #c7d2ff
  .van-tabbar-item--active
    color #ffffff
    .van-tabbar-item__icon
      font-size 1.4rem
// 简单模式
.van-tabbar.hk-tabbar--simple
  height 2.6rem
  .van-tabbar-item
    color #999999
  .van-tabbar-item--active
    color #1968eb
</style>
