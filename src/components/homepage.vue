<template>
  <div>
	  <el-container>
        <el-header id="header" height='40px'>
          <HEAD />
        </el-header>
        <el-main class="home_main">
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
    components: { HEAD }
  }
</script>
<style type="text/css">
  .home_main {
    padding: 0 2%;
  }
  #header {
    padding: 0px;
    min-width: 1136px;
  }
</style>