<template>
  <div class="info">
    <div style="background:#eee;padding: 5px;position: relative;">
      <transition name="fade">
        <Card>
          <div slot="title" class="card_title">
            <Icons class="card_icon" slot="icon" :size="45" type="shuiyaxiaxian" />
            <p>
              {{alarmInfo.alarm_type | alarmTypeFilter}}
              <Tag class="tag" type="border">{{ alarmInfo.isnotify == 0 ? '通知未到达' : '通知已到达'}}</Tag>
              </br> <span class="extra_line">{{alarmText}}</span>
            </p>
          </div>
          <p slot="extra">{{alarmInfo.send_time | timeFilter}}</p>
          <Divider class="divider" orientation="left">地址</Divider>
          <p>{{alarmInfo.address}}</p>
          <Divider class="divider" orientation="left">联系人和联系方式</Divider>
          <div class="ivu-cell-group" v-for="item in alarmInfo.teles" :key="item.Id">
            <div class="ivu-cell">
              <div class="ivu-cell-link">
                <div class="ivu-cell-item">
                  <div class="ivu-cell-icon"></div> 
                  <div class="ivu-cell-main">
                    <div class="ivu-cell-title">{{item.real_name}}</div> 
                    <div class="ivu-cell-label"></div>
                  </div> 
                  <div class="ivu-cell-footer">
                    <span class="ivu-cell-extra">{{item.phone}}</span>
                  </div>
                </div>
              </div> <!---->
            </div>
          </div>
          <div class="step_wrap">
            <div v-for="item in alarmInfo.notify_infos" :key="item.name" v-if="item.data != null" class="step_block">
              <p>
                <Tag color="orange">{{item.name}}</Tag>
                <span class="tel">{{item.phone}}</span>
              </p>
              <div v-for="notify in item.data" :key="notify.Id">
                <div class="ivu-steps ivu-steps-horizontal ivu-steps-small">
                  <div class="stepitem ivu-steps-item ivu-steps-status-finish" style="width: 33.3333%;">
                    <div class="ivu-steps-tail"><i></i></div> 
                    <div class="ivu-steps-head">
                      <div class="ivu-steps-head-inner">
                        <span class="ivu-steps-icon ivu-icon ivu-icon-ios-checkmark"></span>
                      </div>
                    </div> 
                    <div class="ivu-steps-main">
                      <div class="ivu-steps-title">{{notify.sendtime | time}}</div> <!---->
                    </div>
                  </div>
                  <div class="stepitem ivu-steps-item ivu-steps-status-finish" style="width: 33.3333%;">
                    <div class="ivu-steps-tail"><i></i>
                    </div> 
                    <div class="ivu-steps-head">
                      <div class="ivu-steps-head-inner">
                        <span class="ivu-steps-icon ivu-icon ivu-icon-ios-checkmark"></span>
                      </div>
                    </div> 
                    <div class="ivu-steps-main">
                      <div class="ivu-steps-title">{{notify.type | notifyTypeMethod}}</div> <!---->
                    </div>
                  </div>
                  
                  <div v-if="notify.state == 1"  class="stepitem ivu-steps-item ivu-steps-status-finish" style="width: 33.3333%;">
                    <div class="ivu-steps-tail"><i></i>
                    </div> 
                    <div class="ivu-steps-head">
                      <div class="ivu-steps-head-inner">
                        <span class="ivu-steps-icon ivu-icon ivu-icon-ios-checkmark"></span>
                      </div>
                    </div> 
                    <div class="ivu-steps-main">
                      <div class="ivu-steps-title">{{[notify.receivetime, notify.state] | stateFilter}}</div> <!---->
                    </div>
                  </div>
                  <div v-if="notify.state == 0"  class="stepitem ivu-steps-item ivu-steps-status-error" style="width: 33.3333%;">
                    <div class="ivu-steps-tail"><i></i>
                    </div> 
                    <div class="ivu-steps-head">
                      <div class="ivu-steps-head-inner">
                        <span class="ivu-steps-icon ivu-icon ivu-icon-ios-close"></span>
                      </div>
                    </div> 
                    <div class="ivu-steps-main">
                      <div class="ivu-steps-title">{{[notify.receivetime, notify.state] | stateFilter}}</div> <!---->
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" @click="allNotify(item)" class="step_btn ivu-btn ivu-btn-default ivu-btn-long"><!----> <!----> <span>
              查看全部
            </span></button>
            </div>
          </div>
        </Card>
       </transition>
    </div>
    <div v-show="notifyModal" data-transfer="true" class="notifyModal v-transfer-dom">
      <div class="ivu-modal-mask" style="z-index: 1015;"></div> 
      <div class="ivu-modal-wrap" style="z-index: 1015;">
        <div class="ivu-modal" style="width: 520px;">
          <div class="ivu-modal-content">
            <a class="ivu-modal-close">
              <i class="ivu-icon ivu-icon-ios-close"></i>
            </a> 
            <div class="ivu-modal-header">
              <div class="header"><h3> 小何 <span>16607931553</span></h3>
              </div>
            </div> 
            <div class="ivu-modal-body">
              <div class="content">
                <div class="wrap">
                  <div class="ivu-steps ivu-steps-horizontal ivu-steps-small"><div class="stepitem ivu-steps-item ivu-steps-status-finish" style="width: 33.3333%;">
                    <div class="ivu-steps-tail"><i></i>
                    </div> 
                    <div class="ivu-steps-head">
                      <div class="ivu-steps-head-inner">
                        <span class="ivu-steps-icon ivu-icon ivu-icon-ios-checkmark"></span>
                      </div>
                    </div> 
                    <div class="ivu-steps-main">
                      <div class="ivu-steps-title">9:52</div> 
                    </div>
                  </div>
                  <div class="stepitem ivu-steps-item ivu-steps-status-finish" style="width: 33.3333%;">
                    <div class="ivu-steps-tail"><i></i>
                    </div> 
                    <div class="ivu-steps-head">
                      <div class="ivu-steps-head-inner">
                        <span class="ivu-steps-icon ivu-icon ivu-icon-ios-checkmark"></span>
                      </div>
                    </div> 
                    <div class="ivu-steps-main">
                      <div class="ivu-steps-title">短信</div>
                    </div>
                  </div>
                  <div class="stepitem ivu-steps-item ivu-steps-status-finish" style="width: 33.3333%;">
                    <div class="ivu-steps-tail">
                      <i></i>
                    </div> 
                    <div class="ivu-steps-head">
                      <div class="ivu-steps-head-inner">
                        <span class="ivu-steps-icon ivu-icon ivu-icon-ios-checkmark"></span>
                      </div>
                    </div> 
                    <div class="ivu-steps-main">
                      <div class="ivu-steps-title">9:53</div> 
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import Icons from '_c/icons/'
import Vue from 'vue'
import { RiQi, RiQiTime } from '@/libs/util'
import { mapActions } from 'vuex'
import 'iview/dist/styles/iview.css';
import { getUserNotifyHistory } from '@/api/user.js'

import { Button, Table, Card, Icon, Tag, Divider, CellGroup, Cell, Steps, Modal,Step } from 'iview';
Vue.component('Button', Button);
Vue.component('Table', Table);
Vue.component('Card', Card);
Vue.component('Tag', Tag);
Vue.component('Divider', Divider);
Vue.component('CellGroup', CellGroup);
Vue.component('Cell', Cell);
// Vue.component('Steps', Steps);
// Vue.component('Step', Step);
Vue.component('Modal', Modal);
Vue.component('Icon', Icon);
export default {
  name: 'mapInfo',
  props: {
    alarmInfo: Object
  },
  components: {
    Icons,
    Card,
    Tag,
    Divider,
    CellGroup,
    Cell,
    // Steps,
    Modal,
    // Step,
    Button,
    Icon
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
    // ...mapActions(['getUserNotifyHistory']),
    allNotify (item) {
      console.log(item)
      this.notifyModal = true
      getUserNotifyHistory({ 'device_id': item.data[0].device_id, 'user_id': item.data[0].user_id })
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
  },
  filters: {
    alarmTypeFilter: function(val){
      let type = ''
      switch (val) {
        case '10':
          type = '水压异常'
          break;
        case '20':
          type = '阀门打开'
          break;
        case '30':
          type = '撞到'
          break;
        case '70':
          type = '设备异常'
          break;  
        default:
          type = ''
          break;
      }
      return type
    },
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
@import "info.less";
</style>
<style type="text/css">
  .ivu-cell{
    padding: 2px 16px;
  }
  .stepitem {
    width: 33% !important;
  }
</style>
