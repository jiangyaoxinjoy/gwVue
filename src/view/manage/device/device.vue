<template>
<div>
  <Table
    :columns="columns"
    :data="deviceData"
    highlight-row
    ref="currentRowTable"
    :loading="loading"
    :height="tableHeight">
    <div class="theader" slot="header">
      <Button class="tbHBtn" type="primary" icon="md-add-circle" @click="handleAddDevice">
        <span>添加设备</span>
      </Button>
      <Button class="tbHBtn" type="primary" icon="ios-cloud-upload-outline" @click="handleImportDevice">
        <span>导入设备</span>
      </Button>
      <Button class="tbHBtn"  type="primary"  @click="changeTimeOrder" :icon="timeOrder == 'down' ? 'md-arrow-dropup' : 'md-arrow-dropdown'">
        <span >时间排序</span>
      </Button>
      <Select class="tbHBtn" v-model="selectStatus" style="width:150px" placeholder="选择是否安装">
        <Option :value="3">全部</Option>
        <Option :value="1">未安装</Option>
        <Option :value="2">已安装</Option>
      </Select>
      <Companyselect :width="150" class="tbHBtn" :companyList="companyList" :selectCompany="deviceParams.companyId" @changeComId="changeCom"/>
    </div>
    <template slot-scope="{ row, index }" slot="action">
      <Button class="tBtn" type="error" size="small" @click="handleRowEdit(row)">修改</Button>
    </template>
    <Page class-name='totalfr' slot="footer" :total="dataTotal" :page-size="deviceParams.limit" show-total :current="deviceParams.pageNum" @on-change="changePage"></Page>
  </Table>
  
  <AddDevice :addModal="addModal" :companyList="companyList" @addStateChange="closeAddModal"/>
  <EditDevice :editModal="editModal" :companyList="companyList" @editChangeState="closeEditModal" :mapItem="mapItem" />
  <ImportDevice :uploadModal="uploadModal" :companyList="companyList" @uploadChangeState="closeImportModal"/>
</div>
</template>
<script>
import { RiQiYear } from '@/libs/util'
import { mapActions, mapState } from 'vuex'
import { Companyselect } from '_c/input/index'
import config from '@/config/index.js'
import AddDevice from './components/addDeviceModal.vue'
import EditDevice from './components/editDeviceModal.vue'
import ImportDevice from './components/importDeviceModal.vue'

export default {
  components: {
    Companyselect,
    AddDevice,
    EditDevice,
    ImportDevice
  },
  data () {
    return {
      loading: true,
      editModal: false,
      addModal: false,
      timeOrder: 'down',
      selectStatus: '',
      selectComId: '',
      modalState: '',
      mapItem: {
        address: '',
        id: '',
        lng: '',
        lat: '',
        device_id: '',
        company_id: ''
      },
      infoShow: false,
      columns: [
        // {
        //   title: '序号',
        //   type: 'index2',
        //   width: 60,
        //   render: (h, params) => {
        //     return h('span', params.index + (this.deviceParams.pageNum - 1) * this.deviceParams.limit + 1)
        //   }
        // },
        {
          title: '设备号',
          key: 'device_id',
          minWidth: 180
        },
        {
          title: '所属公司',
          key: 'company',
          minWidth: 180
        },
        {
          title: '地址',
          key: 'address',
          minWidth: 200
        },
        {
          title: '是否安装',
          key: 'status',
          minWidth: 120,
          render: (h, params) => {
            if (params.row.status === 0) {
              return h('span', '未安装')
            } else {
              return h('span', '已安装')
            }
          }
        },
        {
          title: '安装时间',
          key: 'setuptime',
          minWidth: 170,
          render: (h, params) => {
            if (params.row.setuptime === '') {
              return h('span', '')
            } else {
              let time = RiQiYear(params.row.setuptime)
              return h('span', time)
            }
          }
        },
        {
          title: '操作',
          slot: 'action',
          minWidth: 70,
          align: 'center'
        }
      ],
      deviceData: [],
      dataTotal: 0,
      uploadModal: false,
      deviceParams: {
        companyId: 0,
        pageNum: 1,
        limit: 100,
        offset: '',
        sort: 'setuptime',
        order: 'asc',
        status: 3
      }
    }
  },
  computed: {
    ...mapState({
      companyList: state => state.user.companyList,
      token: state => state.user.token,
      tableHeight: state => state.user.windowH - 60,
      comId: state => state.user.comId,
    })
  },
  watch: {
    selectStatus (val) {
      this.deviceParams.status = val
      this.deviceParams.pageNum = 1
      this.setDeviceList()
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions(['getCompanyList', 'deviceList']),
    setDeviceList () {
      this.loading = true
      var payload = JSON.parse(JSON.stringify(this.deviceParams))
      payload.offset = (Number(payload.pageNum) - 1) * Number(payload.limit)
      this.deviceList(payload).then(res => {
        if (res.status === 0) {
          this.deviceData = res.data.list === null ? [] : res.data.list
          this.dataTotal = res.data.count
        } else {
          this.deviceData = []
          this.dataTotal = 0
        }
        this.loading = false
      })
    },
    initPage () {
      if (this.companyList.length === 0) {
        this.getCompanyList()
      }
      if (this.comId !== 1) {
        this.deviceParams.companyId = this.comId
      }
      this.setDeviceList()
    },
    changePage (pageNum) {
      this.deviceParams.pageNum = pageNum
      this.setDeviceList()
    },
    //修改按钮
    handleRowEdit (row) {
      // console.log(row)
      this.mapItem.address = row.address
      this.mapItem.id = row.Id 
      this.mapItem.lat = row.lat
      this.mapItem.lng = row.lng
      this.mapItem.device_id = row.device_id
      this.mapItem.company_id = row.company_id
      this.editModal = true
    },
    //添加设备按钮
    handleAddDevice () {
      this.addModal = true
    },
    // 导入设备按钮
    handleImportDevice () {
      this.uploadModal = true
    },
    //按时间排序
    changeTimeOrder () {
      if (this.timeOrder === 'down') {
        this.timeOrder = 'up'
        this.deviceParams.order = 'desc'
      } else {
        this.timeOrder = 'down'
        this.deviceParams.order = 'asc'
      }
      this.setDeviceList()
    },
    //选择公司
    changeCom (val) {
      this.deviceParams.companyId = val
      this.deviceParams.pageNum = 1
      this.setDeviceList()
    },
    //添加modal关闭
    closeAddModal(modal, add) {
      this.addModal = modal
      if (add) {
        this.setDeviceList()
      }
    },
    //编辑modal关闭
    closeEditModal(modal, edit) {
      this.editModal = modal
      if (edit) {
        this.setDeviceList()
      }
    },
    //导入modal关闭
    closeImportModal (modal, upload) {
      this.uploadModal = modal
      if (upload) {
        this.setDeviceList()
      }
    } 
  }
}
</script>
<style lang="less" scoped>
@import 'device.less';
</style>
<style type="text/css">
  .totalfr{
    padding: 0 10px;
  }
</style>
