<template lang="pug">
hk-panel.line-card(
  :title="title"
  :icon="icon"
  :rightText="rightText"
  :rightIcon="rightIcon"
  @click="changeTimeType"
)
  hk-echarts(:options="options" :width="width" :height="height")
  van-actionsheet(
    v-model="showHandleType"
    :actions="handleTypes"
    get-container="body"
    @select="onSelect"
  )
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'line-card',
  props: {
    title: {
      type: String
    },
    icon: {
      type: String
    },
    // 是否显示更多，true为更多按钮，false为日历选择
    showMore: {
      type: Boolean,
      default: false
    },
    // 时间范围(WEEK,MONTH,MONTH_3) 默认一周
    timeType: {
      type: String,
      default: 'WEEK'
    },
    chartParams: {
      type: Object,
      default: () => {
        return {
          title: '',
          backgroundColor: '#49cfff'
        }
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      width: '100%',
      height: '210px',
      showHandleType: false,
      handleTypes: [
        {
          name: '最近一周',
          value: 'WEEK'
        }, {
          name: '最近一月',
          value: 'MONTH'
        }, {
          name: '最近三月',
          value: 'MONTH_3'
        }
      ]
    }
  },
  computed: {
    rightText () {
      return this.showMore ? '更多' : ''
    },
    rightIcon () {
      return this.showMore ? 'arrow' : 'rili'
    },
    xData () {
      let date = []
      let endTime = this.getTimeRange(new Date())
      let totalNum = 7
      switch (this.timeType) {
        case 'WEEK':
          totalNum = 7
          break
        case 'MONTH':
          totalNum = 30
          break
        case 'MONTH_3':
          totalNum = 90
          break
      }
      for (let i = 0; i < totalNum; i++) {
        let time = endTime - (i * 24 * 3600 * 1000)
        let formatTime = dayjs(time).format('MM-DD')
        date.push(formatTime.replace('-', '.'))
      }
      date = date.sort()
      return date
    },
    yData () {
      let list = this.xData.map(x => {
        let target = this.data.find(item => dayjs(item.countTime).format('MM-DD') === x.replace('.', '-'))
        return target ? target.count : '--'
      })
      return list
    },
    options () {
      return {
        title: {
          text: this.chartParams.title,
          left: 16,
          textStyle: {
            color: '#ffffff',
            fontWeight: 100,
            fontSize: 12
          }
        },
        grid: {
          show: true,
          left: 14,
          top: 0,
          right: 14,
          bottom: 24,
          backgroundColor: this.chartParams.backgroundColor
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#d9d9d9'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#707497',
            // rotate: 40,
            fontSize: 12
          },
          data: this.xData
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          min: function (value) {
            return 0
          },
          max: function (value) {
            return value.max === -Infinity ? 10 : (value.max + 1)
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            inside: true,
            margin: 4,
            padding: [0, 0, 14, 0],
            // showMinLabel: false,
            showMaxLabel: false,
            color: '#ffffff'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#d9d9d9'
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var p = params[0] || {}
            var data = p.data || 0
            return p.name + '<br>' + p.seriesName + '：' + data + '台'
          },
          padding: [6, 8],
          backgroundColor: '#394160',
          extraCssText: 'box-shadow:0 2px 14px 0 rgba(30,32,47,0.56);border-radius:4px;'
        },
        series: [{
          name: '数量',
          type: 'line',
          smooth: true,
          connectNulls: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: '#ffffff'
              }, {
                offset: 1,
                color: '#fafafa'
              }],
              gloabalCoord: false
            },
            width: 2,
            shadowBlur: 1,
            shadowColor: '#f5f5f5'
          },
          itemStyle: {
            color: '#21d3b7',
            borderWidth: 1,
            borderColor: '#fafafa',
            shadowBlur: 2,
            shadowColor: '#f5f5f5'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: '#ffffff'
              }, {
                offset: 1,
                color: '#f5f5f5'
              }]
            },
            opacity: 0.12
          },
          data: this.yData
        }]
      }
    }
  },
  methods: {
    getTimeRange (time = Date.now()) {
      return dayjs(dayjs(time).format('YYYY-MM-DD')).unix() * 1000
    },
    changeTimeType () {
      if (this.showMore) {
        this.$emit('goMore')
      } else {
        this.showHandleType = true
      }
    },
    onSelect (item) {
      this.showHandleType = false
      this.$emit('change', item.value)
    }
  }
}
</script>

<style lang="stylus">
.line-card.hk-panel
  .van-panel__content
    padding 0.6rem 0
</style>
