import Vue from 'vue'
import Router from 'vue-router'
import pages from './../pages'
Vue.use(Router)


export default new Router({
  mode: 'history', // 去掉url中的#
  base: window.__MICRO_APP_BASE_ROUTE__ || '/app1',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: pages.map(path => {
    return {
      path: '/'+path,
      name: path,
      component: (resolve) => require(['@/views/page.vue'], resolve),
    }
  })
})
