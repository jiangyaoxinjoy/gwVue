<template>
  <div ref="dom" class="charts chart-line"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartLine',
  props: {
    value: Object,
    value1: String,
    value2: String
  },
  data () {
    return {
      dom: null
    }
  },
  watch: {
    value () {
      this.initChart()
      // this.dom.resize()
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    initChart () {
      this.$nextTick(() => {
        let xAxisData = Object.keys(this.value)
        let seriesData = Object.values(this.value)
        var value1 = []
        var value2 = []
        seriesData.forEach(() => {
          value1.push(this.value1)
          value2.push(this.value2)
        })
        let option = {
          tooltip: {
            trigger: 'axis'
          },
          //   // calculable : true,
          legend: {
            data: ['阀值上限', '阀值下限', '水压'],
            x: 'center'
          },
          xAxis: {
          // type: 'category',
          // boundaryGap: false,
            data: xAxisData
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '阀值上限',
              type: 'line',
              smooth: false,
              data: value2,
              lineStyle: {
                type: 'dashed'
              }
            },
            {
              name: '阀值下限',
              type: 'line',
              smooth: false,
              data: value1,
              lineStyle: {
                type: 'dashed'
              }
            },
            {
              name: '水压',
              type: 'line',
              data: seriesData
            }
          ]
        }
        this.dom = echarts.init(this.$refs.dom, 'tdTheme')
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
