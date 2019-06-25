<template>
  <baidu-map
    class="bm-view"
    :center="{lng: centerMark.lng, lat: centerMark.lat}"
    :zoom="zoom"
    :min-zoom="14"
    @ready="map_handler"
    :style="{'height':mapHeight+'px'}"
    :scroll-wheel-zoom="true"
    @moveend="mapMoveend"
  >
    <p>
      <Button type="text" icon="ios-arrow-back" @click="hideMap">返回</Button>
      <Button type="text" icon="md-share-alt" @click="resetMap">恢复视图</Button>
    </p>
    <bm-view :style="{flex:1, height: mapInnerHeight +'px',width: '100%'}"></bm-view>

    <!-- <bm-marker @click="showInfo(marker)" :icon="{url: 'images/locationP.svg', size: {width: 30, height: 30}}" :position="{lng: centerMark.lng, lat: centerMark.lat}">
    </bm-marker> -->

    <bml-marker-clusterer :averageCenter="true">
      <bm-marker @click="showInfo(marker)" :icon="{url:  marker.state == '70' ? 'images/locationE.svg' : 'images/locationP.svg', size: {width: 30, height: 30}}" v-for="marker of markersData" :position="{lng: marker.lng, lat: marker.lat}">
      </bm-marker>
    </bml-marker-clusterer>
   <!--  <bm-point-collection :points="markers" shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_SMALL" @click="clickHandler"></bm-point-collection> -->

    <bm-info-window
      :position="{lng: infoWindow.lng, lat: infoWindow.lat}"
      :show="infoWindowShow"
      @close="infoWindowClose"
      @open="infoWindowOpen"
      :width=0
      :height=0
      :autoPan="true"
    >
      <div class="info_title">
        <Tag type="dot" :color="stateColor">{{infoWindow.state | filterStateText}}</Tag>
       <!--  <span>{{infoWindow.aid}}</span> -->
        <span>{{infoWindow.device_id}}</span>
      </div>
      <p v-text="infoWindow.address"></p>
    </bm-info-window>
  </baidu-map>
</template>
<script>
import markerIconE from '../../assets/images/locationE.svg'
import markerIconP from '../../assets/images/locationP.svg'
// 红色异常图标
// import markerIconE from '@/assets/images/locationE.svg'
// // 蓝色正常图标
// import markerIconP from '@/assets/images/locationP.svg'
import { BmlMarkerClusterer } from 'vue-baidu-map'
import { mapActions } from 'vuex'

export default {
  name: 'fullMap',
  components: {
    BmlMarkerClusterer
  },
  props: {
    centerMark: {
      type: Object,
      default: function () {
        return { lng: 0, lat: 0 }
      }
    },
    // dataList: {
    //   type: Array,
    //   default: function () {
    //     return []
    //   }
    // },
    showType: {
      type: Number,
      default: 1
    },
    params: Object
  },
  filters: {
    filterStateText (val) {
      if (val === '70') {
        return '异常'
      } else {
        return '在线'
      }
    }
  },
  data () {
    return {
      markerIconE: markerIconE,
      markerIconP: markerIconP,
      infoPosition: {},
      // loading: true,
      zoom: 15,
      infoWindowShow: false,
      infoWindow: {},
      pointsView: [],
      markers: [],
      collectPoint: [],
      markersData: []
    }
  },
  computed: {
    mapParams: {
      get () {
        return this.params
      },
      set () {}
    },
    // markersData: {
    //   get () {
    //     return this.dataList
    //   },
    //   set () {}
    // },
    stateColor () {
      if (this.infoWindow.state !== '70') {
        return 'success'
      } else {
        return 'error'
      }
    },
    mapHeight () {
      return this.$store.state.user.windowH
    },
    mapInnerHeight () {
      return this.mapHeight - 35
    }
  },
  watch: {
    centerMark () {
      setTimeout(() => {
        this.addMarker()
      }, 200)
    }
  },
  methods: {
    ...mapActions(['deviceList']),
    map_handler ({ BMap, map }) {
      this.BMap = BMap
      this.map = map
      map.enableScrollWheelZoom() // 启动滚轮放大缩小
      map.enableContinuousZoom() // 启用地图惯性拖拽
    },
    showInfo (item) {
      this.infoWindow = item
      this.infoWindowShow = true
    },
    hideMap () {
      this.$emit('hideMap', false)
    },
    clickHandler () {

    },
    addMarker () {
      if (!this.BMap) return false
      var BMap = this.BMap
      var map = this.map
      map.centerAndZoom(new BMap.Point(this.centerMark.lng, this.centerMark.lat), 16)
      var bounds = map.getBounds()
      // console.log(bounds)                          //获取地图可视区域
      console.log(bounds.getSouthWest().lng)
      console.log(bounds.getNorthEast().lat)
      // console.log(bounds.getSouthWest()　)
      console.log(bounds.getNorthEast().lng)
      console.log(bounds.getSouthWest().lat)
      this.mapParams.minLatitude = bounds.getSouthWest().lat
      this.mapParams.maxLatitude = bounds.getNorthEast().lat
      this.mapParams.minLongitude = bounds.getSouthWest().lng
      this.mapParams.maxLongitude = bounds.getNorthEast().lng

      this.getMapDeviceList()
      var data = this.markersData

      let pointsView = []
      let markers = []
      let collectPoint = []
      data.forEach((val, i) => {
        if (val.lng !== 'undefined') {
          var point = new BMap.Point(val.lng, val.lat)
          pointsView.push(point)
          markers.push({ lng: val.lng, lat: val.lat })
        }
      })

      this.pointsView = pointsView
      this.markers = markers

      if (this.showType === 2) {
        map.setViewport(this.pointsView)
      }
      // this.$emit('loadingState', false)
    },
    infoWindowClose (e) {
      this.infoWindowShow = false
    },
    infoWindowOpen (e) {
      this.infoWindowShow = true
    },
    resetMap () {
      var map = this.map
      map.setViewport(this.pointsView)
    },
    clickHandler (e) {
      this.infoWindowShow = true
    },
    getMapDeviceList () {
      var payload = JSON.parse(JSON.stringify(this.mapParams))
      payload.offset = 0
      payload.limit = 10000
      this.deviceList(payload).then(res => {
        if (res.status === 0) {
          this.markersData = res.data.list === null ? [] : res.data.list
        } else {
          this.markersData = []
        }
        // this.pageLoading = false
      })
    },
    mapMoveend () {

    }
    // clear () {
    //   this.infoWindow.contents = ''
    // }
  }
}
</script>
<style lang="less" scoped>
  .bm-view{
    width: 100%;
  }
  .info_title{
    white-space: nowrap;
    padding-bottom: 10px;
    span{
      margin-right: 10px;
      display: inline-block;
      vertical-align: middle;
      margin-left: 10px;
    }
  }
</style>
