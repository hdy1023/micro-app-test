<template>
  <div id="app">
    <div class="header">
      <p>micro-app:1.X</p>
      <p>
        <router-link v-for="(item,index) in navList" :key="index" :to="item.path" style="margin-right:20px;">{{item.name}}</router-link>
      </p>
      <p>
        <span>主应用控制子应用跳转：<button v-for="(item,index) in appNavList" :key="index" @click="handleJump(item)" style="margin-right:20px;">{{item.name}}</button></span>
      </p>
      <p>
        <span>keepAlive：{{config.keepAlive}}</span>
        <span style="margin-left:20px;">主应用baseroute：{{routerBase}}</span>
        <span style="margin-left:20px;">路由模式：<span style="margin-left:20px;" v-for="app in apps" :key="app.name">{{app.name}}-{{app.routerMode}}</span></span>
      </p>
      <p>
        <span>app:</span>
        <select v-model="form.name">
          <option v-for="app in apps" :key="app.name" :value="app.name">{{app.name}}</option>
        </select>
        <span>path:</span>
        <input v-model="form.path" /><button @click="handleMicroAppJump">microApp.router手动跳转</button>
      </p>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import config, { routerBase } from "./../config";
import microApp from '@micro-zoe/micro-app'
const appNavList = []
config.apps.forEach(app => {
  app.pages.forEach((page) => {
    const path = app.activeRule + page
    let native = true
    if (app.routerMode === 'search') {
      native = false
    }
    appNavList.push({
      path: path,
      name: path,
      appName: app.name,
      activeRule: app.activeRule,
      native,
    })
  })
})

export default {
  name: 'App',
  data () {
    return {
      form: {
        name: '',
        path: ''
      },
      config
    }
  },
  computed: {
    apps () {
      return config.apps
    },
    routerBase () {
      return routerBase
    },
    navList () {
      return [
        {
          path: '/pageA',
          name: '主应用-pageA',
        },
        {
          path: '/pageB',
          name: '主应用-pageB',
        },
      ]
    },
    appNavList () {
      return appNavList
    }
  },
  components: {

  },
  methods: {
    handleMicroAppJump () {
      microApp.router.push({ name: this.form.name, path: this.form.path })
    },
    handleJump (item) {
      console.log('click menu item:', item, this.$route.name)
      /* 1.0.0-rc.3 */
      /* this.$router.push(item.path) */

      /* 1.0.0-rc.4 */
      /* if (this.$route.name === item.appName) {
        if (item.native) {
          microApp.router.push({ name: item.appName, path: routerBase + item.path })
        } else {
          //虚拟路由开启下，子应用window.__MICRO_APP_BASE_ROUTE__为空，因此子应用路由不受baseroute配置影响（即便baseroute有值）
          microApp.router.push({ name: item.appName, path: item.path })
        }
      } else {
        if (item.native) {
          this.$router.push(item.path)
        } else {
          this.$router.push(`${item.activeRule}?${item.appName}=${item.path}`)
        }
      } */

      /* 1.0.0-rc.5 */
      if (item.native) {
        this.$router.push(item.path)
      } else {
        this.$router.push(`${item.activeRule}?${item.appName}=${item.path}`)
      }
    },
  }
}
</script>

<style>
.header {
  background: #ccc;
}
.content {
  margin-top: 20px;
  height: 600px;
  border: 1px solid #ccc;
}
</style>
