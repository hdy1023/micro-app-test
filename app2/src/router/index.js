import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


export default new Router({
  mode: 'history', // 去掉url中的#
  base: window.__MICRO_APP_BASE_ROUTE__ || '/app2',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/pageE',
      name: 'pageE',
      component: (resolve) => require(['@/views/page1.vue'], resolve),
    },
    {
      path: '/pageF',
      name: 'pageF',
      component: (resolve) => require(['@/views/page2.vue'], resolve),
    },
  ]
})
