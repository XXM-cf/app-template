<template lang="pug">
  .hk-calendar
    .hk-calendar-content
      .hk-calendar-top
        li(@click="PreMonth(myDate,false)")
          .arr-left
        li.title {{ dateTop }}
        li(@click="NextMonth(myDate,false)")
          .arr-right
      .hk-calendar-tag
        .item(
          v-for="(tag, index) in textTop"
          :key="index"
        )
          .item-tag {{ tag }}
      .hk-calendar-date
        .item(
          v-for="(item, index) in list"
          :key="index"
          @click="clickDay(item,index)"
        )
          .item-date(
            :class="[{ 'hk-calendar--isMark': item.isMark},{'hk-calendar--otherDayhide':item.otherMonth!=='nowMonth'},{'hk-calendar--wantDayhide':item.dayHide},{'hk-calendar--isToday':item.isToday},{'hk-calendar--choseDay':item.chooseDay},setClass(item)]"
          ) {{ item.id }}
</template>
<script>
import timeUtil from './calendar'
export default {
  data () {
    return {
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: ''
    }
  },
  props: {
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    textTop: {
      type: Array,
      default: () => ['日', '一', '二', '三', '四', '五', '六']
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    agoDayHide: { type: String, default: `0` },
    futureDayHide: { type: String, default: `2554387200` }
  },
  created () {
    this.intStart()
    this.myDate = new Date()
  },
  methods: {
    intStart () {
      timeUtil.sundayStart = this.sundayStart
    },
    setClass (data) {
      let obj = {}
      obj[data.markClassName] = data.markClassName
      return obj
    },
    clickDay: function (item, index) {
      if (item.otherMonth === 'nowMonth' && !item.dayHide) {
        this.getList(this.myDate, item.date)
      }
      if (item.otherMonth !== 'nowMonth') {
        item.otherMonth === 'preMonth'
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date)
      }
    },
    ChoseMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = new Date(date)
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    PreMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'preMonth')
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    NextMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'nextMonth')
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    forMatArgs: function () {
      let markDate = this.markDate
      let markDateMore = this.markDateMore
      markDate = markDate.map((k) => {
        return timeUtil.dateFormat(k)
      })
      markDateMore = markDateMore.map((k) => {
        k.date = timeUtil.dateFormat(k.date)
        return k
      })
      return [markDate, markDateMore]
    },
    getList: function (date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs()
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`
      let arr = timeUtil.getMonthList(this.myDate)
      for (let i = 0; i < arr.length; i++) {
        let markClassName = ''
        let k = arr[i]
        k.chooseDay = false
        const nowTime = k.date
        const t = new Date(nowTime).getTime() / 1000
        // 看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || ''
          }
        }
        // 标记选中某些天 设置class
        k.markClassName = markClassName
        k.isMark = markDate.indexOf(nowTime) > -1
        // 无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide
        if (k.isToday) {
          this.$emit('isToday', nowTime)
        }
        let flag = !k.dayHide && k.otherMonth === 'nowMonth'
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit('choseDay', nowTime)
          this.historyChose.push(nowTime)
          k.chooseDay = true
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime && !chooseDay && flag
        ) {
          k.chooseDay = true
        }
      }
      this.list = arr
    }
  },
  mounted () {
    this.getList(this.myDate)
  },
  watch: {
    markDate: {
      handler (val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    markDateMore: {
      handler (val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    agoDayHide: {
      handler (val, oldVal) {
        this.agoDayHide = parseInt(val)
        this.getList(this.myDate)
      },
      deep: true
    },
    futureDayHide: {
      handler (val, oldVal) {
        this.futureDayHide = parseInt(val)
        this.getList(this.myDate)
      },
      deep: true
    },
    sundayStart: {
      handler (val, oldVal) {
        this.intStart()
        this.getList(this.myDate)
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="stylus">

.hk-calendar
  max-width 410px
  margin auto
  &-content
    font-family -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif
    background-color #f6f7f9
    width 100%
    overflow hidden
    padding-bottom 8px
  li
    list-style-type none
  .hk-calendar-top
    display flex
    background #ffffff
    box-shadow 0 3px 6px 0 rgba(0,0,0,0.03)
    li
      display flex
      color #333
      font-size 18px
      flex 1
      justify-content center
      align-items center
      height 47px
    .title
      flex 2.5
    .arr-left
      width 12px
      height 12px
      border-top 2px solid #999999
      border-left 2px solid #999999
      transform rotate(-45deg)
    .arr-right
      width 12px
      height 12px
      border-top 2px solid #999999
      border-right 2px solid #999999
      transform rotate(45deg)

    .arr-left:active,
    .arr-right:active
      border-color: #ddd
  .hk-calendar-tag,
  .hk-calendar-date
    display flex
    flex-wrap wrap
    padding 0 3% 0 3%
    width 100%
  .item
    font-size: 14px
    width: 13.4%
    text-align: center
    color: #666
    position: relative
    height 40px
    .item-tag,
    .item-date
      width 40px;
      height 40px
      line-height 40px
      margin auto
      display flex
      justify-content center
      align-items center
  .hk-calendar-tag
    position relative
    &:after
      content ''
      position absolute
      width 100%
      height 1px
      bottom 0
      right 0
      transform-origin 0 0
      transform scaleY(.5)
      background #cccccc
  .hk-calendar--isMark
    margin auto
    border-radius 100px
    background blue
    z-index 2
  .hk-calendar--otherDayhide
    color #bfbfbf
  .hk-calendar--wantDayhide
    color #bfbfbf
  .hk-calendar--isToday
    background #f1ebeb
  .hk-calendar--choseDay
    background #cccccc
    border-radius 50%

  // .wh_content:first-child .wh_content_item_tag,
  // .wh_content:first-child .wh_content_item
  //   color #ddd
  //   font-size 16px

</style>
