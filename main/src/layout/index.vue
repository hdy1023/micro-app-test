<template>
  <div id="app">
    <div class="header">
      <p>
        <router-link v-for="(item,index) in navList" :key="index" :to="item.path" style="margin-right:20px;">{{item.name}}</router-link>
      </p>
      <p>
        <span>子应用跳转：<button v-for="(item,index) in appNavList" :key="index" @click="handleJump(item)" style="margin-right:20px;">{{item.name}}</button></span>
      </p>
    </div>
    <div>
      <span>虚拟路由：{{!config.native}}</span>
      <span style="margin-left:20px;">keepAlive：{{config.keepAlive}}</span>
      <span style="margin-left:20px;">主应用baseroute：{{routerBase}}</span>
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
    appNavList.push({
      path: path,
      name: path,
      appName: app.name
    })
  })
})

export default {
  name: 'App',
  data () {
    return {
      path: '',
      config
    }
  },
  computed: {
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
    handleJump (item) {
      console.log('click menu item:',item)
      this.$router.push(item.path)
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
