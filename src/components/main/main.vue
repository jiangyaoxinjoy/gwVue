<template>
  <Layout style="height: 100%" class="main">
    <Menu mode="horizontal" :theme="theme1" :active-name="activeName" class="mainNav">
      <div class="logo" @click="goIndex">
        <img src="@/assets/images/logo.png">
      </div>
      <div class="wrapper-header-nav-list">
        <MenuItem to='/' name="alarm_monitoring">
            <Icon type="ios-paper" />
            报警监控
        </MenuItem>
        <MenuItem name="status" to="/status" >
            <Icon type="ios-stats" />
            设备状态
        </MenuItem>
        <MenuItem name="trace" to='/trace'>
            <Icon type="ios-people" />
            监控追溯
        </MenuItem>
        <Submenu name="manage">
          <template slot="title">
              <Icon type="ios-construct"  />
              管理
          </template>
          <MenuGroup title="管理">
              <MenuItem name="manage-user" to="/manage/user" v-if="ifManageUser">用户管理</MenuItem>
              <MenuItem name="manage-company" to="/manage/company" v-if="ifManageCompany">公司管理</MenuItem>
              <MenuItem name="manage-device" to="/manage/device" v-if="ifManageDevice">设备管理</MenuItem>
          </MenuGroup>           
        </Submenu>
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
         <keep-alive>
          <!-- <router-view></router-view> -->
         <!--  <router-view v-if="$route.meta.keepAlive"></router-view> -->
        </keep-alive>
        <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
      </Content>
    </Layout>
  </Layout>
</template>
<script>

import { mapGetters, mapState } from 'vuex'
import User from '_c/main/components/user'
import logo from '@/assets/images/logo.png'
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
      ifManageDevice: false,
      activeName: this.$router.path,
      logo
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
  },
  watch: {
    access: {
      handler(val){
        if (val.length > 0) {
          this.ifManageUser = val.find( item => item === "manage_user") ? true : false
          this.ifManageCompany = val.find( item => item === "manage_company") ? true : false
          this.ifManageDevice = val.find( item => item === "manage_device") ? true : false
        }
      },
      immediate: true
    }
  },
  methods:{
    menuList(){  // 这个方法里定义好，高亮和路由
     this.activeName= this.$route.matched[1].name
    },
    goIndex() {
      // this.$router.go(0)
      // this.$router.push({ path: '/' })
      // this.menuList()
    }
  },    
  mounted() {
    this.menuList()
  }
}
</script>
<style lang="less">
@import './main.less';
</style>
