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
            <el-icon class="collapse-icon" @click="isCollapse = !isCollapse">
              <component :is="isCollapse ? 'Expand' : 'Fold'" />
            </el-icon>
            <el-breadcrumb class="breadcrumb" :separator-icon="ArrowRight">
              <el-breadcrumb-item>语音库</el-breadcrumb-item>
              <el-breadcrumb-item>语料</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="tabbar_right">
            <el-button class="nav-btn" :icon="Refresh" circle />
            <el-button class="nav-btn" :icon="FullScreen" circle />
            <el-button class="nav-btn" :icon="Setting" circle />
            <img
              src="@/assets/images/logo.jpg"
              style="
                width: 30px;
                margin: 0 15px;
                border-radius: 50%;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
              "
            />
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
      <el-container class="main-container">
        <!-- 左侧菜单 -->
        <el-aside class="layout_slider" :width="isCollapse ? '64px' : '200px'">
          <el-scrollbar class="scrollbar">
            <el-menu
              :router="true"
              active-text-color="#4B5E7A"
              :default-active="route.path"
              :collapse="isCollapse"
              class="el-menu-vertical-demo"
            >
              <el-menu-item index="/layout/home">
                <el-icon><location /></el-icon>
                <span>首页</span>
              </el-menu-item>
              <el-menu-item index="/layout/voiceCreate">
                <el-icon><Position /></el-icon>
                <span>教学语音生成</span>
              </el-menu-item>
              <el-menu-item index="/layout/voiceDatabase">
                <el-icon><document /></el-icon>
                <span>语音库</span>
              </el-menu-item>
              <el-menu-item index="/layout/personalizedLearning">
                <el-icon><Discount /></el-icon>
                <span>个性化学习支持</span>
              </el-menu-item>
              <el-menu-item index="/layout/ai">
                <el-icon><setting /></el-icon>
                <span>ai小助手</span>
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <!-- 内容展示区域 -->
        <el-main class="layout_main" v-el-main-infinite-scroll>
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
const route = useRoute()
const isCollapse = ref(false)
</script>
<style scoped lang="scss">
// :root {
//   --main-color: #4b5e7a;
//   --sub-color: #6c6f93;
//   --bg-color: #f5f6fa;
//   --card-color: #fff;
//   --btn-color: #4b5e7a;
//   --hover-bg: #e9ecf3;
//   --active-bg: #d6dbe9;
//   --gradient-main: linear-gradient(90deg, #4b5e7a 0%, #6c6f93 100%);
// }
:root {
  --main-color: #4b5e7a;
  --sub-color: #6c6f93;
  --bg-color: #f5f6fa;
  --card-color: #f9f9f9f9; // 稍微带点灰色，不是纯白
  --btn-color: #4b5e7a;
  --hover-bg: #d0e8ff; // 悬停时的背景颜色，更鲜艳的蓝色
  --hover-color: #0056b3; // 悬停时的文字颜色，鲜艳的蓝色
  --active-bg: #7bbdf9; // 激活时的背景颜色，更鲜艳的蓝色
  --active-color: #004080; // 激活时的文字颜色，鲜艳的蓝色
  --active-shadow: 0 4px 12px rgba(0, 64, 128, 0.2); // 激活时的阴影，增加层次感
  --active-border: 2px solid #007bff; // 激活时的边框颜色
  --active-icon-color: #007bff; // 激活时的图标颜色
  --gradient-main: linear-gradient(90deg, #4b5e7a 0%, #6c6f93 100%);
}
.layout_tabbar {
  background: var(--card-color);
  display: flex;
  width: 100%;
  height: 56px;
  align-items: center;
  box-shadow: 0 2px 8px rgba(75, 94, 122, 0.06);
  position: relative;
  /* 渐变bar */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    background: var(--gradient-main);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .logo {
    display: flex;
    align-items: center;
    img {
      height: 36px;
      margin: 8px 10px 8px 0;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }
    p {
      color: var(--main-color);
      font-size: 1.2rem;
      font-weight: bold;
      margin-left: 5px;
      letter-spacing: 2px;
    }
  }
  .tabbar {
    display: flex;
    width: calc(100% - 200px);
    align-items: center;
    margin-left: 40px;
    justify-content: space-between;
    .tabbar_left {
      display: flex;
      align-items: center;
      .collapse-icon {
        color: var(--main-color);
        font-size: 22px;
        margin-right: 18px;
        cursor: pointer;
        transition: color 0.2s;
        &:hover {
          color: var(--sub-color);
        }
      }
      .breadcrumb {
        margin-left: 20px;
        .el-breadcrumb__item {
          color: var(--sub-color);
        }
      }
    }
    .tabbar_right {
      display: flex;
      align-items: center;
      .nav-btn {
        margin-right: 8px;
        background: var(--main-color);
        border: none;
        color: #fff;
        transition: background 0.2s;
      }
      .nav-btn:hover {
        background: var(--gradient-main);
        color: #fff;
      }
      .el-dropdown-link {
        cursor: pointer;
        color: var(--main-color);
        display: flex;
        align-items: center;
        font-weight: 500;
      }
    }
  }
}
// .layout_slider {
//   background: var(--card-color);
//   // width: 200px;
//   height: 100vh;
//   box-shadow: 2px 0 12px rgba(75, 94, 122, 0.06);
//   transition: width 0.3s cubic-bezier(0.4, 2, 0.6, 1);
//   overflow: hidden;
//   .scrollbar {
//     height: calc(100vh - 56px);
//     padding-top: 12px;
//   }
//   .el-menu {
//     background: transparent;
//     border: none;
//     .el-menu-item {
//       border-radius: 6px;
//       margin: 6px 8px;
//       color: var(--main-color);
//       font-weight: 500;
//       transition:
//         background 0.2s,
//         color 0.2s;
//       &:hover {
//         background: var(--hover-bg);
//         color: var(--btn-color) !important;
//       }
//       &.is-active {
//         background: var(--gradient-main);
//         // color: #fff !important;
//         box-shadow: 0 2px 8px rgba(75, 94, 122, 0.08);
//       }
//       .el-icon {
//         font-size: 20px;
//       }
//     }
//   }
// }
.layout_slider {
  background: var(--card-color);
  height: 100vh;
  box-shadow: 2px 0 12px rgba(75, 94, 122, 0.06);
  transition: width 0.3s cubic-bezier(0.4, 2, 0.6, 1);
  overflow: hidden;
  .scrollbar {
    height: calc(100vh - 56px);
    padding-top: 12px;
  }
  .el-menu {
    background: transparent;
    border: none;
    .el-menu-item {
      border-radius: 8px;
      margin: 8px 10px;
      color: var(--main-color);
      font-weight: 500;
      transition:
        background 0.3s,
        color 0.3s,
        box-shadow 0.3s,
        border 0.3s,
        transform 0.2s;
      position: relative;
      z-index: 1;
      overflow: hidden;
      &:hover {
        background: var(--hover-bg);
        color: var(--hover-color);
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.12);
        transform: translateX(4px) scale(1.03);
        &::before {
          opacity: 0.12;
        }
      }
      &.is-active {
        background: var(--active-bg);
        color: var(--active-color);
        box-shadow: var(--active-shadow);
        border-left: 4px solid #007bff;
        transform: scale(1.05);
        &::before {
          opacity: 0.18;
        }
        .el-icon {
          color: var(--active-icon-color);
          filter: drop-shadow(0 2px 8px #007bff33);
          transition: color 0.3s, filter 0.3s;
        }
      }
      .el-icon {
        font-size: 22px;
        margin-right: 8px;
        transition: color 0.3s, filter 0.3s;
      }
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #7bbdf9 0%, #d0e8ff 100%);
        opacity: 0;
        z-index: -1;
        transition: opacity 0.3s;
      }
    }
  }
}
.main-container {
  background: var(--bg-color);
}
.common-layout {
  height: 100vh; // 添加视口高度
  display: flex; // 启用flex布局
  flex-direction: column; // 垂直方向

  .el-container {
    flex: 1; // 填充剩余空间
    overflow: hidden; // 防止外层滚动

    .main-container {
      height: 100%; // 填充父容器
      display: flex; // 启用flex

      .layout_main {
        flex: 1; // 关键修改：填充剩余空间
        min-height: 0; // 允许收缩
        overflow-y: auto; // 启用滚动
        padding: 24px;
        margin: 0; // 移除外边距
        border-radius: 16px;
        box-shadow: 0 4px 24px rgba(75, 94, 122, 0.06);
        box-sizing: border-box; // 包含内边距
      }
      /* 滚动条美化 */
      .layout_main::-webkit-scrollbar {
        width: 8px;
      }
      .layout_main::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
      }
    }
  }
}
</style>
