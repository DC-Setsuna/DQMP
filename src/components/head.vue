<template>
  <div class="Vheader">
    <span class="title">
      Data Quality Monitor Platform
    </span>
    <div class="Vheader-nav">
      <el-menu class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item style="height: 40px;line-height: 40px;" index="/dashboard">Dash board</el-menu-item>
        <el-menu-item style="height: 40px;line-height: 40px;" index="/accounts">Accounts</el-menu-item>
        <el-menu-item style="height: 40px;line-height: 40px;" index="/opportunities">Opportunities</el-menu-item>
        <el-menu-item style="height: 40px;line-height: 40px;" index="/lineitmes">Lineitmes</el-menu-item>
        <el-menu-item style="height: 40px;line-height: 40px;" index="/forecast">Forecast</el-menu-item>
        <!-- <el-menu-item style="height: 40px;line-height: 40px;" index="/dataflow">DataFlow</el-menu-item>
        <el-menu-item style="height: 40px;line-height: 40px;" index="/mike">Mike</el-menu-item> -->
        <el-submenu index="/task" style="height: 40px; line-height: 40px;">
          <template slot="title">TASK</template>
          <el-menu-item style="height: 40px;line-height: 40px;" index="/task">Task</el-menu-item>
          <el-menu-item style="height: 40px;line-height: 40px;" index="/work">Work</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <span v-if="isLogin" class="el-dropdown-link user_img">
      <el-popover placement="bottom" width="120" trigger="click">
        <div class="text item">
          <button class="euiContextMenuItem" @click="quit">
            退出登录
          </button>
        </div>
        <img slot="reference" class="user-logo" :src='imgurl'>
      </el-popover>
    </span>
    <span id="menu-login" style="height: 40px;line-height: 40px; color:#FFF" v-if="!isLogin" @click="centerDialogVisible = true" class="el-dropdown-link user_img">
      Login
    </span>
    <el-dialog title="LOGIN" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form label-position="center" label-width="30%" :model="userLoginInfo">
        <el-form-item label="UserName :">
          <el-input id="username_input" v-model="userLoginInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="PassWord :">
          <el-input id="password_input" type="password" v-model="userLoginInfo.password" @keyup.enter.native="submit"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit">Login</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    return {
      isLogin: false,
      imgurl : '',
      centerDialogVisible: false,
      userLoginInfo: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    quit() {
      this.axios.post(this.$store.state.API + 'user/logout',qs.stringify(
        {sessionid: this.getCookie("sessionid")}))
      .then((response)=>{
        if(response.data.code === 200)
        {
          this.clearCookie("sessionid")
          this.$store.commit('islogin','')
          this.isLogin = false
        }
      }
      )},
    //获取cookie
    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
          c = c.substring(1);
        if (c.indexOf(name) != -1)
          return c.substring(name.length, c.length);
      }
      return "";
    },
    //设置cookie
    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    //清除cookie
    clearCookie(name) {
      this.setCookie(name, "", -1);
    },
    submit() {
      this.axios.post(this.$store.state.API + 'login',qs.stringify(this.userLoginInfo))
      .then((response) => {
        if(response.data.code === 200) {
          this.setCookie('sessionid', response.data.data, 1)
          this.$store.commit('islogin', response.data.data)
          this.$notify({
            title: 'Successful',
            message: 'Login Successful',
            type: 'success'
          });
          this.getImgUrlByUserId()
          this.centerDialogVisible = false
          location.reload()
        }
        if(response.data.code === 300) {
          this.$notify.error({
            title: 'Failed',
            message: 'Login Failed'
          });
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getImgUrlByUserId() {
      this.axios.post(this.$store.state.API + 'user/getHeadImgByUserid',qs.stringify(
        {sessionid: this.getCookie('sessionid')}))
      .then((response)=> {
        if(response.data.code === 200) {
          this.isLogin = true
          this.imgurl = response.data.data
        }
        if(response.data.code === 401) {
          this.isLogin = false
        }
      })
    }
  },
  created: function() {
    this.getImgUrlByUserId()
  }
}
</script>

<style>
.Vheader {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: #2b2b2b;
  height: 40px;
  width: 100%;
}
.Vheader-nav {
  padding-left: 30px;
  float: left;
  height: 40px;
  width: 66%;
}
#menu-login {
  float: left;
}
.user-logo {
  padding-top: 5px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
}
.user_img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
}
.title {
  float: left;
  padding-left: 30px;
  color: #FFF;
  font-size: 20px;
  line-height: 40px;
}
#username_input {
  width: 80%;
}
#password_input {
  width: 80%;
}
</style>