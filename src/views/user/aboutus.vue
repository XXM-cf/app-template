<template lang="pug">
.aboutus
  .aboutus-logo
    img(
      src="~@/assets/images/logo.png"
    )
  .aboutus-content
    .aboutus-content-text
      p 杭州第九区科技有限公司成立于2013年，是一支由物联网、移动互联网、云计算等专业人士组成的精英团队。
      p 核心技术团队均来自阿里云、微软等顶尖互联网企业，并引入传统行业专家，深耕智慧城市领域。
      p 公司着眼于智慧城市公共安全领域，提供从设备端到云平台的物联网服务。
      p 公司秉承着“客户第一，技术创新，团队协作”的企业文化，致力于提供安全、可靠、值得信赖的物联网软硬件产品。
      p 经过多年在城市公共安全领域的探索与耕耘，公司已经服务了上百家客户，服务对象包括政府、企业、社会单位等，并获得杭州市高新技术企业，“雏鹰计划”企业，阿里云金牌合作伙伴等荣誉，得到业内合作伙伴高度认可。
  .aboutus-tips
    .aboutus-tips-name 消防APP
      span(v-if="isTest") (Test)
    .aboutus-tips-version {{ version }}
</template>

<script>
export default {
  name: 'UserAboutus',
  data () {
    return {
      infos: {}
    }
  },
  computed: {
    isTest () {
      return process.env.API_ENV === 'test'
    },
    version () {
      return process.env.VERSION_ENV + ' (build: ' + process.env.BUILDTIME_ENV + ')'
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus">
.aboutus
  &-logo
    width 3.6rem
    height 3.6rem
    position absolute
    top 3.2rem
    left 50%
    transform translate(-50%, -50%)
    border-radius 50%
    background #ffffff
    overflow hidden
    z-index 6
    img
      width 100%
  &-content
    height calc(100% - 7rem)
    margin 3.2rem 0.8rem 0.8rem
    padding 2rem 1rem 1rem
    background #ffffff
    box-shadow 0 2px 6px 0 rgba(82,82,82,0.15)
    border-radius 5px
    position relative
    &-text
      width 100%
      height 100%
      overflow-x hidden
    p
      text-indent 2em
      font-size 0.7rem
      color #333333
      line-height 1.2rem
      margin 0.4rem 0 0 0
  &-tips
    position absolute
    bottom 0.6rem
    font-size 14px
    width 100%
    text-align center
    color #333333
    &-version
      margin-top 8px
</style>
