// import mapInfo from './mapInfo.vue'
// export default mapInfo
import Vue from 'vue'
import Icons from '_c/icons/'
import indexModal from '../modal/modal.vue'
export let MapInfoComponent = Vue.extend({
  template: `<div class="info">
    <div style="background:#eee;padding: 8px">
      <Card>
       
        <div slot="title" class="card_title">  
          <p>{{alarmInfo.record.alarm_type | alarm-type-filter}} </br> <span>没找到对应内容</span></p>
        </div>
        <p slot="extra">{{alarmInfo.record.added_on | timeFilter}}</p>
        <Divider orientation="left">地址</Divider>
        <p>{{alarmInfo.record.address}}</p>
        <Divider orientation="left">位置</Divider>
        <p>{{alarmInfo.record.address}}</p>
        <Divider orientation="left">联系人和联系方式</Divider>
        <p>{{alarmInfo.teles[0]}}</p>
        <!-- <Collapse accordion>
          <Panel name="1">
            联系人和联系方式
            <p slot="content">{{alarmInfo.teles[0]}}</p>
          </Panel>
        </Collapse> -->
        <Button class="history_btn" @click="showModal = !showModal" type="primary" long>{{showModal ? '关闭' : '显示'}}{{alarmInfo.record.alarm_type | alarmHistory}}</Button>
        <div class="step_wrap">
          <Steps :current="2" status="error" v-for="item in alarmInfo.tele_infos" size='small'>
            <Step :title="item.tele_info.added_on | time"></Step>
            <Step :title="item.tele_info.alarm_method | alarmMethod"></Step>
            <Step :title="item.tele_info.respone_on | time"></Step>
          </Steps>
        </div>
      </Card>
    </div>
  </div>`,
  props: ['alarmInfo'],
  data () {
    return {
      showModal: false
    }
  },
  methods: {

  },
  filters: {
    time: function (value) {
      var substr = value.match(/T(\S*):/)
      // return value.replace('T', " ")
      return substr[1]
    },
    timeFilter: function (value) {
      var index1 = value.indexOf('-')
      var index2 = value.lastIndexOf(':')
      var str = value.slice(index1 + 1, index2).replace('T', ' ')
      return str
    },
    alarmMethod: function (value) {
      let method = ''
      switch (value) {
        case 1:
          method = '电话'
          break
        case 2:
          method = '邮件'
          break
        case 3:
          method = '短信'
          break
        default:
          method = '短信'
          break
      }
      return method
    },
    alarmHistory: function (value) {
      let method = ''
      switch (value) {
        case 'OPEN':
          method += '阀门历史数据'
          break
        case 'PL':
          method += '水压历史数据'
          break
        case 'DUMPING':
          method += '倾倒历史数据'
          break
        default:
          method += '历史数据'
          break
      }
      return method
    }
  }
})
