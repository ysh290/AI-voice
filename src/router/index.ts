import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //   {
    //     path: '/',
    //     name: 'home',
    //     component: HomeView,
    //   },
    //   {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (About.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import('../views/AboutView.vue'),
    //   },
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('@/layout/index.vue'),
      redirect: '/layout/home', // 访问 /layout 时默认跳到 home
      //访问 /layout/home → 渲染 Home.vue 在 <router-view> 里
      children: [
        {
          path: 'home', // 注意：子路由不要以 / 开头
          name: 'home',
          component: () => import('@/views/home/index.vue'),
        },
        {
          path: 'voiceCreate',
          name: 'voiceCreate',
          component: () => import('@/views/voice_create/index.vue'),
        },
        {
          path: 'voiceDatabase',
          name: 'voiceDatabase',
          component: () => import('@/views/voice_database/index.vue'),
        },
        {
          path: 'personalizedLearning',
          name: 'personalizedLearning',
          component: () => import('@/views/personalized_learning/index.vue'),
        },
        {
          path: 'test',
          name: 'test',
          component: () => import('@/views/test/index.vue'),
        },
      ],
    },
    {
      path: '/ai',
      name: 'ai',
      component: () => import('@/layout/index.vue'),
      children: [
        //问答功能
        {
          path: 'qa',
          name: 'qa',
          component: () => import('@/views/ai/ai_question_answer/index.vue'),
        },
        {
          path: 'history',
          name: 'history',
          component: () => import('@/views/ai/ai_history/index.vue'),
        },
      ],
    },
    // {
    //   path: '/acl',
    //   name: 'acl',
    //   component: () => import('@/layout/index.vue'),
    //   children: [
    //     {
    //       path: 'user',
    //       name: 'user',
    //       component: () => import('@/views/acl/user.vue'),
    //     },
    //     {
    //       path: 'role',
    //       name: 'role',
    //       component: () => import('@/views/acl/role.vue'),
    //     },
    //     {
    //       path: 'permission',
    //       name: 'permission',
    //       component: () => import('@/views/acl/permission.vue'),
    //     },
    //   ],
    // },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404/index.vue'),
    },

    //未没有配置路由的均会重定向到404路由
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name: 'any',
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    }
  },
})

export default router
