import Vue from 'vue'
import App from './App.vue'
import router from './router'
import microApp from '@micro-zoe/micro-app'

microApp.start({
  'disable-memory-router': true, // 关闭虚拟路由系统
  'disable-patch-request': true, // 关闭对子应用请求的拦截
  lifeCycles:{
    beforemount () {
      console.log('子应用 beforemount')
      console.log('dispatchEvent 通知子系统更新路由')
      window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }))
    },
    beforeshow () {
      console.log('子应用 beforeshow')
      console.log('dispatchEvent 通知子系统更新路由')
      window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }))
    },
  }
})
Vue.config.productionTip = false
// 我在github上 按下.键直接打开了网页版vscode 并完成了这行代码的提交
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
