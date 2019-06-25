<template>
<div>
  <Modal
    v-model="uploadModal"
    title="导入设备"
    :mask-closable="false"
    :footer-hide="true"
    :width="300"
    @on-visible-change="uploadModalChange">
    <Form
      ref="uploadForm"
      :model="uploadForm"
      :label-width="70"
      :rules="ruleUpload"
    >
      <FormItem label="选择公司" prop="companyId">
        <Select v-model="uploadForm.companyId" style="width:200px">
          <Option v-for="item in companyList" :value="item.Id" :key="item.Id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="上传模式" prop="importType">
        <RadioGroup v-model="uploadForm.importType">
          <Radio :label="1">增量上传</Radio>
          <Radio :label="2">覆盖上传</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem class="fileWrap" label="选择文件">
        <Upload
          ref="upload"
          class="tbHBtn"
          accept = ".xlsx"
          :action="url +'deviceimport'"
          :show-upload-list="false"
          :before-upload="handleUpload"
        >
          <Button type="primary" icon="ios-cloud-upload-outline">导入文件</Button>
        </Upload>
        <div class="upLoadname" v-if="uploadForm.file !== '' && uploadForm.file !== null">Upload file: {{ uploadForm.file.name }} </div>
      </FormItem>
      <FormItem class="footer">
        <Button
          v-if="uploadForm.file !== '' && uploadForm.file !== null"
          type="warning"
          @click="upload"
          :loading="uploadLoadingStatus"
        >
          {{ uploadLoadingStatus ? 'Uploading' : '点击上传' }}
        </Button>
      </FormItem>
    </Form>
  </Modal>
  <Table
    :columns="columns"
    :data="deviceData"
    highlight-row
    ref="currentRowTable"
    :height="tableHeight"
    @on-sort-change='changeSort'>
    <div class="theader" slot="header">
      <Button class="tbHBtn" type="primary" icon="md-add-circle" @click="handleAddPerson">
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
  <Modal
    v-model="mapModalShow"
    title="修改设备信息"
    :mask-closable="false"
    @on-visible-change="changeState"
    :footer-hide="true">
    <Form
      :model="mapItem"
      :label-width="80"
      ref="mapItem"
      :rules="ruleValidate"
    >
      <FormItem label="设备号" prop="device_id">
          <Input v-model="mapItem.device_id" placeholder="输入设备号"></Input>
      </FormItem>
      <FormItem label="所属公司" prop="company_id">
        <Select v-model="mapItem.company_id" style="width:200px">
          <Option v-for="item in companyList" :value="item.Id" :key="item.Id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <baidu-map
        class="map"
        :center="{lng: mapItem.lng,lat: mapItem.lat}"
        :zoom="18"
        :scroll-wheel-zoom="true"
        @ready="map_handler"
        style="display: flex; flex-direction: column"
        v-if="mapItem.address"
      >
        <FormItem label="地址">
            <Input v-model="mapItem.address" placeholder="输入地址"></Input>
        </FormItem>
        <Row :gutter="24">
          <Col span="12">
            <FormItem label="经度">
              <Input v-model="mapItem.lng" placeholder="输入经度"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="纬度">
              <Input v-model="mapItem.lat" placeholder="输入纬度"></Input>
            </FormItem>
          </Col>
        </Row>
        <bm-view style="width: 100%; height:350px; flex: 1">
        </bm-view>
        <bm-marker
          :position="{lng: mapItem.lng,lat: mapItem.lat}"
          :dragging="true"
          :auto-resize="true"
          @dragend="showPosition">
        </bm-marker>
      </baidu-map>
      <FormItem class="editmFooter">
        <Button @click="mapModalClose">取消</Button>
        <Button type="primary" style="margin-left: 8px" @click="handleSubmit('mapItem')">修改</Button>
      </FormItem>
    </Form>
  </Modal>
  <Modal
    v-model="modal"
    title="新增设备"
    :mask-closable="false"
    :footer-hide="true"
    @on-visible-change="changeState">
    <Form
      :model="modalForm"
      :label-width="80"
      ref="modalForm"
      :rules="ruleValidate"
      @keydown.enter.native="handleSubmit"
    >
      <FormItem label="地址">
          <Input v-model="modalForm.address" placeholder="输入地址"></Input>
      </FormItem>
      <FormItem label="经度">
          <Input v-model="modalForm.lng" placeholder="输入经度"></Input>
      </FormItem>
      <FormItem label="纬度">
          <Input v-model="modalForm.lat" placeholder="输入纬度"></Input>
      </FormItem>
      <FormItem label="设备号" prop="device_id">
          <Input v-model="modalForm.device_id" placeholder="输入设备号"></Input>
      </FormItem>
      <FormItem label="所属公司" prop="company_id">
        <Select v-model="modalForm.company_id" style="width:200px">
          <Option v-for="item in companyList" :value="item.Id" :key="item.Id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('modalForm')">提交</Button>
        <Button style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </Modal>
</div>
</template>
<script>
import { RiQiYear } from '@/libs/util'
import { mapActions, mapState } from 'vuex'
import { Companyselect } from '_c/input/index'
import config from '@/config/index.js'
var url = ''
process.env.NODE_ENV === 'development' ? url = config.baseUrl.dev : url = config.baseUrl.pro
export default {
  components: {
    Companyselect
  },
  data () {
    return {
      url: url,
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
      mapModalShow: false,
      modal: false,
      modalForm: {
        address: '',
        lng: '',
        lat: '',
        device_id: '',
        company_id: ''
      },
      ruleValidate: {
        device_id: [
          { required: true, message: '设备号不能为空', trigger: 'blur' }
        ],
        company_id: [
          { required: true, type: 'number', message: '请选择公司', trigger: 'change' }
        ]
      },
      columns: [
        {
          title: '序号',
          type: 'index2',
          width: 60,
          render: (h, params) => {
            return h('span', params.index + (this.deviceParams.pageNum - 1) * this.deviceParams.limit + 1)
          }
        },
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
      uploadForm: {
        file: '',
        importType: 1,
        companyId: ''
      },
      ruleUpload: {
        companyId: [
          { required: true, type: 'number', message: '请选择公司', trigger: 'change' }
        ]
      },
      uploadModal: false,
      uploadLoadingStatus: false,
      deviceParams: {
        companyId: 0,
        pageNum: 1,
        limit: 100,
        offset: '',
        sort: 'setuptime',
        order: 'asc',
        status: 3
      }
      // tableLoading: true
    }
  },
  computed: {
    ...mapState({
      companyList: state => state.user.companyList,
      token: state => state.user.token,
      tableHeight: state => state.user.windowH - 60,
      comId: state => state.user.comId
    })
  },
  watch: {
    selectStatus (val) {
      // this.tableLoading = true
      this.deviceParams.status = val
      this.deviceParams.pageNum = 1
      this.setDeviceList()
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions(['getCompanyList', 'deviceList', 'addDevice', 'editDevice', 'importDevice']),
    setDeviceList () {
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
        // this.tableLoading = false
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
    map_handler ({ BMap, map }) {
      this.BMap = BMap
    },
    changePage (pageNum) {
      // this.tableLoading = true
      this.deviceParams.pageNum = pageNum
      this.setDeviceList()
    },
    handleRowEdit (row) {
      this.mapItem = JSON.parse(JSON.stringify(row))
      this.modalState = 'edit'
      this.mapModalShow = true
    },
    ok () {

    },
    cancel () {

    },
    handleAddPerson () {
      this.modalState = 'add'
      this.modal = true
    },
    infoWindowOpen () {
      this.infoShow = true
    },
    infoWindowClose () {
      this.infoShow = false
    },
    showPosition ({ type, target, pixel, point }) {
      var BMap = this.BMap
      var geoc = new BMap.Geocoder()
      this.mapItem.lng = String(point.lng)
      this.mapItem.lat = String(point.lat)
      var address
      geoc.getLocation(point, (rs) => {
        var addComp = rs.addressComponents
        address = `${addComp.province}${addComp.city}${addComp.district}${addComp.street}${addComp.streetNumber}`
        console.log(addComp)
        this.mapItem.address = address
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.modalState === 'add') {
            this.addDevice(this.modalForm).then(res => {
              if (res.status === 0) {
                this.$Message.success('新增成功')
                this.setDeviceList()
                this.modal = false
              } else {
                this.$Message.error(res.msg)
              }
            })
          } else if (this.modalState === 'edit') {
            this.editDevice(this.mapItem).then(res => {
              if (res.status === 0) {
                this.$Message.success('编辑成功')
                this.setDeviceList()
                this.mapModalShow = false
              } else {
                this.$Message.error(res.msg)
              }
            })
          }
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    changeState (val) {
      if (!val) {
        this.$refs.modalForm.resetFields()
      }
    },
    mapModalClose () {
      this.mapModalShow = false
    },
    handleImportDevice () {
      this.uploadModal = true
    },
    handleUpload (file) {
      this.uploadForm.file = file
      return false
    },
    upload () {
      this.uploadLoadingStatus = true
      this.$refs.uploadForm.validate((valid) => {
        if (valid) {
          let formdata = new FormData()
          formdata.append('file', this.uploadForm.file)
          formdata.append('companyId', this.uploadForm.companyId)
          formdata.append('importType', this.uploadForm.importType)
          formdata.append('token', this.$store.state.user.token)
          this.importDevice(formdata).then(res => {
            if (res.status !== 0) {
              this.$Message.error(res.msg)
            } else {
              if (this.uploadForm.importType === 1) {
                this.$Message.success('添加：' + res.data + '个设备')
              } else if (this.uploadForm.importType === 2) {
                this.$Message.success('覆盖添加：' + res.data + '个设备')
              }
            }
            this.deviceParams.pageNum = 1
            this.setDeviceList()
            this.uploadLoadingStatus = false
            this.uploadModal = false
          })
        } else {
          this.uploadLoadingStatus = false
          this.$Message.error('Fail!')
        }
      })
    },
    uploadModalChange (val) {
      if (val === false) {
        this.$refs.uploadForm.resetFields()
        this.uploadForm.file = ''
      }
    },
    changeSort (col, key, order) {
      console.log(col)
      if (col.order !== 'normal') {
        this.deviceParams.order = col.order
      }
      this.setDeviceList()
    },
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
    changeCom (val) {
      this.deviceParams.companyId = val
      this.setDeviceList()
    }
  }
}
</script>
<style lang="less" scoped>
@import 'device.less';
</style>
<style type="text/css">
  .editmFooter .ivu-form-item-content{
    text-align: right
  }
  .totalfr{
    padding: 0 10px;
  }
</style>
