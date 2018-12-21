<template lang="pug">
.user
  hk-navbar(
    :title="title"
    left-arrow
    @click-left="$goBack"
  )
  transition(
    :name="transitionName"
  )
    router-view(
      class="user-router"
    )
  tab-bar
</template>

<script>
import TabBar from '~/page/tab-bar'
export default {
  name: 'user',
  components: {
    TabBar
  },
  data () {
    return {
      transitionName: 'slide-right'
    }
  },
  computed: {
    title () {
      return this.$route.meta.title
    }
  },
  watch: {
    '$route' (to, from) {
      let toDepth = to.name
      this.transitionName = toDepth === 'UserList' ? 'slide-right' : 'slide-left'
    }
  },
  mounted () {
    this.$store.dispatch('GetInfo')
  }
}
</script>

<style lang="stylus">
.user
  height 100vh
  &-router
    position absolute
    width 100vw
    height calc(100vh - 5.2rem)
    transition all .6s ease
    top 2.6rem
    bottom 2.6rem
    background #f5f5f5
    overflow-x hidden
</style>
