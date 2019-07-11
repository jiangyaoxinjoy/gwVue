<template>
  <div>
    <div 
      id="monitoringMap" 
      class="monitoringMap" 
      :style="{height: mapHeight +'px'}"></div>
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
          setTimeout(() => {
            this.setMarker()
          },500)
        }
      },
      immediate: true
    }
  },
  mounted() {
    console.log(11111)
    var map = new BMap.Map("monitoringMap");
    this.map = map
    // 初始化地图,设置中心点坐标和地图级别
    // map.centerAndZoom(new BMap.Point(121.472763,31.236552), this.zoom);
    // 添加地图类型控件
    // map.addControl(new BMap.MapTypeControl());  
    // 设置地图显示的城市 此项是必须设置的
    map.setCurrentCity("上海");    
    // 开启鼠标滚轮缩放      
    map.enableScrollWheelZoom(true);
  },
  methods: {
    ...mapActions(['getDeviceAlertInfo']),
    setMarker() {
      var map = this.map
      this.removeMarkerEvent()
      // map.clearOverlays(); 
      var point = new BMap.Point(this.curMarker.lng, this.curMarker.lat)
      //让标记点显示在中点偏下的位置
      var centerPoint = new BMap.Point(this.curMarker.lng, Number(this.curMarker.lat) + 0.007)
      var marker = new BMap.Marker(point)
      map.addOverlay(marker)
      map.centerAndZoom(centerPoint, this.zoom);
      var opts = {
          width : 450,     // 信息窗口宽度
          height: 500,     // 信息窗口高度
      };

      marker.addEventListener('click', this.markerWindow);
      this.markerWindow()
    },
    markerWindow () {
      var map = this.map
      // map.centerAndZoom(point, this.zoom)
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
      var point = new BMap.Point(this.curMarker.lng, this.curMarker.lat);
      var infoWindow = new BMap.InfoWindow(sContent,opts);
      this.infoWindow = infoWindow
      map.openInfoWindow(infoWindow,point)
      this.getDeviceAlertInfo({'device_id': this.curDeviceId}).then( res => {
        setTimeout(() => {
          this.$windowinfo(res, true)
        })
      })
    },
    removeMarkerEvent () {
      var map = this.map
      var allOverlay = map.getOverlays();
      for(var i = 0;i<allOverlay.length;i++) {
        console.log('removeMarkerEvent')       
        allOverlay[i].removeEventListener("click", this.markerWindow);
        map.removeOverlay(allOverlay[i]);
      }
    }
  }
}
</script>
<style type="text/css">
  #monitoringMap .ivu-card-bordered {
    min-height: 490px;
  }
</style>