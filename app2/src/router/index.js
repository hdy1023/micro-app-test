import Vue from 'vue'
import Router from 'vue-router'
import pages from './../pages'
Vue.use(Router)


export default new Router({
  mode: 'history', // 去掉url中的#
  base: window.__MICRO_APP_BASE_ROUTE__ || '/app2',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: pages.map(path => {
    return {
      path: '/' + path,
      name: path,
      component: () => import('@/views/page.vue'),
    }
  }).concat([
    {
      path: '/pageK' ,
      name: 'pageK',
      component: () => import('@/views/pageK.vue'),
    },
    {
      path: '/pageL',
      name: 'pageL',
      component: () => import('@/views/pageL.vue'),
    }
  ])
})
