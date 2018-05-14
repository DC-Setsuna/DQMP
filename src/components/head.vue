<template>
  <div class="Vheader">
    <div class="Vheader-con">
      <div class="Vheader-nav">
        <el-menu class="el-menu-demo" text-color="#a4a4a4" mode="horizontal" style="background-color: transparent;" :router="true">
          <el-menu-item index="/dashboard">Dash board</el-menu-item>
          <el-menu-item index="/accounts">Accounts</el-menu-item>
          <el-menu-item index="/opportunities">Opportunities</el-menu-item>
          <el-menu-item index="/lineitmes">Lineitmes</el-menu-item>
          <el-menu-item index="/forecast">Forecast</el-menu-item>
          <el-menu-item index="/task">Task</el-menu-item>
        </el-menu>
      </div>
      <span class="el-dropdown-link user_img">
        <img class="user-logo" src="../../static/user_img.jpeg">
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style>
.Vheader {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /*background: linear-gradient(left,#365ab2,#0029f2);*/
  background-color: #2b2b2b;
  height: 40px;
  max-width: 100%;
  min-width: 1000px;
}
.Vheader-nav {
  float: right;
  height: 40px;
}
.Vheader-con {
  margin-right: 150px;
  padding: 0 30px;
}
.el-menu--horizontal>.el-menu-item {
    float: left;
    height: 40px;
    line-height: 40px;
}
.el-dropdown-menu__item--divided:before, .el-menu, .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
  background-color: transparent;
  color: #fff;
  /*text-decoration: underline;*/
}
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 2px solid #fff;
  /*border-bottom: none;*/
  color: #fff;
  background-color: transparent;
}
.el-header {
  padding: 0px;
}
.user-logo {
  position: absolute;
  top: 3px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
}
.user_img {
  position: absolute;
  right: 60px;
}
</style>
<!-- <template>
	<div class="head_all">
	  <el-menu :default-active="activeIndex" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" class="el-menu-demo" mode="horizontal" :router="true">
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
      padding:0 2%;
	}
	.el-menu--horizontal>.el-menu-item{
      height: 50px;
      line-height: 50px;
	}
</style> -->