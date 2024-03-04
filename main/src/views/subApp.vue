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
    beforeshow () {
      this.$nextTick(() => {
        /* 1.0.0-rc.3 */
        /* window.dispatchEvent(new PopStateEvent('popstate', { state: history.state })) */
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

    /* 1.0.0-rc.4 发现问题（以下问题均为关闭虚拟路由系统）*/
    /* 
      问题：
      1.microApp.router 在虚拟路由系统下会触发主应用路由watch，关闭虚拟路由系统不触发主应用watch。(此问题在1.0.0-rc.3也存在)
      2.microApp.router 如果当前url无变化，microApp.router不会生效，比如子应用挂载后，先通过主应用路由让url变为对应子应用页面url，再调用microApp.router子应用页面不更新。（此问题在1.0.0-rc.3不存在，可以使用PopStateEvent替代microApp.router，但是官方推荐的子应用调整方式是microApp.router）
      3.因为问题2，强行使用microApp.router，需要更改点击子应用跳转的逻辑，但又因为microApp.router在当前子应用未挂载时无法调用（会报错），所以导致跳转子应用时需要先判断该子应用是否正在运行，如果未运行，则需要调用vue.router.push，反之才能调用microApp.router.push。没有之前watch route + PopStateEvent 便捷清晰。
      4.开启keep-alive时，首次进入microApp.router可以控制子应用跳转。但是子应用失活后重新激活后，microApp.router和PopStateEvent都无法控制子应用跳转了，尝试了很多方法均无效，这个问题是致命的导致无法升级。（此问题在1.0.0-rc.3中未发现，且开启虚拟路由系统仍然存在）

      期望：
      1.开启keep-alive时，子应用再次激活后能够正常控制跳转。
      2.microApp.router 在各种配置场景下效果无差异，关闭虚拟路由系统时触发主应用路由watch。
      3.microApp.router 能够像1.0.0-rc.3一样，支持在浏览器url未变化情况下触发子应用页面更新。
      4.microApp.router 做为PopStateEvent替代，希望能够兼容PopStateEvent的效果。
      5.microApp.router 能够在当前子应用未挂载时也可以调用，如未挂载主动挂载并完成对应子应用页面跳转，避免采取vue.router+microApp.router的冗余方式。
    */
  },
  watch: {
    $route (val) {
      console.log(val, '主应用监听到路由change')
      /* 1.0.0-rc.3 */
      /* window.dispatchEvent(new PopStateEvent('popstate', { state: history.state })) */
      /* microApp.router.push({ name: this.name, path: routerBase + val.path }) */
    },
  }
}
</script>

<style>
</style>