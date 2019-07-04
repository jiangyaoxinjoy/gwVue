<template>
  <div class="info">
    <NotifyModal :notifyModal="notifyModal" :notifyData="notifyData" @stateChange="notifyModalChange"/>

    <div style="background: rgb(238, 238, 238); padding: 5px; position: relative;">
      <div class="ivu-card ivu-card-bordered">
        <div class="ivu-card-head">
          <div class="card_title">
            <i class="card_icon iconfont icon-shuiyaxiaxian" slot="icon" style="font-size: 45px; color: rgb(92, 107, 119);"></i>
            <div>
              {{alarmInfo.alarm_type | alarmTypeFilter}}
              <div class="tag ivu-tag ivu-tag-default ivu-tag-border ivu-tag-checked">
                <span class="ivu-tag-text ivu-tag-color-default">
                  {{ alarmInfo.isnotify == 0 ? '通知未到达' : '通知已到达'}}
                </span> 
              </div>
              <br><span class="extra_line">{{alarmText}}</span>
            </div>
          </div>
        </div> 
        <div class="ivu-card-extra">
          <p>{{alarmInfo.send_time | timeFilter}}</p>
        </div> 
        <div class="ivu-card-body">
          <div class="divider ivu-divider ivu-divider-horizontal ivu-divider-default ivu-divider-with-text-left">
            <span class="ivu-divider-inner-text">地址</span>
          </div>
          <p>{{alarmInfo.address}}</p>

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
          <button type="button" class="history_btn ivu-btn ivu-btn-warning ivu-btn-long">
            <span>
              {{showModal ? '关闭' : '显示'}}{{alarmInfo.alarm_type | alarmHistory}}
            </span>
          </button>
          <!-- notify start -->
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
          <!-- notify end -->
        </div>
      </div>
    </div>
  </div> 
</template>
<script>
import { getDeviceAlertInfo, getUserNotifyHistory } from '@/api/user'
import { getToken } from '@/libs/util'
import { RiQi, RiQiTime } from '@/libs/util'
import { NotifyModal } from "_c/modal/index.js"
// import indexModal from '../modal/modal.vue'
export default {
  name: 'WindowInfo',
  components: {
    NotifyModal,
    // indexModal
  },
  data() {
    return {
      device_id:'',
      alarmInfo:'',
      hidecell: false,
      showModal: false,
      notifyData: {
        list: [],
        name: '',
        tel: '',
        value: 1
      },
      notifyModal: false,
      token: getToken()
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
    }
  },
  created() {
    // this.getInfo()
    // console.log(mapActions)
  }, 
  methods: {
    getInfo() {
      getDeviceAlertInfo( {'device_id': this.device_id, token: this.token}).then(res => {
        console.log(res)
        if (res.data.status === 0) {
          this.alarmInfo = res.data.data
        }
      })
    },
    showcell () {
      console.log(111111)
      this.hidecell = !this.hidecell
    },
    allNotify (item) {
      console.log(item)
      this.notifyModal = true
      getUserNotifyHistory({ 'token': this.token, 'device_id': item.data[0].device_id, 'user_id': item.data[0].user_id })
      .then(res => {
        console.log(res)
        if (res.data.status === 0) {
          this.notifyData.list = res.data.data
          this.notifyData.name = item.name
          this.notifyData.tel = item.phone
        }
      })
    },
    notifyModalChange (val) {
      this.notifyModal = val
    }
  }
}
</script>
<style lang="less" scoped>
@import "windowInfo.less";
</style>