<template>
  <Modal
    v-model="modal"
    title="添加设备"
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
      <!-- <FormItem label="地址">
          <Input v-model="modalForm.address" placeholder="输入地址"></Input>
      </FormItem>
      <FormItem label="经度">
          <Input v-model="modalForm.lng" placeholder="输入经度"></Input>
      </FormItem>
      <FormItem label="纬度">
          <Input v-model="modalForm.lat" placeholder="输入纬度"></Input>
      </FormItem> -->
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
        <Button style="margin-left: 8px" @click="closeBtn">取消</Button>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { mapActions} from 'vuex'
export default {
  name: "AddDevice",
  props: {
    addModal: {
      type: Boolean,
      default: false
    },
    companyList: Array
  },
  data () {
    return {
      modalForm: {
        // address: '',
        // lng: '',
        // lat: '',
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
    }
  },
  computed: {
    modal: {
      get() {
        return this.addModal
      },
      set() {}
    }
  },
  methods: {
    ...mapActions(['addDevice']),
    changeState (val) {
      // console.log(val)
      if (!val) {
        this.$emit('addStateChange', false)
      }
    },
    closeBtn () {
      this.modal = false
      this.$emit('addStateChange',false)
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.addDevice(this.modalForm).then(res => {
            if (res.status === 0) {
              this.$Message.success('新增成功')
              this.modal = false
              this.$emit('addStateChange',false, true)
              this.$refs.modalForm.resetFields()
            } else {
              this.$Message.error(res.msg)
            }
          })
        } else {
          this.$Message.error('Fail!')
        }

      })
    },
  }
}
</script>