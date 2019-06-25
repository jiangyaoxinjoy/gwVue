<template>
<div>
  <Table
    :columns="columns"
    :data="deviceData"
    :height="tableHeight"
    :loading="loading"
    ref="table">
    <template slot-scope="{ row, index }" slot="state">
      <Tag class="stateTag" v-if="row.state == '70' && row.status != 0" type="dot" color="error">离线</Tag>
      <Tag class="stateTag" v-if="row.state != '70' && row.status != 0" type="dot" color="success">在线</Tag>
      <Tag color="default" v-if="row.status == 0">未安装</Tag>
    </template>
    <template slot="signal"  slot-scope="{ row, index }">
      <img :src="signal0" style="width: 22px" v-if="row.signal == ''">
      <img :src="signal1" style="width: 22px" v-if="row.signal != '' && parseInt(row.signal/6) == 0">
      <img :src="signal2" style="width: 22px" v-if="parseInt(row.signal/6) == 1">
      <img :src="signal3" style="width: 22px" v-if="parseInt(row.signal/6) == 2">
      <img :src="signal4" style="width: 22px" v-if="parseInt(row.signal/6) == 3">
      <img :src="signal5" style="width: 22px" v-if="parseInt(row.signal/6) >= 4">
    </template>
    <template slot="action" slot-scope="{ row, index }">
      <Button type="primary" size="small" ghost @click="eventQuery(row)">事件查询</Button>
    </template>
    <template slot="address" slot-scope="{ row, index }">
      <span style="cursor: pointer" type="text" v-if="row.lng != ''" @click="goMap(row)">
        {{row.address}}
        <Icon type="md-arrow-dropright" />
      </span>
    </template>
    <Page :current="deviceParams.pageNum" class-name='totalfr' slot="footer" :page-size="deviceParams.limit" @on-change="changePage" :total="dataTotal" size="small" show-total />
  </Table>
  <template v-if="ifeventModal">
    <eventModal :actionUrl="url" @modalState="eventModalState" :queryDeviceId="queryDeviceId" :modal="eventModalShow"/>
  </template>
</div>
</template>
<script>
import eventModal from './eventModal.vue'
import signal0 from '@/assets/images/signal0.svg'
import signal1 from '@/assets/images/signal1.svg'
import signal2 from '@/assets/images/signal2.svg'
import signal3 from '@/assets/images/signal3.svg'
import signal4 from '@/assets/images/signal4.svg'
import signal5 from '@/assets/images/signal5.svg'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    eventModal
  },
  data () {
    return {
      loading: true,
      ifeventModal: false,
      eventModalShow: false,
      queryDeviceId: 0,
      signal0: signal0,
      signal1: signal1,
      signal2: signal2,
      signal3: signal3,
      signal4: signal4,
      signal5: signal5,
      columns: [
        {
          title: '项目名称',
          key: 'company',
          minWidth: 120
        },
        {
          title: '设备号',
          key: 'device_id',
          minWidth: 180
        },
        {
          title: '报警终端状态',
          slot: 'state',
          minWidth: 110
        }, {
          title: '信号',
          slot: 'signal',
          minWidth: 60
        }, {
          title: '地址',
          slot: 'address',
          minWidth: 250
        }, {
          title: '主用户',
          key: 'main_name',
          minWidth: 100
        }, {
          title: '手机号',
          key: 'tel',
          minWidth: 120
        },
        {
          title: '操作',
          slot: 'action',
          minWidth: 90
        }
      ],
      deviceData: [],
      dataTotal: 0,
      tabValue: 0
    }
  },
  computed: {
    ...mapState({
      url: state => state.user.baseUrl,
      tableHeight: state => state.user.windowH - 60,
      comId: state => state.user.comId
    }),
    ...mapGetters([
      'deviceParams'
    ])
  },
  watch: {
    deviceParams: {
      handler () {
        this.loading = true
        this.setDeviceList()
      },
      deep: true
    }
  },
  created () {
    this.setDeviceList()
  },
  methods: {
    ...mapActions(['deviceList']),
    ...mapMutations(['setCenterMarker', 'setDeviceParams']),
    eventQuery (row) {
      this.ifeventModal = true
      this.eventModalShow = true
      this.queryDeviceId = row.device_id
    },
    changePage (val) {
      this.deviceParams.pageNum = val
      this.setDeviceParams(this.deviceParams)
    },
    setDeviceList () {
      var payload = JSON.parse(JSON.stringify(this.deviceParams))
      payload.offset = (Number(payload.pageNum) - 1) * Number(payload.limit)
      if (this.comId !== 1) {
        payload.companyId = this.comId
      }
      this.deviceList(this.deviceParams).then(res => {
        this.deviceData = res.data.list === null ? [] : res.data.list
        this.dataTotal = res.data.count
        if (this.dataTotal > 0) {
          let centerMark = res.data.list[0]
          this.setCenterMarker({ lng: centerMark.lng, lat: centerMark.lat })
        }
        this.loading = false
      })
    },
    goMap (row) {
      if (row.lat === '') {
        this.$Message.info('未安装')
        return
      }
      this.$router.push({ path: 'map' })
      this.setCenterMarker({ lng: row.lng, lat: row.lat })
    },
    eventModalState (val) {
      this.eventModalShow = val
    }
  }
}
</script>
<style type="text/css">
.stateTag{
  height: 28px;
  line-height: 28px;
  font-size: 10px;
}
.stateTag .ivu-tag-dot-inner{
  width: 8px;
  height: 8px;
}
</style>
