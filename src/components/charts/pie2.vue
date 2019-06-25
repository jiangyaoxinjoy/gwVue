<template>
  <div ref="dom" class="charts chart-pie"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartPie',
  props: {
    value: Array,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    this.$nextTick(() => {
      // let legend = this.value.map(_ => _.name)
      let option = {
        title: { // 标题设置
          text: this.text,
          subtext: this.subtext,
          x: 'left',
          textStyle: {
            fontSize: 18,
            fontWeight: 'normal',
            color: '#fff'
          }
	      },
        graphic: { // 图形中间文字
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: parseInt(this.value[1].value / this.value[0].value) + '%',
            textAlign: 'center',
            fill: '#fff',
            fontSize: 20
          }
        },
        series: [ // 值域设置
          {
          	name: '生源地',
            type: 'pie',
            radius: ['50%', '70%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            avoidLabelOverlap: false,
            // center: ['50%', '60%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: this.value,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true,
                formatter: '{b}{c}',
                textStyle: {
                  fontSize: '12',
                  fontWeight: 'normal'
                }
              }
            },
            labelLine: { // 设置值域的那指向线
              normal: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(30, 144, 255，0.5)'
              }
            }
          }
        ]
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
