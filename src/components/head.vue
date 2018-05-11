<template>
	<div class="head_all">
	  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item class="el-menu-demo-item" index="/dashboard">Dash board</el-menu-item>
        <el-menu-item class="el-menu-demo-item" index="/accounts">Accounts</el-menu-item>
        <el-menu-item class="el-menu-demo-item" index="/opportunities">Opportunities</el-menu-item>
        <el-menu-item class="el-menu-demo-item" index="/lineitmes">Lineitmes</el-menu-item>
        <el-menu-item class="el-menu-demo-item" index="/forecast">Forecast</el-menu-item>
        <el-menu-item class="el-menu-demo-item" index="/task">Task</el-menu-item>
      </el-menu>
	</div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        activeIndex: '1'
      }
    }
  }
</script>
<style type="text/css">
	.head_all {
      width: 100%;
      height: 50px;
      box-shadow: 0px 2px 1px #888888;
	}
	.el-header {
      padding: 0px;
	}
	.el-menu-demo {
      background-color: #555555;
      padding:0 2%;
	}
	.el-menu--horizontal>.el-menu-item{
	  background-color: #555555;
      color: #FFF;
      height: 50px;
      line-height: 50px;
	}
</style>