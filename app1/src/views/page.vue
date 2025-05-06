<template>
  <div>
    <div>子应用1 {{$route.name}}</div>
    <div class="text">Vue scoped样式隔离测试，我是黄色背景、绿色文本</div>
  </div>
</template>

<script>
export default {
  created () {
    console.log('app1 ' + this.$route.name + ' created')
  }
}
</script>

<style scoped>
.text{
  background: yellow;
  color:green;
}
</style>