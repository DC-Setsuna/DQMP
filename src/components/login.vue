<template>
	<div class="login-all">
		<h1 class="login-title">DQMP</h1>
		<div class="login-form">
			<div class="login-head"></div>
			<div>
				<img class="login-logo" :src="imgurl">
			</div>
			<el-form ref="form" :model="form" label-width="80px">
				<input class="login-input" type="text" v-model="form.username" placeholder="Username" />
				<input class="login-input" type="password" v-model="form.password" placeholder="Password"/>
			</el-form>
			<div>
				<input class="login-button" value="Login" @click="submit">
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import qs from 'qs'
	export default {
		data() {
			return {
				form:{
					username:'',
					password:''
				},
				imgurl:'../../static/user.jpg'
			}
		},
		methods: {
            submit() {
            	this.axios.post(this.$store.state.API + 'login',qs.stringify(this.form))
		        .then((response) => {
		          if(response.data.code === 200) {
		          	this.setCookie('sessionid', response.data.data, 1)
			        this.$notify({
			          title: 'Successful',
			          message: 'Login Successful',
			          type: 'success'
			        });
		          	this.$router.push({name: 'dashboard'})
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
		    //设置cookie
            setCookie(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
            }
        },
		watch: {
	      form: {
	        handler:function(){
	          if(this.form.username.length === 5) {
	          	this.axios.post(this.$store.state.API + 'user/getimg'
	          		,qs.stringify({username:this.form.username}))
	          	.then((response) => {
	          		if(response.data.code === 200) {
	          			this.imgurl = response.data.data
	          		}
	          	})
	          } else {
	          	this.imgurl = '../../static/user.jpg'
	          }
	        },
	        deep:true
	      }
    	}
	}
</script>
<style type="text/css">
	.login-title {
		font-family: 'Exo 2', sans-serif;
    	text-align: center;
    	padding-top: 10%;
    	font-weight: 400;
    	color: #2B2B36;
    	font-size: 40px;
	}
	.login-form {
		background: #2b2b36;
    	position: relative;
    	width: 30%;
    	margin: 3% auto 0 auto;
    	text-align: center;
    	border-radius: 15px;
    	-webkit-border-radius: 15px;
	}
	.login-head {
		padding: 5px 0;
	    text-align: center;
	    font-size: 2em;
	    background: #23232e;
	    height: 50px;
	    border-top-left-radius: 10px;
	    border-top-right-radius: 10px;
	}
	.login-logo {
		margin: 2em 0 0;
        max-width: 100%;
		width: 80px;
		height: 80px;
		border: 3px solid #FFF;
		border-radius: 50%;
	}
	.login-all {
		height: 100%;
		width: 100%;
	}
	.login-input {
		width: 70%;
	    padding: 1em 2em 1em 3em;
	    color: #9199aa;
	    font-size: 18px;
	    outline: none;
	    border: none;
	    font-weight: 100;
	    border-bottom: 1px solid#484856;
	    margin-top: 2em;
	    background-color: #2b2c36;
	}
	.login-button {
		font-size: 30px;
	    color: #fff;
	    outline: none;
	    border: none;
	    background: #3ea751;
	    width: 100%;
	    padding: 18px 0;
	    border-bottom-left-radius: 15px;
	    border-bottom-right-radius: 15px;
	    cursor: pointer;
	}
	.login-button:hover {
		background-color: #ff2b6c
	}
</style>