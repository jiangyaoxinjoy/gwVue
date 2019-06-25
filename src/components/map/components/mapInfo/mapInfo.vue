<template>
  <div class="info">
    <div style="background:#eee;padding: 5px;position: relative;">
      <transition name="fade">
        <Card>
          <div slot="title" class="card_title">
            <Icons class="card_icon" slot="icon" :size="45" type="shuiyaxiaxian" />
            <p>
              {{alarmInfo.alarm_type | alarmTypeFilter}}
              <Tag class="tag" type="border">{{ ifReceive}}</Tag>
              </br> <span class="extra_line">{{alarmText}}</span>
            </p>
          </div>
          <p slot="extra">{{alarmInfo.send_time | timeFilter}}</p>
          <Divider class="divider" orientation="left">地址</Divider>
          <p>{{alarmInfo.address}}</p>
          <Divider class="divider" orientation="left">联系人和联系方式</Divider>
          <CellGroup>
            <Cell v-for="item in alarmInfo.teles" :key="item.Id" :title="item.real_name" :extra="item.phone"/>
          </CellGroup>
          <template v-if="alarmInfo.alarm_type == 10 || alarmInfo.alarm_type == 20">
            <Button class="history_btn" @click="historyBtnClick" type="warning" long>{{showModal ? '关闭' : '显示'}}{{alarmInfo.alarm_type | alarmHistory}}</Button>
          </template>
          <div class="step_wrap">
            <div v-for="item in alarmInfo.notify_infos" :key="item.name" v-if="item.data != null" class="step_block">
              <p>
                <Tag color="orange">{{item.name}}</Tag>
                <span class="tel">{{item.phone}}</span>
              </p>
              <div v-for="notify in item.data" :key="notify.Id">
                <Steps
                  :current="notify.state == 1 ? 3 : 2"
                  :status="notify.state == 1 ? 'finish' : 'error'"
                  size='small'
                >
                  <Step class="stepitem" :title="notify.sendtime | time"></Step>
                  <Step class="stepitem" :title="notify.type | notifyTypeMethod"></Step>
                  <Step class="stepitem" :title="[notify.receivetime, notify.state] | stateFilter"></Step>
                </Steps>
              </div>
              <Button class="step_btn" type="default" long @click="allNotify(item)">
                查看全部
              </Button>
            </div>
          </div>
        </Card>
       </transition>
    </div>
    <!-- <template v-if="historyModal">

    </template> -->
    <indexModal :modalShow="showModal" :deviceId="alarmInfo.deviceId" @hideModal="showModal = false" :alarmType="alarmInfo.alarm_type"></indexModal>
    <Modal
      v-model="notifyModal"
      class="notifyModal"
      :footer-hide="true">
      <div slot="header" class="header">
        <h3> {{notifyData.name}} <span>{{notifyData.tel}}</span></h3>
      </div>
      <div class="content">
        <div v-for="notify in notifyData.list" class="wrap" :key="notify.Id">
          <Steps
            :current="notify.state == 1 ? 3 : 2"
            :status="notify.state == 1 ? 'finish' : 'error'"
            size='small'
          >
            <Step class="stepitem" :title="notify.sendtime | time"></Step>
            <Step class="stepitem" :title="notify.type | notifyTypeMethod"></Step>
            <Step class="stepitem" :title="[notify.receivetime, notify.state] | stateFilter"></Step>
          </Steps>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Icons from '_c/icons/'
import indexModal from '../modal/modal.vue'
import { RiQi, RiQiTime } from '@/libs/util'
import { mapActions } from 'vuex'
export default {
  name: 'mapInfo',
  props: {
    alarmInfo: Object
  },
  components: {
    Icons,
    indexModal
  },
  data () {
    return {
      // historyModal: false,
      showModal: false,
      notifyModal: false,
      notifyData: {
        list: [],
        name: '',
        tel: '',
        value: 1
      },
      showTels: false
    }
  },
  methods: {
    ...mapActions(['getUserNotifyHistory']),
    allNotify (item) {
      console.log(item)
      this.notifyModal = true
      this.getUserNotifyHistory({ 'device_id': item.data[0].device_id, 'user_id': item.data[0].user_id })
        .then(res => {
          this.notifyData.list = res
          this.notifyData.name = item.name
          this.notifyData.tel = item.phone
        })
    },
    historyBtnClick () {
      // this.historyModal = true
      this.showModal = !this.showModal
    }
  },
  computed: {
    alarmText () {
      let val = this.alarmInfo.alarm_type
      // console.log(val)
      let text = ''
      switch (val) {
        case '10':
          let cola = this.alarmInfo.cola === -1 ? 0 : this.alarmInfo.cola
          text = '水压' + cola + 'Mpa 阈值' + this.alarmInfo.value1 + '~' + this.alarmInfo.value2
          break
        case '20':
          text = '阀门打开' + this.alarmInfo.cola + '圈'
          break
        case '30':
          text = ''
          break
        case '70':
          text = ''
          break
        default:
          text = ''
          break
      }
      return text
    },
    ifReceive () {
      let flag = true
      if (this.alarmInfo.notify_infos !== 'undefined') {
        this.alarmInfo.notify_infos.forEach(ele => {
          if (ele.data === null) {
            flag = false
          } else {
            (function (item) {
              item.forEach(val => {
                if (val.state === 0) {
                  flag = false
                }
              })
            })(ele.data)
          }
        })
        if (!flag) {
          return '通知未到达'
        } else {
          return '通知已到达'
        }
      }
    }
  },
  filters: {
    stateFilter: function ([time, state]) {
      if (state === 0 && time === 0) {
        return '发送中'
      } else if (state === 1) {
        return RiQiTime(time)
      } else {
        return '失败'
      }
    },
    time: function (value) {
      if (value === 0) {
        return ''
      }
      let time = RiQiTime(value)
      return time
    },
    timeFilter: function (value) {
      return RiQi(value)
    },
    notifyTypeMethod: function (value) {
      let method = ''
      switch (value) {
        case 1:
          method = '短信'
          break
        case 2:
          method = '微信'
          break
        default:
          method = ''
          break
      }
      return method
    },
    alarmHistory: function (value) {
      let method = ''
      switch (value) {
        case '10':
          method += '水压历史数据'
          break
        default:
          method += '历史数据'
          break
      }
      return method
    }
  }
}
</script>
<style lang="less">
@import "mapInfo.less";
</style>
<style type="text/css">
  .ivu-cell{
    padding: 2px 16px;
  }
</style>
