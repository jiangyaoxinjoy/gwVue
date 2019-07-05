<template>
  <div class="show">
    <!-- loading start -->
    <Spin fix v-if="loading">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <!-- loading end -->
    <!-- 筛选框 start-->
    <Companyselect
    class="headerSelect"
    v-if="comId === 1"
    :companyList="companyList"
    :selectCompany="selectCompany"
    @changeComId="comChange"/>
    <!-- 筛选框 end -->
    <Menu mode="horizontal" active-name="1" class="menu">
      <div class="wrapper-header-nav">
        <router-link to="/bar" class="wrapper-header-nav-logo"><img src="@/assets/images/logo.png"></router-link>
        <div class="wrapper-header-nav-list">
          <h1 class="bb">感知数据汇聚平台</h1>
        </div>
      </div>
    </Menu>
    <Layout>
      <Content class="map_content">
        <div class="mapHeader">
          <div class="badge" @click="alertTypeChoose(1)">
            <Badge :count="detail.prec" type="success">
              <Icons :size="35" type="shuiyaxiaxian"/>
              <span class="badge_label">水压异常</span>
            </Badge>
          </div>
          <div class="badge" @click="alertTypeChoose(2)">
            <Badge class="badge" :count="detail.opc" type="info">
              <Icons :size="35" type="shuiyaxiaxian"/>
              <span class="badge_label">阀门打开</span>
            </Badge>
          </div>
          <div class="badge" @click="alertTypeChoose(3)">
            <Badge class="badge" :count="detail.downc" type="warning">
              <Icons :size="35" type="shuiyaxiaxian"/>
              <span class="badge_label">撞倒</span>
            </Badge>
          </div>
          <div class="badge" @click="alertTypeChoose(4)">
            <Badge class="badge" :count="detail.lossc" type="error">
              <Icons :size="35" type="shuiyaxiaxian"/>
              <span class="badge_label">失联</span>
            </Badge>
          </div>                          
        </div>
        <div id="XSDFXPage" class="XSDFXPage" :style="{height: (mapHeight - 70) +'px'}"></div>
        <Button @click="value1 = !value1" size="small" type="warning" class="drawer_control">{{value1 ? '隐藏列表' : '显示列表'}}</Button>
        <div class="overlay">
          <Drawer width="100%" :transfer="false" :mask="false" inner :closable="false" v-model="value1" class-name="drawer_wrap">
            <CellGroup @on-click="openAlarm">
              <Cell
                v-for="(item, index) in alarmData"
                :extra="item.hearttime | timeFilter"
                :label="item.address"
                :key="item.Id"
                :name="index"
              >
              <Button v-if="item.state === '10'" size="small" type="success">{{item.state | textFilter}}</Button>
              <Button v-if="item.state === '20'" size="small" type="info">{{item.state | textFilter}}</Button>
              <Button v-if="item.state === '30'" size="small" type="warning">{{item.state | textFilter}}</Button>
              <Button v-if="item.state === '70'" size="small" type="error">{{item.state | textFilter}}</Button>
            </Cell>
            </CellGroup>
          </Drawer>
        </div>
      </Content>
      <Sider hide-trigger :width="windowWidth/3">
        <p class="cherts_header"> {{alertpie.title}}</p>
        <chart-pie2 
          :style="{height: (mapHeight*0.28 -45) + 'px'}" 
          :value="alertpie.value"  
          :text="alertpie.title"
          backgroundColor="#091220"></chart-pie2>
        <p class="cherts_header"> {{unusualpie.title}}</p>
        <chart-pie2 
          :style="{height: (mapHeight*0.28 - 45) + 'px'}" 
          :value="unusualpie.value"  
          :text="unusualpie.title"
          backgroundColor="#091220"></chart-pie2>
        <p class="cherts_header"> 设备报警折线图</p>
        <chart-line2 
          :style="{height: (mapHeight*0.44 - 45) + 'px'}" 
          :cola="cola"
          :colb="colb"
          :colc="colc"
          :dayString="dayString"
          backgroundColor="#091220"
          ></chart-line2>
      </Sider>
    </Layout>

    <Modal
      v-model="notifyModal"
      class="notifyModal"
      :footer-hide="true">
      <div slot="header" class="header">
        <h3> {{notifyData.name}} <span>{{notifyData.tel}}</span></h3>
      </div>
      <div class="content">
        <div v-for="notify in notifyData.list" class="wrap" :key="notify.Id">
          <Steps
            :current="notify.state == 1 ? 3 : 2"
            :status="notify.state == 1 ? 'finish' : 'error'"
            size='small'
            direction="horizontal"
          >
            <Step class="stepitem" :title="notify.sendtime | time"></Step>
            <Step class="stepitem" :title="notify.type | notifyTypeMethod"></Step>
            <Step class="stepitem" :title="[notify.receivetime, notify.state] | stateFilter"></Step>
          </Steps>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie2, ChartLine2 } from '_c/charts'
import loginOut from './components/login-out/login-out.vue'
import { mapActions, mapState } from 'vuex'
import Icons from '_c/icons/'
// import mapInfo from '_c/map/components/mapInfo/mapInfo.vue'
import SquareOverlay from '@/libs/marker.js'

import Vue from 'vue/dist/vue.esm.js'
import mapInfo from './components/windowInfo/info.vue'

// const WindowInfo =  vue.extend(windowInfo)
import PL from '@/assets/images/PL2.png'
import { getClientWidth } from '@/libs/tools.js'
import { Companyselect } from '_c/input/index'
import { markerEvent } from '@/libs/func.js'
import { RiQiYear } from '@/libs/util'
// console.log(markerEvent)
export default {
  components: {
    Companyselect,
    InforCard,
    CountTo,
    ChartPie2,
    loginOut,
    Icons,
    ChartLine2,
    mapInfo
  },
  data () {
    return { 
      unalertDeviceFlag: false,
      selectCompany: 1,
      windowWidth: getClientWidth(),
      notifyModal: false,
      notifyData: "",
      value1: true,
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
      alarmType: '',
      alarmData: [],
      detail: "",
      alertpie: {
        value: [],
        title: '报警统计',
        type: 'pie'
      },
      unusualpie: {
        value: [],
        title: '异常统计',
        type: 'pie'
      },
      cola: [],
      colb: [],
      colc:[],
      dayString:[],
      alertInfo:"",
      chooseAlert:"",
      zoom: 16,
      chooseAlertList:[],
      canGetUnalertDevice: false,
      deviceParams: {},
      unalertDeviceList: [],
      loading: true
    }
  },
  beforeCreate () {
    this.$store.commit('getWindowH')
    window.onresize = () => {
      this.$store.commit('getWindowH')
      this.windowWidth = getClientWidth()
    }
  },
  created () {
    this.initPage()
    if (this.companyList.length === 0) {
      this.getCompanyList()
    }
  },
  computed: {
    ...mapState({
      mapHeight: state => state.user.windowH - 60,
      comId : state => state.user.comId,
      companyList: state => state.user.companyList,
    })
  },
  watch: {
    chooseAlertList: {
      handler(val) {
        this.setMarker()
      },
      // immediate: false
    },
    unalertDeviceList() {
      this.setUnalertMarker()
    }
  },
  methods: {
    ...mapActions(['getShowUnalertDevice','getDevicemonitoring', 'getAlertAnalyze', 'getShowAlertInfo','getCompanyList']),
    alertTypeChoose (type) {
      var list = [];
      switch (type) {
        case 1:
           list = this.detail.alertList.filter( item => {
            if(item.state == '10') return item
          })
          break;
        case 2:
           list = this.detail.alertList.filter( item => {
            if(item.state == '20') return item
          })
          break;
        case 3:
          list = this.detail.alertList.filter( item => {
            if(item.state == '30') return item
          })
          break;
        case 4:
          list = this.detail.alertList.filter( item => {
            if (item.state == '70') {
              return item
            }
          })
          break;
        default:
          // statements_def
          break;
      }  
      if (list.length > 0) {
        this.chooseAlert = list[0]
      }
      this.chooseAlertList = list  
      this.alarmData = list
    },
    //没有报警的标记点
    setUnalertMarker () {
      if (this.unalertDeviceList.length === 0) return
      var map = this.map
      this.unalertDeviceList.forEach( (val,key) => {
        console.log(val)
        var point = new BMap.Point(val.lng, val.lat)
        var marker = new BMap.Marker(point)
        map.addOverlay(marker)

        var opts = {
          width : 200,     // 信息窗口宽度
          height: 100,     // 信息窗口高度
          title :  `设备号： ${val.device_id}`, // 信息窗口标题
          enableMessage:true//设置允许信息窗发送短息
        }
        var infoWindow = new BMap.InfoWindow(`地址：${val.address}`, opts);  // 创建信息窗口对象 

        marker.addEventListener("click", () => {
          map.openInfoWindow(infoWindow,point); //开启信息窗口
        })
      })
    },
    //报警状态的标记点
    setMarker () {
      var map = this.map
      this.removeMarkerEvent()
      // map.clearOverlays(); 
      if (this.chooseAlertList.length === 0 ) return  
      var points = new Array();     
      // var that = this
      this.chooseAlertList.forEach( (item,key) => {
        var point = new BMap.Point( item.lng, item.lat);
        points.push(point)
        let color = this.markerColor(item.state)
        var myMarker = new SquareOverlay({lng:item.lng, lat:item.lat}, 30, color,map, item.device_id); 
        map.addOverlay(myMarker);

        myMarker.addEventListener('click', () => {
          console.log(this.infoWindow)
          // if (this.infoWindow != undefined) {
          //   console.log(this.infoWindow.style)
          // } else {
          //   this.openWindow(myMarker)
          // }
         
          this.openWindow(myMarker)
        });        
      })
      map.setViewport(points)
    },
    openWindow (e) {
      // console.log(e)
      this.chooseAlert = e.getMsg()    
      this.markerWindow()
    },
    removeMarkerEvent () {
      var map = this.map
      var allOverlay = map.getOverlays();
      for(var i = 0;i<allOverlay.length;i++) {
        var marker = allOverlay[i]
        if (marker.name = 'myMarker') {
          marker.removeEventListener("click", () => {
            this.openWindow(marker)
          });
          console.log('removeMarkerEvent') 
          map.removeOverlay(marker);
        }
      }
    },
    //报警标记点的窗口
    markerWindow () {
      var point = new BMap.Point( this.chooseAlert.lng, this.chooseAlert.lat);
      var centerPoint = new BMap.Point( Number(this.chooseAlert.lng) + 0.0008, this.chooseAlert.lat);
      // if (this.chooseAlertList.length === 0) return
      var map = this.map
      map.centerAndZoom(centerPoint, 20)
      var opts = {
          width : 350,     // 信息窗口宽度
          height: 450,     // 信息窗口高度
      };
      var sContent =`
        <div id="windowInfo">
          <div class="ivu-spin ivu-spin-large ivu-spin-fix">
            <div class="ivu-spin-main">
              <span class="ivu-spin-dot"></span> 
              <div class="ivu-spin-text"></div>
            </div>
          </div>
        </div>`;
      var infoWindow = new BMap.InfoWindow(sContent,opts);
      this.infoWindow = infoWindow
      map.openInfoWindow(infoWindow,point)
      this.getShowAlertInfo({ "device_id": this.chooseAlert["device_id"]})
      .then( res => {
        setTimeout(() => {
          this.$windowinfo(res, false)
        })
      })
    },
    markerColor(val){
      let color =''
      switch (val) {
        case '10':
          color = "#0DF50D"
          break;
        case '20':
          color = "#619DDF"
          break;
        case '30':
          color = "#FFD100"
          break;
        case '70':
          color = "#FF4A3B"
          break;
        default:
          // statements_def
          break;
      }
      return color
    },
    openAlarm (index) {

      this.chooseAlert = this.alarmData[index]
      console.log(this.chooseAlert)
      this.markerWindow()
      // this.chooseAlertList = [this.chooseAlert]
    },
    changLoginOutState (val) {
      console.log(val)
      this.ifLoginOut = val
    },
    comChange (val) {
      this.selectCompany = val
      this.initPage()
    },
    initPage () {
      var comId = this.comId === 1 ? this.selectCompany : comId
      this.getDevicemonitoring({'companyId': comId}).then(res => {
        this.detail = res
        if ( res.alertList !== null) {
          this.alarmData = res.alertList
          this.chooseAlertList = res.alertList
          
        } else {
          this.chooseAlertList = []
          this.alarmData = []
        }
        // '水压异常', '阀门打开','倾倒', '失联'
        this.alertpie.value = [
          {value: res.prec, name: '水压异常'},
          {value: res.opc, name: '阀门打开'},
          {value: res.downc, name: '倾倒'}
          // {value: res.deviceTotal - res.prec - res.opc - res.downc - res.lossc,name: '正常'}
        ]

        this.unusualpie.value = [
          {value: res.lossc, name: '失联'},
          {value: res.sigc, name: '低信号'},
          {value: res.powerc, name: '低电量'}
        ]
      })
      this.getAlertAnalyze({'companyId': comId}).then( res => {
        // console.log(res)
        if (res.length > 0) {
          var cola = [],
              colb = [],
              colc = [],
              dayString = []
          res.forEach( (val, key) => {
            cola.push(val.cola)
            colb.push(val.colb)
            colc.push(val.colc)
            dayString.push(val.dayString)
          })
          this.cola = cola
          this.colb = colb
          this.colc = colc
          this.dayString = dayString
        }
      })
    },
    getUnalertDevice () {
      var map = this.map;
      var bounds = map.getBounds()
      this.deviceParams.minLatitude = bounds.getSouthWest().lat
      this.deviceParams.maxLatitude = bounds.getNorthEast().lat
      this.deviceParams.minLongitude = bounds.getSouthWest().lng
      this.deviceParams.maxLongitude = bounds.getNorthEast().lng
      this.deviceParams.companyId = this.comId === 1 ? this.selectCompany : this.comId
      this.getShowUnalertDevice(this.deviceParams).then( res => {
        this.unalertDeviceList = res === null ? [] : res
      })
      this.unalertDeviceFlag = false
      // this.setUnalertMarker()
    }
  },
  filters: {
    textFilter: val => {
      var texts = ''
      switch (val) {
        case '10':
          texts = '水压异常'
          break
        case '20':
          texts = '阀门打开'
          break
        case '30':
          texts = '倾倒'
          break
        case '70':
          texts = '设备异常'
          break
        default:
          break
      }
      return texts
    },
    timeFilter: function (value) {
      return RiQiYear(value)
    },
  },
  mounted() {
    // 百度地图API功能
    // 创建Map实例
    var map = new BMap.Map("XSDFXPage");
    this.map = map
    // 初始化地图,设置中心点坐标和地图级别
    map.centerAndZoom(new BMap.Point(121.472763,31.236552), this.zoom);
    // 添加地图类型控件
    // map.addControl(new BMap.MapTypeControl());  
    // 设置地图显示的城市 此项是必须设置的
    map.setCurrentCity("上海");    
    // 开启鼠标滚轮缩放      
    map.enableScrollWheelZoom(true);
    map.setMapStyleV2({     
      styleId: '14b72cd191e675ac6257db90d1bf6895'
    });
    // this.getUnalertDevice()
    map.addEventListener("zoomend", (e) => {
      var ZoomNum = map.getZoom();
      console.log(ZoomNum)
      if(ZoomNum > 15) {
        this.canGetUnalertDevice = true
      } else {
        this.canGetUnalertDevice = false
      }
    });
    map.addEventListener("dragend", (e) => {
      console.log(this.canGetUnalertDevice)
      if (this.unalertDeviceFlag) {
        return
      }
      if (this.canGetUnalertDevice) {
        this.getUnalertDevice()
      }
    })
    map.addEventListener("tilesloaded", () => {
      this.loading = false
    });
  }
}
</script>
<style lang="less" scoped>
@import './show.less';
</style>
<style type="text/css">
  .XSDFXPage{
     width: 100%;
  }
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
  .overlay .ivu-cell-extra,.overlay .ivu-cell-label{
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
    background: rgba(9,18,32,0.7);
  }
  .ivu-badge-count{
    top:  5px;
    right: 5px;
  }
  @keyframes scaleDraw {  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
    0%{
        transform: scale(0.9);  /*开始为原始大小*/
    }
    25%{
        transform: scale(1.2); /*放大1.1倍*/
    }
    50%{
        transform: scale(0.9);
    }
    75%{
        transform: scale(1.2);
    }
  }
  .info_header{
    height: 70px;
  
  }
  .info_header img {
    width: 60px;
    height: auto
  }
  .headerSelect .ivu-select-selection {
    background-color: #00070f;
  }
  .ivu-menu-horizontal.ivu-menu-light:after {
    background: #00070f;
  }
  .headerSelect.ivu-select{
    color: #fff;
  } 
  .show .info{
    height: 450px;
  }
  .show .step_wrap {
    margin-left: 12px;
  }
  .show .tel{
    margin-right: 53px;
  }
  .show .step_block .step_btn{
    width: calc(100% - 50px);
  }
  .show .ivu-card-bordered {
    min-height: 440px;
  }
</style>
<style type="text/css" scoped>
  .ivu-spin-fix{
    z-index: 1001;
    background-color: rgba(9,18,32,0.9);
  }
</style>
