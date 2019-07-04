<template>
  <Modal
    v-model="show"
    :title="title"
    :footer-hide="true"
    @on-cancel="cancel"
    width="80%"
  >
    <template v-if="alarmType == '20'">
      <Table height="600" :columns="columns" :data="openTableData"></Table>
    </template>
    <template v-if="alarmType == '10'">
      <Row class="modalrow">
        <RadioGroup v-model="selectTime" @on-change="changeTime">
          <Radio :label="5">全部</Radio>
          <Radio :label="1">本周</Radio>
          <Radio :label="2">上周</Radio>
          <Radio :label="3">本月</Radio>
          <Radio :label="4">上月</Radio>
        </RadioGroup>
      </Row>
      <Tabs :value="historyForm.showType" v-if="show">
        <TabPane label="图形" name="1">
          <chart-line style="height: 300px;" :value="lineData" :value2="value2" :value1="value1"/>
        </TabPane>
        <TabPane label="数据" name="2">
          <Table :columns="lineColumns" :data="lineTableData" height="500">
            <template slot="value1">
              <span>{{this.value1}}</span>
            </template>
            <template slot="value2">
              <span>{{this.value2}}</span>
            </template>
          </Table>
        </TabPane>
    </Tabs>
    </template>
</Modal>
</template>
<script>
import { ChartLine } from '_c/charts/index'
import { mapActions } from 'vuex'
import { RiQi, RiQiYear } from '@/libs/util'
export default {
  name: 'indexModal',
  props: {
    modalShow: {
      type: Boolean,
      default: false
    },
    alarmType: {
      type: String
    },
    deviceId: {
      type: String
    }
  },
  components: {
    ChartLine
  },
  data () {
    return {
      columns: [
        {
          title: '打开圈数',
          key: 'cola',
          minWidth: 90
        },
        {
          title: '发生时间',
          key: 'sendtime',
          minWidth: 160,
          render: (h, params) => {
            var time = RiQiYear(params.row.sendtime)
            return h('span', time)
          }
        },
        {
          title: '预估出水量',
          key: '',
          minWidth: 120
        },
        {
          title: '持续时间(秒)',
          key: 'colc',
          minWidth: 120,
          render: (h, params) => {
            var time = params.row.colc / 1000
            return h('span', time)
          }
        },
        {
          title: '记录时间',
          key: 'createtime',
          minWidth: 170,
          render: (h, params) => {
            if (params.row.createtime === '0001-01-01T00:00:00Z') {
              return h('span', '')
            }
            let time = params.row.createtime.replace('T', ' ')
            let stime = time.split('+')[0]
            return h('span', stime)
          }
        }
      ],
      openTableData: [],
      selectTime: 4,
      historyForm: {

        showType: '1'
      },
      lineData: {},
      value1: '',
      value2: '',
      lineTableData: [],
      lineColumns: [
        {
          title: '发生时间',
          key: 'sendtime',
          render: (h, params) => {
            var time = RiQiYear(params.row.sendtime)
            return h('span', time)
          }
        },
        {
          title: '水压(Mpa)',
          key: 'pressure_value'
        },
        {
          title: '阀值下限',
          slot: 'value1'
        },
        {
          title: '阀值上限',
          slot: 'value2'
        }
      ]
    }
  },
  computed: {
    show: {
      get: function (argument) {
        return this.modalShow
      },
      set: function () {

      }
    },
    title () {
      if (this.alarmType === 10) {
        return '水压历史数据'
      } else if (this.alarmType === 20) {
        return '栓帽打开历史数据'
      } else {
        return '历史数据'
      }
    }
  },
  watch: {
    // deviceId(val) {
    //   this.initPressureData()
    // }
    modalShow: {
      handler (val) {
        if (val) {
          if (this.alarmType === '10') {
            this.initPressureData()
          }
          if (this.alarmType === '20') {
            this.initOpenData()
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(['getDevicePressurehistory', 'getDeviceOpenhistory']),
    cancel () {
      this.$emit('hideModal', true)
    },
    getData () {
      // this.$store.dispatch('getOpenData').then(res => {
      //   this.tableData = res
      // })
    },
    initPressureData () {
      this.getDevicePressurehistory({ 'device_id': this.deviceId, 'selectTime': this.selectTime }).then(res => {
        // console.log(res)
        this.lineData = {}
        if (res.list != null) {
          this.lineTableData = res.list
          res.list.forEach((val, key) => {
            let data = RiQi(val.sendtime)
            this.lineData[data] = val.pressure_value
          })
          this.value1 = res.value1
          this.value2 = res.value2
        }
      })
    },
    initOpenData () {
      this.getDeviceOpenhistory({ 'device_id': this.deviceId }).then(res => {
        console.log(res)
        if (res != null) {
          this.openTableData = res
        }
      })
    },
    changeTime () {
      this.initPressureData()
    }
  },
  mounted () {
    this.getData()
    // this.initPressureData()
  }
}
</script>
<style lang="less" scoped="true">
@import './modal.less';
</style>
