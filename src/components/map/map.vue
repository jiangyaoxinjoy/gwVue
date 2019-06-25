<template>
   <!-- :center="{ lng: curMarker.lng, lat: curMarker.lat }" -->
  <baidu-map
    class="bm-view"
    :zoom="zoom"
    @ready="map_handler"
    :scroll-wheel-zoom="true"
    :style="{ 'height': mapHeight+'px', 'width': '100%' }"
  >
    <Spin size="large" fix v-if="loading"></Spin>
    <bm-marker :position="curMarker"  @click="infoWindowOpen"></bm-marker>
    <bm-info-window
      :show="infoWindowShow"
      @close="infoWindowClose"
      :position="curMarker"
      :height=0
      :width=0
      :autoPan="true"
    >
      <template v-if="JSON.stringify(alarmInfo) != '{}'">
        <map-info :alarmInfo="alarmInfo"/>
      </template>
    </bm-info-window>
  </baidu-map>
</template>
<script>
import mapInfo from './components/mapInfo/mapInfo.vue'
import { mapState } from 'vuex'

export default {
  name: 'BaiMap',
  components: {
    mapInfo
  },
  data () {
    return {
      loading: true,
      zoom: 16,
      infoWindowShow: true,
      showTels: false
    }
  },
  computed: {
    ...mapState({
      alarmInfo: state => state.alert.alarmInfo,
      mapHeight: state => state.user.windowH - 60,
      curMarker: state => state.alert.curMarker
    })
  },
  watch: {
    alarmInfo (val) {
      if (JSON.stringify(val) !== '{}') {
        this.loading = false
      }
    },
    curMarker () {
      // 不延迟切换报警窗口不出现
      setTimeout(() => {
        this.infoWindowShow = true
      }, 200)
    }
  },
  methods: {
    map_handler ({ BMap, map }) {
      this.map = map
      console.log(222)
      this.infoWindowOpen()
      this.loading = false
      map.centerAndZoom(new BMap.Point(this.curMarker.lng, Number(this.curMarker.lat) + 0.006), this.zoom)
    },
    infoWindowClose (e) {
      this.infoWindowShow = false
    },
    infoWindowOpen () {
      this.infoWindowShow = true
    }
  },
  created () {

  },
  beforeDestroy () {
    this.$store.commit('setCurMarker', { lat: 0, lng: 0 })
  }
}
</script>
<style lang="less">
  .bm-view{
    width: 100%;
  }
</style>
