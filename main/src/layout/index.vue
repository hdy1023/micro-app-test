<template>
  <div id="app">
    <div class="header">
      <router-link v-for="(item,index) in navList" :key="index" :to="item.path" style="margin-right:20px;">{{item.name}}</router-link>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { constantRoutes } from "@/router";
export default {
  name: 'App',
  data(){
    return{
      path:''
    }
  },
  computed:{
    navList(){
      return constantRoutes
    },
  },
  components: {
    
  },
  methods:{
    handleJump(){
      this.$router.push(this.path)
    },
  }
}
</script>

<style>
  .header{
    height:50px;
    background: #ccc;
  }
  .content{
    margin-top:20px;
    height: 600px;
    border: 1px solid #ccc;
  }
</style>
