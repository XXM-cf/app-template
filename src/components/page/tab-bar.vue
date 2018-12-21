<template lang="pug">
hk-tabbar(
  v-model="active"
  :tabs="tabs"
  @change="goPage"
)
</template>
<script>
export default {
  name: 'TabBar',
  data () {
    return {
      // active: 'home',
      tabs: [
        {
          value: 'Home',
          desc: '首页',
          icon: 'zhuye'
        }, {
          value: 'User',
          desc: '我的',
          icon: 'wo'
        }
      ]
    }
  },
  computed: {
    active: {
      get () {
        let path = this.$route.path
        let curPath = path.split('/')[1]
        if (curPath === 'user') {
          return 'User'
        } else {
          return 'Home'
        }
      },
      set (val) {}
    }
  },
  methods: {
    goPage (name) {
      this.$router.replace({ name })
    }
  }
}
</script>
<style lang="stylus">
</style>
