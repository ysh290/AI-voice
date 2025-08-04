<template>
  <div class="common-layout">
    <el-container>
      <!-- 顶部导航 -->
      <el-header class="layout_tabbar">
        <div class="logo">
          <img src="@/assets/images/logo.jpg" alt="" />
          <p>AI Voice</p>
        </div>
        <div class="tabbar">
          <div class="tabbar_left">
            <el-icon @click="isCollapse = !isCollapse">
              <component :is="isCollapse ? 'Expand' : 'Fold'" />
            </el-icon>
            <el-breadcrumb class="breadcrumb" :separator-icon="ArrowRight">
              <el-breadcrumb-item>权限管理</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="tabbar_right">
            <el-button type="primary" :icon="Refresh" circle />
            <el-button type="primary" :icon="FullScreen" circle />
            <el-button type="primary" :icon="Setting" circle />
            <img src="@/assets/images/logo.jpg" style="width: 30px; margin: 0 15px" />
            <el-dropdown>
              <span class="el-dropdown-link">
                admin
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container style="height: 100vh">
        <!-- 左侧菜单 -->
        <el-aside class="layout_slider" :width="isCollapse ? '64px' : '200px'">
          <!-- 滚动组件 -->
          <el-scrollbar class="scrollbar">
            <el-menu
              :router="true"
              active-text-color="yellowgreen"
              :default-active="route.path"
              :collapse="isCollapse"
              class="el-menu-vertical-demo"
            >
              <el-menu-item index="/layout/home">
                <el-icon><location /></el-icon>
                首页
              </el-menu-item>
              <el-menu-item index="/layout/voiceCreate">
                <el-icon><Position /></el-icon>
                教学语音生成
              </el-menu-item>
              <!-- <el-sub-menu index="/acl">
                <template #title>
                  <el-icon><document /></el-icon>
                  语音库
                </template>
                <el-menu-item index="/acl/user">用户管理</el-menu-item>
                <el-menu-item index="/acl/role">角色管理</el-menu-item>
                <el-menu-item index="/acl/permission">菜单管理</el-menu-item>
              </el-sub-menu> -->
              <el-menu-item index="/layout/voiceDatabase">
                <el-icon><document /></el-icon>
                语音库
              </el-menu-item>
              <el-menu-item index="/layout/personalizedLearning">
                <el-icon><Discount /></el-icon>
                个性化学习支持
              </el-menu-item>
              <el-menu-item index="/layout/ai">
                <el-icon><setting /></el-icon>
                ai小助手
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <!-- 内容展示区域 -->
        <el-main class="layout_main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight, FullScreen, Refresh, Setting } from '@element-plus/icons-vue'
// 获取当前路由信息
const route = useRoute()
// console.log(route.path)
const isCollapse = ref(false)
</script>
<style scoped lang="scss">
// “justify” 管主轴，
// “align-items” 管交叉轴，
// 主轴方向看 flex-direction！
.layout_tabbar {
  background-color: aquamarine;
  display: flex;
  width: 100%;
  //0-25% 发生渐变 25-75% 颜色不变（形成“纯色带”） 75-100% 再次渐变
  background-image: linear-gradient(to right, #ff9a9e 0%, #fad0c4 25%, #fad0c4 75%, #a18cd1 100%);
  .tabbar {
    display: flex;
    // background-color: black;
    width: calc(100% - 200px);
    //单行看 items，多行再看 content
    align-items: center;
    margin-left: 40px;
    justify-content: space-between;
    .tabbar_left {
      display: flex;
      align-items: center;
      .breadcrumb {
        margin-left: 20px;
      }
    }
    .tabbar_right {
      display: flex;
      align-items: center;
      .example-showcase .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
      }
    }
  }
}
.layout_slider {
  background-color: burlywood;
  width: 200px;
  height: 100vh;
  .scrollbar {
    height: calc(100vh - 60px);
  }
}
.layout_main {
  overflow: auto;
}
.logo {
  align-content: center;
  display: flex;
  img {
    height: 40px;
    margin: 10px;
  }
  p {
    margin: 20px;
    margin-left: 5px;
  }
}
</style>
