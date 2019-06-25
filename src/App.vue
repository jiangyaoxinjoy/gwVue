<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
  // data() {
  //   return {
  //     reload: true
  //   }
  // }
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
}
.tbHBtn{
  margin: 0 10px;
}
</style>
<style type="text/css">
  .totalfr .ivu-page-total{
    float: right;
    margin-top: 12px;
    margin-right: 16px;
  }
</style>
