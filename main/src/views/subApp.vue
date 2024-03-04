<template>
  <div>
    <div>
      <input v-model="path" /><button @click="handleJump">手动跳转</button>
    </div>
    <micro-app :name='name' :url='url' :keep-alive="config.keepAlive" :baseroute='baseroute' @beforeshow="beforeshow"></micro-app>
  </div>
</template>

<script>
import microApp from '@micro-zoe/micro-app'
import config, { routerBase } from './../config'
export default {
  data () {
    return {
      path: '',
      name: '',
      url: '',
      baseroute: '',
      config
    }
  },
  methods: {
    handleJump () {
      microApp.router.push({ name: this.name, path: this.path })
    },
    beforeshow(){
      this.$nextTick(()=>{
        window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }))
        /* microApp.router.push({ name: this.name, path: routerBase + this.$route.path }) */
      })
    },
  },
  created () {
    const name = this.$route.name
    const app = config.apps.find(item => item.name === name)
    if (app) {
      this.url = app.url
      this.name = app.name
      this.baseroute = routerBase + app.activeRule
      console.log(app.name + ' component is created')
    }
    /* 0.X版本下功能正常 */
    //window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }))

    /* 1.0版本需要延迟设置 */
    /* setTimeout(() => {
      window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }))
    }, 300); */

    /* 延时小于200 ,用以下方法在已经缓存的情况下切换子应用，子应用会出现bug，关闭的虚拟路由系统会生效*/
    /* setTimeout(() => {
      window.history.replaceState(history.state, '', '/main'+this.$route.fullPath)
      window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }))
    }, 0); */

    /* 最后发现，如果不replaceState，延时过小就不会出现上述BUG */
    /* setTimeout(() => {
      window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }))
    }, 0); */

    /* 1.0.0-beta.0以上bug修复了，最新方案： */
    /* 
      在全局 keep-alive特有生命周期beforeshow中触发一次路由更新方法
    */

    /* 1.0.0-rc.3 */
    /* 
      通过 watch route + PopStateEvent（或microApp.router也行）+ beforeshow 可以完美满足当前业务需求，关闭虚拟路由系统、开启keep-alive下各子应用页面跳转无差别。
      优先使用PopStateEvent，可以触发主应用路由watch，保证逻辑统一。microApp.router关闭虚拟路由系统下无法触发主应用路由watch。
    */

  },
  watch: {
    $route (val) {
      console.log(val, '主应用监听到路由change')
      window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }))
      /* microApp.router.push({ name: this.name, path: routerBase + val.path }) */
    },
  }
}
</script>

<style>
</style>