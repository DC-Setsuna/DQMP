<template>
  <div>
	  <el-container>
        <el-header>
          <HEAD/>
        </el-header>
        <el-main>
          <router-view class="main-view"></router-view>
        </el-main>
      </el-container>
  </div>
</template>
<script type="text/javascript">
  import HEAD from "./head"
  export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: { HEAD },
    method () {
    }
  }
</script>
<style type="text/css">
</style>