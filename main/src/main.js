import Vue from 'vue'
import App from './App.vue'
import router from './router'
import microApp from '@micro-zoe/micro-app'

microApp.start({
  'disable-memory-router': true, // 关闭虚拟路由系统
  'disable-patch-request': true, // 关闭对子应用请求的拦截
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
