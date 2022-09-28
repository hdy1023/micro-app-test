import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'
Vue.use(Router)

// 公共路由
export const constantRoutes = [
  {
    path: '/pageA',
    name: '主应用-pageA',
  },
  {
    path: '/pageB',
    name: '主应用-pageB',
  },
  {
    path: '/app1/pageC',
    name: 'app1-pageC',
  },
  {
    path: '/app1/pageD',
    name: 'app1-pageD',
  },
  {
    path: '/app2/pageE',
    name: 'app2-pageE',
  },
  {
    path: '/app2/pageF',
    name: 'app2-pageF',
  },
]

export default new Router({
  mode: 'history', 
  base: '/main/',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: '/pageA',
          name: 'pageA',
          component: (resolve) => require(['@/views/page1.vue'], resolve),
        },
        {
          path: '/pageB',
          name: 'pageB',
          component: (resolve) => require(['@/views/page2.vue'], resolve),
        },
        {
          path: '/app1/*',
          component: (resolve) => require(['@/views/subApp.vue'], resolve),
        },
        {
          path: '/app2/*',
          component: (resolve) => require(['@/views/subApp2.vue'], resolve),
        },
      ]
    },

  ]
})
