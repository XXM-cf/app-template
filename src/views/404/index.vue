<template lang="pug">
.error404
  img(src="~@/assets/images/404.png")
  span 页面开发中
</template>

<script>
export default {
  name: 'error404',
  data () {
    return {
    }
  },
  mounted () {
    this.$hekr.setTitle('404')
  }
}
</script>

<style lang="stylus">
.error404
  height 100vh
  display flex
  flex-direction column
  justify-content flex-start
  align-items center
  img
    margin 40px 0 20px
  span
    font-size 14px
    color #666666
</style>
