<template>
  <div class="demo-split">
    <Split v-model="split">
      <div slot="left" class="demo-split-pane">
        <index-table />
      </div>
      <div slot="right" class="split-pane">
        <template v-if="curMarker.lng !== 0">
          <BaiMap/>
          <!-- <BaiMap :curMarker="{lng: curMarker.lng, lat: curMarker.lat}"/> -->
        </template>
        <template else>
          <baidu-map
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

export default {
  name: 'home',
  components: {
    BaiMap,
    IndexTable
  },
  data () {
    return {
      split: 0.5,
      cHeight: 880
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
