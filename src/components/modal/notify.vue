<template>
  <Modal
    v-model="show"
    class="notifyModal"
    :footer-hide="true"
    @on-visible-change="changeState">
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
</template>
<script>
import { RiQi, RiQiTime } from '@/libs/util'
export default {
  name: "NotifyModal",
  props: {
    notifyData: Object,
    notifyModal: Boolean
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    notifyModal:{
      handler(val) {
        this.show = val
      },
      immediate: true
    }
  },
  // computed: {
  //   show: {
  //     get() {
  //       return this.notifyModal
  //     },
  //     set() {}
  //   }
  // },
  filters: {
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
  methods: {
    changeState (val) {
       this.$emit('stateChange', val)
    }
    // hideModal() {
    //   console.log(111)
    //   this.show = false
    //   this.$emit('stateChange', false)
    // }
  }
}
</script>