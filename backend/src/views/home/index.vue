<template>
  <div class="app-wrapper openSidebar clearfix">
    <!-- sidebar -->
    <div class="sidebar-container">
      <div class="logo">
        <!-- <img src="images/logo.png" width="122.5" alt="" /> -->
        <img
          :src="require('@/assets/images/login/login-logo.png')"
          alt=""
          style="width: 117px; height: 32px"
        />
      </div>

      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="defAct"
          :unique-opened="false"
          :collapse-transition="false"
          background-color="#343744"
          text-color="#bfcbd9"
          active-text-color="#f4f4f5"
        >
          <div v-for="item in menuList" :key="item.id">
            <el-submenu
              :index="item.id"
              v-if="item.children && item.children.length > 0"
            >
              <template slot="title">
                <i class="iconfont" :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                v-for="sub in item.children"
                :index="sub.id"
                :key="sub.id"
                @click="menuHandle(sub, false)"
              >
                <i class="iconfont" :class="sub.icon"></i>
                <span slot="title">{{ sub.name }}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item
              v-else
              :index="item.id"
              @click="menuHandle(item, false)"
            >
              <i class="iconfont" :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="main-container">
      <!-- <navbar /> -->
      <div class="navbar">
        <div class="head-lable">
          <span v-if="goBackFlag" class="goBack" @click="goBack()"
            ><img
              :src="require('@/assets/images/icons/btn_back@2x.png')"
              alt=""
            />
            返回</span
          >
          <span>{{ headTitle }}</span>
        </div>
        <div class="right-menu">
          <div class="avatar-wrapper">{{ userInfo.name }}</div>
          <!-- <div class="logout" @click="logout">退出</div> -->
          <img
            :src="require('@/assets/images/icons/btn_close@2x.png')"
            class="outLogin"
            alt="退出"
            @click="logout"
          />
        </div>
      </div>
      <div class="app-main" v-loading="loading">
        <div class="divTmp" v-show="loading"></div>
        <div class="app-body" v-show="!loading">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import config from '@/common/config'
import { logoutApi } from '@/api/login'

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      defAct: '2',
      userInfo: {},
      menuList: config.menuList,
    }
  },
  computed: {
    ...mapState({
      menuActived: (state) => state.menu.menuActived,
      headTitle: (state) => state.menu.headTitle,
      goBackFlag: (state) => state.menu.goBackFlag,
      loading: (state) => state.menu.loading,
    }),
  },
  created() {
    const userInfo = window.localStorage.getItem('userInfo')
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo)
    }
    this.$store.dispatch('menu/closeLoading')
  },
  beforeDestroy() {
    this.$store.commit('menu/clear')
  },
  methods: {
    logout() {
      logoutApi().then((res) => {
        if (res.code === 1) {
          localStorage.removeItem('userInfo')
          this.$router.push('/login')
        }
      })
    },
    goBack() {
      const menu = this.menuList.find((item) => item.id === this.menuActived)
      this.menuHandle(menu, false)
    },
    menuHandle(item, goBackFlag) {
      this.$store.commit('menu/menuHandle', {
        menuActived: item.id,
        headTitle: item.name,
        iframeUrl: item.url,
        goBackFlag,
      })
    },
  },
})
</script>

<style scoped>
@import url(@/styles/common.css);
@import url(@/styles/index.css);
@import url(@/styles/icon/iconfont.css);

.body {
  min-width: 1366px;
}
.app-main {
  height: calc(100% - 64px);
}
.app-main .divTmp {
  width: 100%;
  height: 100%;
}
</style>
