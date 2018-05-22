<template>
  <div class="Vheader">
    <div class="Vheader-con">
      <span class="title">
        Data Monitor Platform
      </span>
      <div class="Vheader-nav">
        <el-menu class="el-menu-demo" text-color="#a4a4a4" mode="horizontal" style="background-color: transparent;" :router="true">
          <el-menu-item style="height: 40px;line-height: 40px;" index="/dashboard">Dash board</el-menu-item>
          <el-menu-item style="height: 40px;line-height: 40px;" index="/accounts">Accounts</el-menu-item>
          <el-menu-item style="height: 40px;line-height: 40px;" index="/opportunities">Opportunities</el-menu-item>
          <el-menu-item style="height: 40px;line-height: 40px;" index="/lineitmes">Lineitmes</el-menu-item>
          <el-menu-item style="height: 40px;line-height: 40px;" index="/forecast">Forecast</el-menu-item>
          <el-menu-item style="height: 40px;line-height: 40px;" index="/task">Task</el-menu-item>
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
.title {
  color: #FFF;
  font-size: 20px;
  line-height: 40px;
}
</style>