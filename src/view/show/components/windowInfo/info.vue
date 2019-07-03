<template>
  <div class="info showinfo">
    <div style="background: rgb(238, 238, 238); padding: 5px; position: relative;">
      <div class="ivu-card ivu-card-bordered">
        <div class="ivu-card-head">
          <div class="card_title">
            <i class="card_icon iconfont icon-shuiyaxiaxian" slot="icon" style="font-size: 45px; color: rgb(92, 107, 119);"></i>
            <div>
            {{alarmInfo.alarm_type | alarmTypeFilter}}
            <div class="tag ivu-tag ivu-tag-default ivu-tag-border ivu-tag-checked"><!----> 
              <span class="ivu-tag-text ivu-tag-color-default">
                {{ alarmInfo.isnotify == 0 ? '通知未到达' : '通知已到达'}}
              </span> <!---->
            </div><br>
            <span class="extra_line">{{alarmText}}</span>
          </div>
        </div>
      </div> 
      <div class="ivu-card-extra"><p>{{alarmInfo.send_time | timeFilter}}</p></div> 
      <div class="ivu-card-body">
        <div class="divider ivu-divider ivu-divider-horizontal ivu-divider-default ivu-divider-with-text-left">
          <span class="ivu-divider-inner-text">地址</span>
        </div>
        <p>{{alarmInfo.address}}</p>
        <!-- <div class="divider ivu-divider ivu-divider-horizontal ivu-divider-default ivu-divider-with-text-left">
          <span class="ivu-divider-inner-text" @click="showcell">
            <i class="ivu-icon ivu-icon-ios-arrow-forward"></i> 
            联系人和联系方式
          </span>
        </div> -->

        <div class="ivu-cell cell-contact" @click="showcell">
          <!-- <a href="/components/button" target="_blank" class="ivu-cell-link"> -->
            <div class="ivu-cell-item">
              <div class="ivu-cell-icon"></div> 
              <div class="ivu-cell-main">
                <div class="ivu-cell-title">联系人和联系方式</div> 
              </div> 
              <div class="ivu-cell-footer">
                <span class="ivu-cell-extra"></span>
              </div>
            </div>
          <!-- </a>  -->
          <div class="ivu-cell-arrow cell-arrow" :class="hidecell ? 'active' : ''">
            <i class="ivu-icon ivu-icon-ios-arrow-forward"></i>
          </div>
        </div>

        <div v-show="hidecell" class="ivu-cell-group" v-for="item in alarmInfo.teles" :key="item.Id">
          <div class="ivu-cell">
            <div class="ivu-cell-link">
              <div class="ivu-cell-item">
                <div class="ivu-cell-icon"></div> 
                <div class="ivu-cell-main">
                  <div class="ivu-cell-title">{{item.real_name}}</div> 
                </div> 
                <div class="ivu-cell-footer">
                  <span class="ivu-cell-extra">{{item.phone}}</span>
                </div>
              </div>
            </div> 
          </div>
        </div>

        <div class="step_wrap">
          <div class="step_block" v-for="item in alarmInfo.notify_infos" :key="item.name" v-if="item.data != null">
            <p>
              <div class="ivu-tag ivu-tag-orange ivu-tag-checked"><!----> 
                <span class="ivu-tag-text">{{item.name}}</span> <!---->
              </div>
              <span class="tel">{{item.phone}}</span>
            </p>
            <div v-for="notify in item.data" :key="notify.Id">
              <div class="ivu-steps ivu-steps-horizontal ivu-steps-small">
                <div class="stepitem ivu-steps-item ivu-steps-status-finish" style="width: 33.3333%;">
                  <div class="ivu-steps-tail"><i></i>
                  </div> 
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
                  <div class="ivu-steps-tail">
                    <i></i></div> 
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
              <button type="button" @click="allNotify(item)" class="step_btn ivu-btn ivu-btn-default ivu-btn-long"><!----> <!----> 
                <span>查看全部</span>
              </button>
            </div>
          </div>
        </div>  
      </div>
    </div>

    <div v-show="notifyModal" data-transfer="true" class="notifyModal v-transfer-dom">
      <div class="ivu-modal-mask" style="z-index: 1015;"></div> 
      <div class="ivu-modal-wrap" style="z-index: 1015;">
        <div class="ivu-modal" style="width: 420px;">
          <div class="ivu-modal-content" style="height: 400px;">
            <a class="ivu-modal-close">
              <i class="ivu-icon ivu-icon-ios-close" @click="notifyModal = false"></i>
            </a> 
            <div class="ivu-modal-header">
              <div class="header"><h3> {{notifyData.name}} <span>{{notifyData.tel}}</span></h3>
              </div>
            </div> 
            <div class="ivu-modal-body">
              <div v-for="notify in notifyData.list" class="wrap" :key="notify.Id">
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
                      <div class="ivu-steps-title">{{notify.sendtime | time}}</div> 
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
                      <div class="ivu-steps-title">{{notify.type | notifyTypeMethod}}</div>
                    </div>
                  </div>
                  <div v-if="notify.state == 1" class="stepitem ivu-steps-item ivu-steps-status-finish" style="width: 33.3333%;">
                    <div class="ivu-steps-tail">
                      <i></i>
                    </div> 
                    <div class="ivu-steps-head">
                      <div class="ivu-steps-head-inner">
                        <span class="ivu-steps-icon ivu-icon ivu-icon-ios-checkmark"></span>
                      </div>
                    </div> 
                    <div class="ivu-steps-main">
                      <div class="ivu-steps-title">
                        {{[notify.receivetime, notify.state] | stateFilter}}
                      </div>
                    </div>
                  </div>
                  <div v-if="notify.state == 0" class="stepitem ivu-steps-item ivu-steps-status-error" style="width: 33.3333%;">
                    <div class="ivu-steps-tail">
                      <i></i>
                    </div> 
                    <div class="ivu-steps-head">
                      <div class="ivu-steps-head-inner">
                        <span class="ivu-steps-icon ivu-icon ivu-icon-ios-close"></span>
                      </div>
                    </div> 
                    <div class="ivu-steps-main">
                      <div class="ivu-steps-title">
                        {{[notify.receivetime, notify.state] | stateFilter}}
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


</div>
</template>

<script>
// import Icons from '_c/icons/'
// import Vue from 'vue'
import { RiQi, RiQiTime } from '@/libs/util'
import { getUserNotifyHistory } from '@/api/user.js'
import { getToken } from '@/libs/util'

export default {
  name: 'mapInfo',
  props: {
    alarmInfo: Object
  },
  components: {
  },
  data () {
    return {
      showModal: false,
      notifyModal: false,
      notifyData: {
        list: [],
        name: '',
        tel: '',
        value: 1
      },
      showTels: false,
      hidecell: false
    }
  },
  // watch: {
  //   alarmInfo: {
  //     handler(){
  //       this.loading = false
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    allNotify (item) {
      console.log(item)
      this.notifyModal = true
      getUserNotifyHistory({ 'token': getToken(), 'device_id': item.data[0].device_id, 'user_id': item.data[0].user_id })
        .then(res => {
          console.log(res)
          if (res.data.status === 0) {
            this.notifyData.list = res.data.data
            this.notifyData.name = item.name
            this.notifyData.tel = item.phone
          }
        })
    },
    historyBtnClick () {
      this.showModal = !this.showModal
    },
    showcell () {
      console.log(111111)
      this.hidecell = !this.hidecell
    }
  },
  computed: {
    alarmText () {
      let val = this.alarmInfo.alarm_type
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