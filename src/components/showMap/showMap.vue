<template>
  <baidu-map
    class="map"
    :center="{lng: 116.404, lat: 39.915}"
    :zoom="15"
    :scroll-wheel-zoom="true"
    :style="{height: mapHeight+'px'}"
    :mapStyle="mapStyle"
  >
  <!-- <bm-overlay
    pane="labelPane"
    :class="{sample: true, active}"
    @draw="draw"
    @mouseover.native="active = true"
    @mouseleave.native="active = false">
    <div>我爱北京天安门</div>
  </bm-overlay> -->
  </baidu-map>
</template>
<script>
import { getClientHeight } from '@/libs/tools'
import { mapStyle } from '@/assets/js/mapStyle'
export default {
  data () {
    return {
      active: false,
      mapHeight: '',
      mapStyle: {
        styleJson: mapStyle
      }
    }
  },
  mounted () {
    this.getMapHeight()
  },
  created () {
    this.initMap()
  },
  methods: {
    getMapHeight () {
      this.mapHeight = getClientHeight() - 115
    },
    initMap () {
    },
    draw () {

    }
  }
}
</script>
<style lang="less">
@import './showMap.less';
</style>
