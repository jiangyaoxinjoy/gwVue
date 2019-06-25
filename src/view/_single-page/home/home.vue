<template>
  <Split v-model="split">
    <div slot="left" class="demo-split-pane">
      <index-table />
    </div>
    <div slot="right" class="split-pane">
      <template v-if="JSON.stringify(curMarker) != '{}'">
        <BaiMap
          :curMarker="{lng: curMarker.lng, lat: curMarker.lat}"
        />
      </template>
    </div>
  </Split>
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
  created () {
    this.$store.dispatch('getAlarmData')
  },
  computed: {
    curMarker () {
      return this.$store.state.user.curMarker
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
.split-pane{
  position: relative;
  top: 0;
  left: 0;
}
</style>
