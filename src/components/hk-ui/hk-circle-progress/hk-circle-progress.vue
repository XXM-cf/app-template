<template lang="pug">
.hk-circle-progress
  svg(
    :width="radius"
    :height="radius"
    viewBox="0 0 100 100"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  )
    circle.progress-background(
      r="50"
      cx="50"
      cy="50"
      fill="transparent"
    )
    circle.progress-bar(
      :class="{'anime': anime}"
      r="50"
      cx="50"
      cy="50"
      fill="transparent"
      :stroke-dasharray="dashArray"
      :stroke-dashoffset="dashOffset"
    )
  .progress-text {{ text }}
</template>

<script>
export default {
  name: 'hk-circle-progress',
  props: {
    radius: {
      type: Number,
      default: 100
    },
    percent: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      default: ''
    },
    anime: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dashArray: Math.PI * 100
    }
  },
  computed: {
    dashOffset () {
      return (1 - this.percent) * this.dashArray
    }
  }
}
</script>

<style lang="stylus">
.hk-circle-progress
  position relative
  width 100px
  height 100px
  svg
    position absolute
    width 100%
    height 100%
    left 0
    top 0
  .progress-text
    position absolute
    width 100%
    top 50%
    left 0
    color #333333
    transform translateY(-50%)
  circle
    stroke-width 8px
    transform-origin center
    &.progress-background
      transform scale(0.9)
      stroke #cccccc
    &.progress-bar
      transform scale(0.9) rotate(-90deg)
      stroke #46a7fb
  circle.anime
    transition stroke-dashoffset 1s linear
</style>
