import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'
import microApp from '@micro-zoe/micro-app'
import config, { routerBase } from './../config'
import SubApp from '../views/subApp.vue'

window.microApp = microApp
microApp.start({
  /* 'disable-memory-router': true, // 关闭虚拟路由系统*/
  'disable-patch-request': true, // 关闭对子应用请求的拦截 
})
Vue.use(Router)

const appRoutes = config.apps.map(item => {
  return {
    path: item.routerMode === 'search' ? item.activeRule : `${item.activeRule}/*`,
    name: item.name,
    component: { mixins: [SubApp] },
  }
})
export default new Router({
  mode: 'history',
  base: routerBase,
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
        ...appRoutes
      ]
    },
  ]
})
