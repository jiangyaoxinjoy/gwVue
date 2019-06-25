<template>
<div>
  <Table
    :columns="columns"
    :data="userData"
    highlight-row
    ref="currentRowTable"
    :height="tableHeight"
  >
    <template slot="header">
      <Button class="tbHBtn" type="primary" icon="md-add-circle" @click="handleAddPerson">
        <span>添加人员</span>
      </Button>
      <Companyselect :companyList="companyList" :selectCompany="selectCompany" @changeComId="changeCom"/>
    </template>
    <template slot-scope="{ row, index }" slot="authority">
      <Tag color="warning" v-for="item in row.authName" :key="item">{{item}}</Tag>
    </template>
    <template slot-scope="{ row, index }" slot="action">
      <Button class="tBtn" :type="row.status == -1 ? 'default' : 'info'" size="small" @click="changeRowState(row)">{{row.status === -1 ? '禁用': '正常'}}</Button>
      <Button class="tBtn" type="error" size="small" @click="handleCurrenRow(row)">修改</Button>
    </template>
  </Table>
  <template v-if="ifEdit">
    <editModal :originData="selectRow" :modal="editshow" @State="changeEditState" @submit="handleEditSubmit"/>
  </template>
  <template v-if="ifAdd">
    <addModal :modal="addshow" @addState="changeAddState" @addSubmit="handleAddSubmit"/>
  </template>
</div>
</template>
<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import { Companyselect } from '_c/input/index'
const addModal = Vue.component('addModal', function (resolve) {
  require(['./components/addModal/addModal.vue'], resolve)
})
const editModal = Vue.component('editModal', function (resolve) {
  require(['./components/editModal/editModal.vue'], resolve)
})
export default {
  components: {
    Companyselect,
    addModal,
    editModal
  },
  data () {
    return {
      modalState: '',
      addshow: false,
      editshow: false,
      ifAdd: false,
      ifEdit: false,
      selectRow: '',
      modalAdd: false,
      pageSize: 10,
      selectCompany: 0,
      columns: [
        {
          title: '真实姓名',
          key: 'real_name',
          width: 100
        },
        {
          title: '昵称',
          key: 'name',
          width: 100
        },
        {
          title: '公司名称',
          key: 'company',
          width: 160
        },
        {
          title: '权限',
          slot: 'authority',
          align: 'left',
          minWidth: 250
        },
        {
          title: '操作',
          slot: 'action',
          width: 160,
          align: 'center'
        }
      ],
      userData: []
    }
  },
  computed: {
    dataTotal () {
      return this.userData.length
    },
    ...mapState({
      authList: state => state.user.authList,
      tableHeight: state => state.user.windowH - 60,
      companyList: state => state.user.companyList,
      comId: state => state.user.comId
    })
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions(['getCompanyList', 'getUserList', 'addUser', 'editUser']),
    initPage () {
      if (this.companyList.length === 0) {
        this.getCompanyList()
      }
      if (this.comId !== 1) {
        this.selectCompany = this.comId
      }
      this.initUserList()
    },
    changeCom (val) {
      this.selectCompany = val
      this.initUserList()
    },
    initUserList () {
      this.getUserList({ 'companyId': this.selectCompany }).then(res => {
        if (res !== null) {
          this.userData = res
        } else {
          this.userData = []
        }
      })
    },
    handleCurrenRow (row) {
      this.selectRow = row
      if (this.authList.length === 0) {
        this.$store.dispatch('getauthList')
      }
      this.ifEdit = true
      this.editshow = true
    },
    handleAddPerson () {
      this.modalState = 'new'
      this.addshow = true
      this.ifAdd = true
      if (this.authList.length === 0) {
        this.$store.dispatch('getauthList')
      }
    },
    handleAddSubmit (playload) {
      var formData = JSON.parse(JSON.stringify(playload))
      formData.authority = formData.authority.toString()
      this.addUser(formData).then(res => {
        if (res.status === 0) {
          this.$Message.success('添加成功')
          this.initUserList()
          this.addshow = false
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    handleEditSubmit (payload) {
      var formData = JSON.parse(JSON.stringify(payload))
      formData.authority = formData.authority.toString()
      this.editUser(formData).then(res => {
        if (res.status === 0) {
          this.$Message.success('编辑成功')
          if (formData.id === this.$store.state.user.userId) {
            this.$store.dispatch('getUserInfo')
          }
          this.initUserList()
          this.editshow = false
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    changeRowState (row) {
      let payload = {}
      payload.id = row.Id
      payload.name = row.name
      payload.phone = row.phone
      payload.company_id = row.company_id
      payload.status = row.status === -1 ? 1 : -1
      payload.authority = row.auth_ids
      this.handleEditSubmit(payload)
    },
    changeAddState (val) {
      this.addshow = val
    },
    changeEditState (val) {
      this.editshow = val
    }
  }
}
</script>
<style lang="less" scoped>
  .tBtn{
    margin-right: 3px;
  }
</style>
