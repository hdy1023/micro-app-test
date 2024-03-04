import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
console.log('app2.__MICRO_APP_BASE_ROUTE__:', window.__MICRO_APP_BASE_ROUTE__)