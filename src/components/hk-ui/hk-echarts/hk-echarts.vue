<template lang="pug">
.hk-echarts(:style="getStyle")
</template>

<script>
// 引入基本模板
import echarts from 'echarts/lib/echarts'
// 引入折线图组件
import 'echarts/lib/chart/line'
// 引入饼图组件
import 'echarts/lib/chart/pie'
// 引入提示框和title组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
// 引入legend模块
import 'echarts/lib/component/legend'
// import 'echarts/lib/component/grid'

export default {
  name: 'hk-echarts',
  props: {
    options: {
      type: Object
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  computed: {
    getStyle () {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  mounted () {
    this.chart = echarts.init(this.$el)
    this.setOption()
    window.addEventListener('resize', this.resize)
  },
  destroyed () {
    window.removeEventListener('resize', this.resize)
  },
  watch: {
    options: 'setOption'
  },
  methods: {
    resize () {
      this.chart.resize()
    },
    setOption () {
      if (this.options) this.chart.setOption(this.options)
    }
  }
}
</script>
