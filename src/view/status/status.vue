<template>
  <Layout>
    <Sider hide-trigger>
      <Form label-position="top" class="sider_form">
        <FormItem label="选择公司">
          <Companyselect
          :companyList="companyList"
          :selectCompany="deviceParams.companyId"
          @changeComId="comChange"/>
        </FormItem>
        <FormItem label="报警终端状态" class="radioGroup">
          <RadioGroup v-model="deviceParams.online_state" type="button" @on-change="onlineChange">
            <Radio :label="0">全部</Radio>
            <Radio :label="1">在线</Radio>
            <Radio :label="2">异常</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="地址" class="addressSearch">
          <Input
            placeholder="输入关键字搜索"
            class="search-input"
            v-model="deviceParams.addkeys"
            @on-search="handleSearch"
            search
            clearable
            @keydown.enter.native.prevent="handleSearch"/>
          </FormItem>
        <FormItem class="exportBtn">
          <Button type="info" class="" @click="resetForm">重置</Button>
        </FormItem>
      </Form>
      <form :action="url +'deviceexport'" method="post">
        <input type="text" hidden name="addkeys" :value="deviceParams.addkeys" />
        <input type="text" hidden name="token" :value="token"/>
        <input type="text" hidden name="online_state" :value="deviceParams.online_state"/>
        <input type="text" hidden name="companyId" :value="deviceParams.companyId"/>
        <Button icon="ios-download-outline" type="primary" long html-type="submit">导出到Excel</Button>
      </form>
    </Sider>
    <Content :style="{height: tableHeight +'px'}">
     <!--  <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive> -->
      <router-view></router-view>
    </Content>
  </Layout>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import { Companyselect } from '_c/input/index'
export default {
  components: {
    Companyselect
  },
  data () {
    return {
      addressTemp: ''
    }
  },
  computed: {
    ...mapState({
      url: state => state.user.baseUrl,
      companyList: state => state.user.companyList,
      token: state => state.user.token,
      tableHeight: state => state.user.windowH - 60,
      comId: state => state.user.comId
    }),
    ...mapGetters([
      'deviceParams'
    ])
  },
  created () {
    if (this.companyList.length === 0) {
      this.getCompanyList()
    }
  },
  methods: {
    ...mapActions(['getCompanyList', 'deviceList', 'exportDeviceList']),
    ...mapMutations(['setDeviceParams']),
    queryData () {
      console.log('123')
      this.deviceParams.pageNum = 1
      this.setDeviceParams(this.deviceParams)
    },
    comChange (val) {
      this.deviceParams.companyId = val
      this.queryData()
    },
    onlineChange () {
      this.queryData()
    },
    handleSearch () {
      this.queryData()
    },
    setMapHide () {
      this.showMap = false
    },
    resetForm () {
      if (this.comId !== 1) {
        this.deviceParams.companyId = this.comId
      } else {
        this.deviceParams.companyId = 0
      }
      this.deviceParams.online_state = 0
      this.deviceParams.addkeys = ''
      this.deviceParams.pageNum = 1
      this.queryData()
    }
  }
}
</script>
<style lang="less" scoped>
@import './status.less';
</style>
<style type="text/css">
.ivu-modal-content{
  height: 100%;
}
.radioGroup .ivu-form-item-content .ivu-radio-group{
 display: flex;
}
.radioGroup .ivu-form-item-content .ivu-radio-group label {
  flex: 1;
  text-align: center;
}
.addressSearch .ivu-form-item-content{
  display: flex;
}
.exportBtn .ivu-form-item-content{
  display: flex;
  flex-direction: column;
}
.exportBtn button{
  flex: 1;
}
.sider_form .ivu-form-item-label{
  color: rgba(255,255,255,.8);
}
 .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
    height:100%;
    margin-top: -16px;
}

.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
    background: #fff;
    padding: 16px;
    padding-bottom: 0px;
}

.demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
    border-color: transparent;
}

.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
    border-color: #fff;
}
.demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
    border-radius: 0;
    background: #fff;
}
.demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
    border-top: 1px solid #3399ff;
}
.demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #3399ff;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
