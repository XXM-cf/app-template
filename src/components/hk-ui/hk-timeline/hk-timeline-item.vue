<template lang="pug">
.hk-timeline-item
  .hk-timeline-item-datetime
    .hk-timeline-item-day(
      :class="{ 'hk-timeline-item-done': done }"
    ) {{ data.day | prefix }}
    .hk-timeline-item-date
      .hk-timeline-item-week 星期{{ weekMap[data.week] }}
      .hk-timeline-item-year {{ data.year }}年{{ data.month | prefix }}月

  .hk-timeline-item-info(
    v-for='item in data.items',
    :class="{ 'hk-timeline-item-done': item.done }"
  )
    .hk-timeline-item-icon
      .hk-timeline-item-dot

    .hk-timeline-item-time {{ item.hour | prefix }}:{{ item.minute | prefix }}

    .hk-timeline-item-text(:class="{ 'hk-timeline-item-text-overflow': textOverFlow }")
      .hk-timeline-item-text-child(v-for="t in item.text") {{ t }}
</template>

<script>
export default {
  name: 'HkTimelineItem',

  props: {
    data: {
      type: Object,
      required: true
    },
    textOverFlow: Boolean
  },

  data () {
    return {
      weekMap: {
        0: '日',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六'
      }
    }
  },

  computed: {
    done () {
      return this.data.items.every(item => item.done)
    }
  },

  filters: {
    prefix (raw) {
      return (String(raw).length < 2 ? '0' : '') + raw
    }
  }
}
</script>

<style lang="stylus">
.hk-timeline-item
  width 100%
  padding 10px 15px
  overflow hidden

  &:not(:last-child)
    border-bottom 1px solid #e1e1e1

  &-datetime
    display flex
    align-items center
    margin-bottom 5px

  &-day
    margin-right 10px
    font-weight lighter
    font-size 1.8rem
    color #666666

  &-week
    padding-bottom 2px
    // font-size 14px
    // color #666
    color #999999
    font-size 0.6rem

  &-year
    font-size 0.6rem
    color #999999

  &-info
    display flex
    font-size 0.7rem
    color #ff0200
    position relative
    &:not(:last-child)
      &:after
        position absolute
        left 24px
        top 0px
        margin-left -1px
        display block
        width 1px
        height 100%
        border-left 1px solid #ccc
        content ""
        margin-top 10px

    &.hk-timeline-item-done
      color #b3b3b3

      .hk-timeline-item-dot
        background #ccc

  &-icon
    position relative
    display flex
    flex 0 0 53px
    justify-content center
    // margin-right 10px

  &-dot
    circle 7px
    // margin-top 5px
    background #ff0200
    width 7px
    height 7px
    border-radius 100%
    position absolute
    left 20px
    top 7px
    z-index 20

  &-time
    margin-right 10px
    padding-top 2px

  &-text
    padding-bottom 20px
    padding-top 2px

    &&-overflow
      text-overflow()
</style>
