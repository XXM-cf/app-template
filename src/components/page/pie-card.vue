<template lang="pug">
hk-panel.pie-card(
  :title="title"
  :icon="icon"
)
  hk-echarts(:options="options" :width="width" :height="height")
</template>

<script>
export default {
  name: 'pie-card',
  props: {
    title: {
      type: String
    },
    icon: {
      type: String
    },
    unit: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => {
        return [
          {value: 60, name: '正常设备', color: '#3cf2c9'},
          {value: 20, name: '报警设备', color: '#f87676'},
          {value: 20, name: '故障设备', color: '#ffb749'}
        ]
      }
    }
  },
  data () {
    return {
      width: '100%',
      height: '210px'
    }
  },
  computed: {
    colors () {
      let arr = this.data.map(item => {
        return item.color
      })
      return arr
    },
    labels () {
      let arr = this.data.map(item => {
        return item.name
      })
      return arr
    },
    options () {
      let _this = this
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}' + this.unit + ' ({d}%)'
        },
        color: this.colors,
        legend: {
          orient: 'vertical',
          top: 'center',
          left: '60%',
          itemGap: 20,
          formatter: function (name) {
            return name + '  ' + _this.getValue(name) + _this.unit
          },
          data: this.labels
        },
        series: [
          {
            name: '-',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'inner',
                // formatter: '{d}%',
                formatter: function (params) {
                  let percent = params.percent
                  if (percent === 0) {
                    return ''
                  } else {
                    return percent + '%'
                  }
                },
                textStyle: {
                    fontSize: '12'
                }
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '16'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.data
          }
        ]
      }
    }
  },
  methods: {
    getValue (name) {
      let arr = this.data.filter(item => {
        return item.name === name
      })
      if (arr.length > 0) {
        return arr[0].value
      } else {
        return '--'
      }
    }
  }
}
</script>

<style lang="stylus">
</style>
