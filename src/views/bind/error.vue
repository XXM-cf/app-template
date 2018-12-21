<template lang="pug">
.bind-error
  .bind-error-icon
    img(
      src="~@/assets/images/add-error.png"
    )
  .bind-error-content
    p {{ errorText }}
</template>

<script>
export default {
  name: 'bindError',
  data () {
    return {
      title: '添加失败',
      people: '',
      code: '',
      desc: '',
      codeLists: {
        5400000: '未知错误',
        5400004: '授权关系已存在',
        5400005: '授权关系不存在',
        5400006: '因网络原因绑定失败',
        5400007: '因超时原因绑定失败',
        5400008: '无法绑定其他厂商设备',
        5400011: '设备授权次数达到上限',
        5400012: '因内部错误绑定失败',
        5400013: '因重复绑定绑定失败',
        5400014: '设备不属于用户',
        5400024: '未找到设备',
        5400045: '短码或者短码密码错误',
        5400047: '无权修改其他用户绑定设备',
        5400043: '设备无法强制绑定',
        5500000: '内部错误',
        6400001: '请求已经被同意或拒绝',
        6400002: '设备此时已经不属于该授权者',
        6400003: '只有属主可以授权设备给其他人',
        6400004: '指定devTid的设备不存在',
        6400016: '操作没有权限',
        6400017: '参数错误',
        8400002: '请扫描正确的二维码',
        1400022: '未找到设备',
        120400005: '设备不存在',
        120400014: '设备已绑定'
      }
    }
  },
  computed: {
    errorText () {
      if (this.people !== '') {
        return '该设备已被' + this.people + '账户绑定'
      } else if (this.code !== '' && this.code !== 8400002) {
        return '绑定失败（原因：' + (this.codeLists[this.code] || this.code) + '）'
      } else if (this.code === 8400002) {
        return '绑定失败（原因：' + this.desc + '）'
      } else {
        return '绑定失败'
      }
    }
  },
  mounted () {
    this.$hekr.setTitle('绑定失败')
    if (this.$route.query.people) {
      this.people = this.$route.query.people
    }
    if (this.$route.query.code) {
      this.code = this.$route.query.code
      this.desc = this.$route.query.desc
    }
  }
}
</script>

<style lang="stylus">
.bind-error
  height 100vh
  position relative
  &-icon
    position absolute
    width 40%
    top 30%
    left 30%
    z-index 3
    transform translateY(-70%)
    img
      width 100%
  &-content
    position absolute
    top 30%
    left 5%
    width 90%
    padding 3rem 1rem
    background-image linear-gradient(-90deg, #69cff6 3%, #40a0f6 100%)
    box-shadow 0 3px 6px 0 rgba(0,0,0,0.10)
    border-radius 5px
    text-align center
    font-size 0.8rem
    color #fff

</style>
