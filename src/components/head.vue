<template>
  <div class="Vheader">
    <div class="Vheader-con">
      <span class="title">
        Data Monitor Platform
      </span>
      <div class="Vheader-nav">
        <el-menu class="el-menu-demo" text-color="#a4a4a4" mode="horizontal" style="background-color: transparent;" :router="true">
          <el-menu-item id="el-menu-item" style="height: 40px;line-height: 40px;" index="/dashboard">Dash board</el-menu-item>
          <el-menu-item id="el-menu-item" style="height: 40px;line-height: 40px;" index="/accounts">Accounts</el-menu-item>
          <el-menu-item id="el-menu-item" style="height: 40px;line-height: 40px;" index="/opportunities">Opportunities</el-menu-item>
          <el-menu-item id="el-menu-item" style="height: 40px;line-height: 40px;" index="/lineitmes">Lineitmes</el-menu-item>
          <el-menu-item id="el-menu-item" style="height: 40px;line-height: 40px;" index="/forecast">Forecast</el-menu-item>
          <el-menu-item id="el-menu-item" style="height: 40px;line-height: 40px;" index="/task">Task</el-menu-item>
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
#el-menu-item:hover {
  background-color: #2b2b2b ! important;
  color: #fff ! important;
}
#el-menu-item.is-active {
  background-color: #2b2b2b ! important;
  color: #fff ! important;
  border-bottom: 2px solid #fff ! important;
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