<template>
  <div>
    <div>
      <input v-model="path" /><button @click="handleJump">手动跳转</button>
    </div>
    <micro-app :name='name' :url='url' :keep-alive="config.keepAlive" :baseroute='baseroute'></micro-app>
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
    }
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

    /* 新版本1.0.0-beta.0以上bug修复了，最新方案： */
    /* 
      在全局 keep-alive特有生命周期beforeshow中触发一次路由更新方法
    */


    /* 新版本1.0.0-rc.4 发现问题（以下问题均为关闭虚拟路由系统）*/

    /* 
      microApp.router 在虚拟路由系统下会触发主应用路由watch，关闭虚拟路由系统不触发主应用watch。
      microApp.router 如果当前url无变化，microApp.router不会生效。比如子应用挂载后，先通过主应用路由让url变为对应子应用页面url，再调用microApp.router子应用页面不更新，主应用watch route后再调用行不通了（方式一不行了）。
      microApp.router 子应用未挂载时无法调用，因此调用该方法前需要先判断该子应用是否正在运行，如果未运行，则需要调用vue.router.push，反之才能调用microApp.router.push。
      总之，升级后microApp.router约束较多，没有之前  watch route + PopStateEvent 便捷。
    */
    /* 
    控制子应用跳转：
    方式一（自动microAppRouter）：先主应用跳转至对应子应用页面路由，然后再调用microApp.router触发子应用跳转。（利于主应用监听路由）
    方式二（手动microAppRouter）：直接通过microApp.router触发子应用跳转，url变为当前子应用对应url。（不会触发主应用路由watch，不利于主应用路由监听，但是虚拟路由下可以触发watch）
      问题1：不指定baseroute，方式一和方式二均有效（最后发现方式一生效是因为url变化了）
      问题2：指定baseroute(多一级前缀'/main')，方式一无效（因为url没有变化，但是通过PopStateEvent触发有效），方式二有效。
      问题3：开启keep-alive时，无论是否指定baseroute，首次进入结果同问题1、问题2。但是子应用失活后重新激活，方式一和方式二均无效，主应用无法控制子应用跳转了，尝试了很多方法均无效。
      问题4：开启虚拟路由系统，问题3仍然存在。


      期望：
      1.开启keep-alive时，子应用再次激活后能够正常控制跳转。
      2.microApp.router 在各种配置场景下效果无差异，关闭虚拟路由系统时触发主应用路由watch。
      3.microApp.router 支持在浏览器url未变化情况下触发子应用页面更新。
      4.microApp.router 做为PopStateEvent替代，应保持向后兼容。

    */
  },
  watch: {
    $route (val) {
      console.log(val, '主应用监听到路由change')
      /* window.dispatchEvent(new PopStateEvent('popstate', { state: history.state })) */
      /* microApp.router.push({ name: this.name, path: routerBase + val.path }) */
    },
  }
}
</script>

<style>
</style>