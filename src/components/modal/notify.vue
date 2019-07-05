<template>
  <Modal
    v-model="show"
    class-name="notifyModal"
    :footer-hide="true"
    @on-visible-change="changeState"
    @loading="loading">
    <div slot="header" class="header">
      <h3> {{userAllNotify.name}} <span>{{userAllNotify.tel}}</span></h3>
    </div>
    <div class="content">
      <div class="wrap">
        <Steps
          v-for="notify in notifyData.list" 
          :key="notify.Id"
          :current="notify.state == 1 ? 3 : 2"
          :status="notify.state == 1 ? 'finish' : 'error'"
          size='small'
        >
          <Step class="stepitem" :title="notify.sendtime | time"></Step>
          <<Step class="stepitem" :title="notify.type | notifyTypeMethod"></Step>
          <Step class="stepitem" :title="[notify.receivetime, notify.state] | stateFilter"></Step>
        </Steps>
      </div>
    </div>
  </Modal>
</template>
<script>
import { RiQi, RiQiTime } from '@/libs/util'
import { getUserNotifyHistory } from '@/api/user'
import { getToken } from '@/libs/util'
export default {
  name: "NotifyModal",
  props: {
    notifyModal: Boolean,
    userAllNotify: Object
  },
  data () {
    return {
      show: false,
      token: getToken(),
      notifyData: {
        list: [],
        value: 1
      },
      loading: true
    }
  },
  watch: {
    notifyModal:{
      handler(val) {
        this.show = val
        if (val) {
          this.getData()
        }
      },
      immediate: true
    }
  },
  filters: {
    notifyTypeMethod: function (value) {
      // console.log(value)
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
    time: function (value) {
      if (value === 0) {
        return ''
      }
      let time = RiQiTime(value)
      return time
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
  },
  created() {
    // this. getData()
  },
  methods: {
    changeState (val) {
       this.$emit('stateChange', val)
    },
    getData () {
      getUserNotifyHistory({'device_id': this.userAllNotify.device_id, 'user_id': this.userAllNotify.user_id, 'token': this.token })
      .then(res => {
        console.log(res)
        if (res.data.status === 0) {
          this.notifyData.list = res.data.data
          this.loading = false
        }
      })
    }
  }
}
</script>
<style type="text/css">
  .notifyModal .content {
    height: 450px;
    margin-left: 40px;
    overflow-y: scroll;
  }
  .notifyModal .ivu-steps {
    margin-top: 5px;
  }
</style>