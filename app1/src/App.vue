<template>
  <div id="app">
    <router-link v-for="page in pages" :to="'/'+page" :key="page" style="margin-left:20px;">{{page}}</router-link>
    <router-view />
    <div class="my_test_wrapper my_test_wrapper--small">
      <span class="my_test_inner--red">css隔离属性选择器测试，我是红色背景、黑色文本</span>
    </div>
  </div>
</template>

<script>
import pages from './pages'
export default {
  name: 'App',
  components: {

  },
  computed: {
    pages () {
      return pages
    }
  }
}
</script>

<style>
.my_test_wrapper[class*=small] [class*=red]{
  background: red;
  color:#000
}
</style>
