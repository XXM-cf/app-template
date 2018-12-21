<template lang="pug">
.hk-timeline
  hk-timeline-item(
    v-for="item, index in list",
    :key="index",
    :data="item",
    :textOverFlow="textOverFlow"
  )
  //- p(
  //-   v-if="list.length === 0"
  //-   class="hk-timeline-nodata"
  //- ) 暂无数据
</template>

<script>
import HkTimelineItem from './hk-timeline-item'

export default {
  name: 'HkTimeline',
  components: {
    HkTimelineItem
  },
  props: {

    // 示例：
    // [{
    //   date: new Date(),
    //   text: '这里还应该是告警信息',
    //   done: true
    // }]
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    textOverFlow: Boolean
  },

  computed: {
    timelineStyles () {
      return {
        'min-height': `${this.minHeight}px`
      }
    },

    list () {
      let newItems = [ ...this.items ]
      return newItems
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .reduce((list, current) => {
          const prev = list[list.length - 1] || {}
          const { date, text = '', done = false } = current
          const year = date.getFullYear()
          const month = date.getMonth() + 1
          const day = date.getDate()
          const week = date.getDay()
          const hour = date.getHours()
          const minute = date.getMinutes()

          const isSameDay = year === prev.year &&
              month === prev.month &&
              day === prev.day

          if (isSameDay) {
            prev.items.push({
              hour,
              minute,
              text,
              done
            })
          } else {
            list.push({
              year,
              month,
              day,
              week,
              items: [{
                hour,
                minute,
                text,
                done
              }]
            })
          }
          return list
        }, [])
    }
  }
}
</script>

<style lang="stylus">
.hk-timeline
  width 100%
  overflow hidden
  position relative
  &-nodata
    text-align center
    margin-top 2rem
    color #b3b3b3
</style>
