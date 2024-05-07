<template>
  <div id="app">
    <router-link v-for="page in pages" :to="'/'+page" :key="page" style="margin-left:20px;">{{page}}</router-link>
    <router-link to='/pageK' style="margin-left:20px;">pageK</router-link>
    <router-link to='/pageL' style="margin-left:20px;">pageL</router-link>
    <router-view/>
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
