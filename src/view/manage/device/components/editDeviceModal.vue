<template>
  <Modal
    v-model="modal"
    title="修改设备信息"
    :mask-closable="false"
    @on-visible-change="closeEditModal"
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
        <Button @click="closeEditModal(false)">取消</Button>
        <Button type="primary" style="margin-left: 8px" @click="handleSubmit('mapItem')">修改</Button>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { mapActions} from 'vuex'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { BmView, BmMarker} from 'vue-baidu-map'
export default {
  props: {
    editModal: {
      type: Boolean,
      default: false
    },
    companyList: Array,
    mapItem: {
      type: Object,
      default: () => {
        return {
          address: '',
          id: '',
          lng: '',
          lat: '',
          device_id: '',
          company_id: ''
        }
      }
    }
  },
  name: "EditDevice",
  components: {
    BaiduMap,
    BmView, 
    BmMarker,
  },
  data() {
    return {   
      ruleValidate: {
        device_id: [
          { required: true, message: '设备号不能为空', trigger: 'blur' }
        ],
        company_id: [
          { required: true, type: 'number', message: '请选择公司', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    modal: {
      get() {
        return this.editModal
      },
      set() {}
    }
  },
  methods: {
    ...mapActions(['editDevice']),
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.editDevice(this.mapItem).then(res => {
            if (res.status === 0) {
              this.$Message.success('编辑成功')
              this.$refs[name].resetFields()
              this.modal = false
              this.closeEditModal(false, true)
            } else {
              this.$Message.error(res.msg)
            }
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    closeEditModal(val, edit) {
      if (!val) {
        this.$emit('editChangeState',val,edit)
      }
    },
    showPosition ({ type, target, pixel, point }) {
      var BMap = this.BMap
      var geoc = new BMap.Geocoder()
      this.mapItem.lng = String(point.lng)
      this.mapItem.lat = String(point.lat)
      var address = ''
      geoc.getLocation(point, (rs) => {
        var addComp = rs.addressComponents
        address = `${addComp.province}${addComp.city}${addComp.district}${addComp.street}${addComp.streetNumber}`
        // console.log(addComp)
        this.mapItem.address = address
      })
    },
    map_handler ({ BMap, map }) {
      this.BMap = BMap
    },
  }
}
</script>
<style type="text/css">
  .editmFooter .ivu-form-item-content{
    text-align: right;
  }
  .editmFooter{
    margin-top: 16px;
    margin-bottom: 8px;
  }
</style>