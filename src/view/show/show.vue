<template>
  <div class="show">
    <Menu mode="horizontal" active-name="1" class="menu">
      <div class="wrapper-header-nav">
        <router-link to="/bar" class="wrapper-header-nav-logo"><img src="@/assets/images/logo.png"></router-link>
        <div class="wrapper-header-nav-list">
          <h1 class="bb">感知数据汇聚平台</h1>
        </div>
        <div class="info-menu">
          <span @click="ifLoginOut = true"><Icon type="md-key" />修改密码</span>
          <span><Icon type="md-exit"/>退出登录</span>
        </div>
      </div>
    </Menu>
    <!-- <Header>header</Header> -->
    <Layout>
      <Sider hide-trigger width="400">
        <Card>
          <p slot="title" class="card_title">监控概况</p>
          <Row :gutter="20">
            <i-col :xs="12" :md="8" :lg="8" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 80px;padding-bottom: 10px;">
              <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
                <count-to :end="infor.count" count-class="count-style"/>
                <p>{{ infor.title }}</p>
              </infor-card>
            </i-col>
          </Row>
        </Card>
        <Card>
          <h3 slot="title">设备完好率</h3>
          <Row :gutter="20" style="margin-top: 10px;">
            <i-col :md="24" :lg="12" style="height: 200px;padding: 0 25px">
              <chart-pie2 style="height: 100%; "  :value="pieData" text="水压异常报警"></chart-pie2>
            </i-col>
            <i-col :md="24" :lg="12" style="height: 200px;padding: 0 25px">
              <chart-pie2 style="height: 100%; "  :value="pieData" text="倾倒报警"></chart-pie2>
            </i-col>
          </Row>
          <Row :gutter="20">
            <i-col :md="24" :lg="12" style="height: 200px;padding: 0 25px">
              <chart-pie2 style="height: 100%; "  :value="pieData" text="阀门打开报警"></chart-pie2>
            </i-col>
            <i-col :md="24" :lg="12" style="height: 200px;padding: 0 25px">
              <chart-pie2 style="height: 100%; "  :value="pieData" text="设备异常"></chart-pie2>
            </i-col>
          </Row>
        </Card>
        <Card>
          <h3 slot="title">物联异常统计</h3>
          <Row :gutter="20" class="abnormal_wrap">
            <Col span="8">
              <Icon type="ios-speedometer" size="50" color="#fff"/>
              <p class="name">离线设备</p>
              <p class="num">26</p>
            </Col>
            <Col span="8">
              <Icon type="md-battery-dead" size="50" color="#fff"/>
              <p class="name">设备低点</p>
              <p class="num">26</p>
            </Col>
            <Col span="8">
              <Icon type="ios-notifications-off" size="50" color="#fff"/>
              <p class="name">设备故障</p>
              <p class="num">26</p>
            </Col>
          </Row>
        </Card>
      </Sider>
      <Content class="map_content">
        <RadioGroup v-model="alarmType" type="button" class="mapBtn" size="large" style="">
          <Radio label="全部"></Radio>
          <Radio label="倾倒"></Radio>
          <Radio label="水压异常"></Radio>
          <Radio label="阀门打开"></Radio>
          <Radio label="设备异常"></Radio>
        </RadioGroup>
        <show-map></show-map>
        <Button @click="value1 = !value1" size="small" type="warning" class="drawer_control">{{value1 ? '隐藏列表' : '显示列表'}}</Button>
        <div class="overlay">
          <Drawer width="100%" :transfer="false" :mask="false" inner :closable="false" v-model="value1" class-name="drawer_wrap">
            <CellGroup>
              <Cell
                v-for="item in alarmData.rows"
                :extra="item.confirm_alarm_on"
                :label="item.address"
                :key="index"
              >
              <Button @click="openAlarm(item)" size="small" type="success">{{item.alarm_type | textFilter}}</Button>
            </Cell>
            </CellGroup>
          </Drawer>
          <!-- <CellGroup>
            <Cell
              :title="item.alarm_type | textFilter"
              v-for="item in alarmData.rows"
              :extra="item.confirm_alarm_on"
              :label="item.address"
            />
          </CellGroup> -->
        </div>
      </Content>
      <Sider hide-trigger width="400">
        <Card class="detail_wrap" :padding="0">
          <h3 slot="title">设备状态明细</h3>
          <Table class="" :columns="columns" :data="tableData" :border="false"></Table>
        </Card>
        <Card>
          <h3 slot='title'>设备电量信号参数</h3>
          <chart-bar style="height: 300px;" :value="barData" text="每周用户活跃量"/>
        </Card>
      </Sider>
    </Layout>
    <login-out :modal="ifLoginOut" @changeModalState="changLoginOutState"></login-out>
  </div>
</template>
<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import showMap from '_c/showMap/showMap'
import { ChartPie2, ChartBar } from '_c/charts'
import loginOut from './components/login-out/login-out.vue'
export default {
  data () {
    return {
      ifLoginOut: false,
      value1: false,
      inforCardData: [
        { title: '报警数', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: '异常数', icon: 'md-locate', count: 232, color: '#19be6b' },
        { title: '设备总数', icon: 'md-help-circle', count: 142, color: '#ff9900' }
      ],
      pieData: [
        { value: 33, name: '水压异常' },
        { value: 310, name: '总数' }
      ],
      columns: [
        {
          title: '地区',
          key: 'area',
          className: 't_hd'
        },
        {
          title: '报警',
          key: 'alarmNum',
          className: 't_hd'
        },
        {
          title: '异常',
          key: 'abnormalNum',
          className: 't_hd'
        },
        {
          title: '总数',
          key: 'totalNum',
          className: 't_hd'
        }
      ],
      tableData: [
        {
          area: '全部',
          alarmNum: '30',
          abnormalNum: '20',
          totalNum: '50'
        },
        {
          area: '其他地区',
          alarmNum: '30',
          abnormalNum: '20',
          totalNum: '50'
        }
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      },
      alarmType: ''
    }
  },
  components: {
    InforCard,
    CountTo,
    showMap,
    ChartPie2,
    ChartBar,
    loginOut
  },
  created () {
    this.$store.dispatch('getAlarmData')
  },
  computed: {
    alarmData () {
      return this.$store.state.user.alarmData
    }
  },
  methods: {
    openAlarm (e) {
      this.$Message.info({ content: e })
      console.log(e)
    },
    changLoginOutState (val) {
      console.log(val)
      this.ifLoginOut = val
    }
  },
  filters: {
    textFilter: val => {
      var texts = ''
      switch (val) {
        case 'PL':
          texts = '水压异常'
          break
        case 'OPEN':
          texts = '阀门打开'
          break
        case 'DUMPING':
          texts = '倾倒'
          break
        case 'xx':
          texts = '设备异常'
          break
        default:
          texts = '设备异常'
          break
      }
      return texts
    }
  }
}
</script>
<style lang="less" scoped>
@import './show.less';
</style>
<style type="text/css">
  .ivu-table th.t_hd{
    background: rgba(142,255,246,0.1);
    color: #33FFFF;
    border: none;
  }
  .ivu-table{
    background-color: #141414;
  }
  .ivu-table td.t_hd {
     background-color: transparent;
     color: #fff;
     border-color: #122B2B;
  }
  .ivu-table::before {
    background-color: #122B2B;
  }
  .ivu-table-wrapper{
    border: none;
  }
  .ivu-cell-extra,.ivu-cell-label{
    color: #fff;
  }
  .ivu-cell-label{
    padding-top: 10px;
  }
  .ivu-cell-footer{
    top: 32%;
  }
  .ivu-cell:hover {
    background: rgba(142,255,246,0.1);
  }
  .ivu-drawer-content{
    background: rgba(0,0,0,0.5);
  }
</style>
