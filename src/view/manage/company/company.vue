<template>
<div>

  <Table
    :columns="columns"
    :data="companyList"
    highlight-row
    ref="currentRowTable"
    :height="tableHeight"
  >
    <template slot="header">
      <Button v-if="comId == 1" class="tbHBtn" type="primary" icon="md-add-circle" @click="handleAddCompany">
        <span>添加公司</span>
      </Button>
    </template>
    <template slot-scope="{ row, index }" slot="action" v-if="comId == 1">
      <!-- <Button class="tBtn" type="warning" size="small">禁用</Button> -->
      <Button class="tBtn" type="error" size="small" @click="handleCurrenRow(row)">修改</Button>
    </template>
  </Table>
  <Modal
    v-model="modal"
    :title="modalState == 'new' ? '新增公司' : '修改公司信息'"
    :footer-hide="true"
    @on-visible-change="changeState"
    :mask-closable="false"
  >
      <Form
        :model="modalForm"
        :label-width="80"
        ref="modalForm"
        :rules="ruleValidate"
      >
        <FormItem label="公司名称" prop="name">
          <Input v-model="modalForm.name" placeholder="输入公司名称"></Input>
        </FormItem>
        <FormItem label="公司地址" prop="address">
          <Input v-model="modalForm.address" placeholder="输入公司地址"></Input>
        </FormItem>
        <FormItem label="负责人" prop="manager">
          <Input v-model="modalForm.manager" placeholder="输入公司负责人"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="tel">
          <Input v-model="modalForm.tel" placeholder="输入公司联系电话"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="modalForm.email" placeholder="输入公司邮箱"></Input>
        </FormItem>
        <FormItem label="最低阀值" prop="value1">
          <Input v-model="modalForm.value1" placeholder="输入最低阀值"></Input>
        </FormItem>
        <FormItem label="最高阀值" prop="value2">
          <Input v-model="modalForm.value2" placeholder="输入最高阀值"></Input>
        </FormItem>

        <FormItem>
            <Button type="primary" @click="handleSubmit('modalForm')">提交</Button>
            <Button @click="handleReset('modalForm')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
  </Modal>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('公司名称不能为空'))
      }
      callback()
    }
    const validateAdd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('公司地址不能为空'))
      }
      callback()
    }
    const validateManager = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('公司负责人不能为空'))
      }
      callback()
    }
    const validateTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('公司电话不能为空'))
      } else if (!(/^1[345678]\d{9}$/.test(value))) {
        callback(new Error('手机号码有误，请重填'))
      }
      callback()
    }
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('公司邮箱不能为空'))
      }
      callback()
    }
    const validateV1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('阀值不能为空'))
      } else if (value >= this.modalForm.value2) {
        callback(new Error('数值不能比最高阀值高'))
      }
      callback()
    }
    const validateV2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('阀值不能为空'))
      } else if (value <= this.modalForm.value1) {
        callback(new Error('数值不能比最低阀值低'))
      }
      callback()
    }
    return {
      modal: false,
      pageSize: 10,
      modalForm: {
        name: '',
        address: '',
        value1: '',
        value2: '',
        manager: '',
        tel: '',
        email: ''
      },
      curId: '',
      modalState: '',
      ruleValidate: {
        name: [{ validator: validateName, trigger: 'blur' }],
        address: [{ validator: validateAdd, trigger: 'blur' }],
        value1: [{ validator: validateV1, trigger: 'blur' }],
        value2: [{ validator: validateV2, trigger: 'blur' }],
        manager: [{ validator: validateManager, trigger: 'blur' }],
        tel: [{ validator: validateTel, trigger: 'blur' }],
        email: [
          { validator: validateEmail, trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      },
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '公司名称',
          key: 'name'
        },
        {
          title: '公司地址',
          key: 'address'
        },
        {
          title: '水压阀值1',
          key: 'value1'
        },
        {
          title: '水压阀值2',
          key: 'value2'
        },
        {
          title: '操作',
          slot: 'action',
          width: 180,
          align: 'center'
        }
      ],
      selectCompany: ''
    }
  },
  computed: {
    ...mapState({
      companyList: state => state.user.companyList,
      // token: state => state.user.token,
      tableHeight: state => state.user.windowH - 60,
      comId: state => state.user.comId
    })
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions(['getCompanyList', 'addCom', 'editCom']),
    handleCurrenRow (row) {
      this.modalState = 'add'
      this.modalForm.name = row.name
      this.modalForm.address = row.address
      this.modalForm.value1 = row.value1
      this.modalForm.value2 = row.value2
      this.modalForm.tel = row.tel
      this.modalForm.email = row.email
      this.modalForm.manager = row.manager
      this.curId = row.Id
      this.modal = true
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.modalState === 'new') {
            this.addCom(this.modalForm).then(res => {
              if (res.status !== 0) {
                this.$Message.error(res.msg)
              } else {
                this.getCompanyList()
                this.$Message.success('新增成功!')
                this.modal = false
              }
            })
          } else if (this.modalState === 'add') {
            let payload = JSON.parse(JSON.stringify(this.modalForm))
            payload.id = this.curId
            this.editCom(payload).then(res => {
              // console.log(res)
              if (res.status !== 0) {
                this.$Message.error(res.msg)
              } else {
                this.getCompanyList()
                this.$Message.success('修改成功!')
                this.modal = false
              }
            })
          }
        } else {
          // this.$Message.error('失败!');
        }
      })
    },
    changeState (val) {
      if (!val) {
        this.$refs.modalForm.resetFields()
      }
    },
    handleReset (name) {
      this.$refs.modalForm.resetFields()
    },
    handleAddCompany () {
      this.modalState = 'new'
      this.modal = true
    },
    initPage () {
      if (this.companyList.length === 0) {
        this.getCompanyList()
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
