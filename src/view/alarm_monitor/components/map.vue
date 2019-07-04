<template>
  <div>
    <div id="monitoringMap" class="monitoringMap" :style="{height: mapHeight +'px'}"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "Map",
  data() {
    return {
      zoom: 16
    }
  },
  computed: {
    ...mapState({
      mapHeight: state => state.user.windowH - 60,
      curMarker: state => state.alert.curMarker,
      curDeviceId: state => state.alert.curDeviceId
    })
  },
  watch: {
    curMarker: {
      handler(val){
        if (JSON.stringify(val) != '{}') {
          this.setMarker()
        }
      }
    }
  },
  mounted() {
    // 百度地图API功能
    // 创建Map实例
    var map = new BMap.Map("monitoringMap");
    this.map = map
    // 初始化地图,设置中心点坐标和地图级别
    map.centerAndZoom(new BMap.Point(121.472763,31.236552), this.zoom);
    // 添加地图类型控件
    // map.addControl(new BMap.MapTypeControl());  
    // 设置地图显示的城市 此项是必须设置的
    map.setCurrentCity("上海");    
    // 开启鼠标滚轮缩放      
    map.enableScrollWheelZoom(true);
    this.setMarker()
  },
  methods: {
    ...mapActions(['getDeviceAlertInfo']),
    setMarker() {
      var map = this.map
      map.clearOverlays(); 
      var point = new BMap.Point(this.curMarker.lng, this.curMarker.lat)
      var marker = new BMap.Marker(point)
      map.centerAndZoom(point, this.zoom);
      map.addOverlay(marker)
      marker.addEventListener('click', () => {
        this.markerWindow(point)
      });
      this.markerWindow(point)
    },
    markerWindow (point) {
      var map = this.map
      map.centerAndZoom(point, 20)
      var opts = {
          width : 450,     // 信息窗口宽度
          height: 500,     // 信息窗口高度
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
      map.openInfoWindow(infoWindow,point)
      this.getDeviceAlertInfo({'device_id': this.curDeviceId}).then( res => {
        this.$windowinfo(res)
      })
      // this.$nextTick( () => {
      //   setTimeout( () => {
      //     this.$windowinfo(this.curDeviceId)
      //   })
      // })
      // console.log(document.getElementById("test"))  
      // this.getShowAlertInfo({ "device_id": this.chooseAlert["device_id"]}).then( res => {
      //   this.alertInfo = res
        
      //   var MyComponent = Vue.extend(mapInfo)

      //   var component= new MyComponent({
      //     propsData: {
      //       alarmInfo: this.alertInfo
      //     }
      //   }).$mount();      

      //   document.getElementById('test').innerHTML = "";
      //   document.getElementById('test').appendChild(component.$el);
      // })
    },
  }
}
</script>