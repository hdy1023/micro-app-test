<template>
  <div id="app">
    <router-link v-for="page in pages" :to="'/'+page" :key="page" style="margin-left:20px;">{{page}}</router-link>
    <router-view />
  </div>
</template>

<script>
import pages from './pages'
export default {
  name: 'App',
  components: {
    
  },
  computed:{
    pages(){
      return pages
    }
  }
}
</script>

<style>
</style>
