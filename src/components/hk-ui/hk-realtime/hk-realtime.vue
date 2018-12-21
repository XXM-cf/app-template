<template lang="pug">
span.hk-realtime
  span.hk-realtime-date {{date}}
  span.hk-realtime-time {{time}}
</template>

<script>
export default {
  name: 'hk-realtime',
  data () {
    return {
      date: '',
      time: ''
    }
  },
  mounted () {
    this.timer = setInterval(this.updateTime, 1000)
    this.updateTime()
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    updateTime () {
      let cd = new Date()
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2)
      this.date = this.zeroPadding(cd.getFullYear(), 4) + '年' + this.zeroPadding(cd.getMonth() + 1, 2) + '月' + this.zeroPadding(cd.getDate(), 2) + '日'
    },
    zeroPadding (num, digit) {
      let zero = ''
      for (var i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    }
  }
}
</script>

<style lang="stylus">
.hk-realtime
  font-size 12px
  &-date
    margin-right 8px
</style>
