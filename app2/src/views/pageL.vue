<template>
  <div>子应用2 pageL
    <div>
      <el-select v-model="val">
        <el-option :value="1" label="1"></el-option>
        <el-option :value="2" label="2"></el-option>
        <el-option :value="3" label="3"></el-option>
        <el-option :value="4" label="4"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    console.log('app2 pageL created')
  },
  data () {
    return {
      val: 1
    }
  }
}
</script>

<style>
</style>