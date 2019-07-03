<template>
  <div class="demo-split">
    <Split v-model="split">
      <div slot="left" class="demo-split-pane">
        <index-table />
      </div>
      <div slot="right" class="split-pane">
        <!-- <BaiMap/> -->
        <template v-if="curMarker.lng !== 0">
          <BaiMap/>
        </template>
        <template else>
          <baidu-map
            ak="QPPRPzUYlpEqGNkyylz2OuTBQCeWVHAd"
            class="bm-view"
            center="上海"
            :zoom="14"
            :scroll-wheel-zoom="true"
            :style="{'height':1000+'px'}"
          >
          </baidu-map>
        </template>
      </div>
    </Split>
  </div>
</template>

<script>
import BaiMap from '_c/map/'
import IndexTable from '_c/indexTable'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'

export default {
  name: 'home',
  components: {
    BaiMap,
    IndexTable,
    BaiduMap
  },
  data () {
    return {
      split: 0.4
    }
  },
  computed: {
    curMarker () {
      return this.$store.state.alert.curMarker
    }
  }
}
</script>

<style lang="less">
.demo-split{
    height: calc(100vh); ;
    border: 1px solid #dcdee2;
}
</style>
