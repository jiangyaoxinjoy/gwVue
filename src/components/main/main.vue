<template>
  <Layout style="height: 100%" class="main">
    <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem to='/' name="1">
            <Icon type="ios-paper" />
            报警监控
        </MenuItem>
        <MenuItem name="2" to="/status">
            <Icon type="ios-stats" />
            设备状态
        </MenuItem>
        <MenuItem name="3" to='/trace'>
            <Icon type="ios-people" />
            监控追溯
        </MenuItem>
        <Submenu name="4">
            <template slot="title">
                <Icon type="ios-construct"  />
                管理
            </template>
            <MenuGroup title="管理">
                <MenuItem name="4-1" to="/manage/user" v-if="ifManageUser">用户管理</MenuItem>
                <MenuItem name="4-2" to="/manage/company" v-if="ifManageCompany">公司管理</MenuItem>
                <MenuItem name="4-3" to="/manage/device" v-if="ifManageDevice">设备管理</MenuItem>
            </MenuGroup>
        </Submenu>
        <div class="info-menu">
          <MenuItem name="show" to='/show' target="_blank">
            <Icon type="md-analytics" size="32" color="#02a2aa"/>
          </MenuItem>
          <user :user-name="userName"/>
        </div>
    </Menu>
    <!-- <TopMenu :active-name="$route.name" /> -->
    <Layout>
      <Content class="main-content-con">
        <router-view></router-view>
        <!-- <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>-->
      </Content>
    </Layout>
  </Layout>
</template>
<script>

import { mapGetters, mapState } from 'vuex'
import User from '_c/main/components/user'
export default {
  name: 'Main',
  components: {
    User
  },
  data () {
    return {
      collapsed: false,
      theme1: 'light',
      ifManageUser: false,
      ifManageCompany: false,
      ifManageDevice: false
    }
  },
  beforeCreate () {
    this.$store.commit('getWindowH')
    window.onresize = () => {
      this.$store.commit('getWindowH')
    }
  },
  computed: {
    ...mapState({
      userName: state => state.user.userName,
      access: state => state.user.access
    })
    // ...mapGetters({
    //   comNav: 'comNavset'
    // })
  },
  watch: {
    access: {
      handler(val){
        console.log(2222222)
        // var manage = ["manage_user", "manage_device","manage_company"]
        if (val.length > 0) {
          this.ifManageUser = val.find( item => item === "manage_user") ? true : false
          this.ifManageCompany = val.find( item => item === "manage_company") ? true : false
          this.ifManageDevice = val.find( item => item === "manage_device") ? true : false
          // console.log(company)
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="less">
@import './main.less';
</style>
