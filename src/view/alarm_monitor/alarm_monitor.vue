<template>
  <div class="demo-split">
    <Split v-model="split">
      <div slot="left" class="demo-split-pane">
        <index-table />
      </div>
      <div slot="right" class="split-pane">
        <Map/>
      </div>
    </Split>
  </div>
</template>

<script>
// import BaiMap from '_c/map/'
import IndexTable from '_c/indexTable'
// import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import Map from '@/view/alarm_monitor/components/map.vue'

export default {
  name: 'home',
  components: {
    Map,
    IndexTable
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
