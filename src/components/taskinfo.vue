<template>
  <div>
      <!-- <label>Enabled :</label>
      <el-switch style="display: block" v-model="value4" active-color="#ff4949"
        inactive-color="#13ce66" active-text="NO" inactive-text="YES">
      </el-switch> -->
      <el-form ref="form" :model="datas" label-width="80px" size="small" v-bind:disabled='true'>
	    <el-form-item label-width='120px' label="Task ID :">
	      {{datas.taskid}}
	    </el-form-item>
        <el-form-item label-width='120px' label="Task Name :" prop="taskname">
          <el-input class="newtask_row_input" v-model="datas.taskname"></el-input>
        </el-form-item>
		<el-form-item label-width='120px' label="Category :">
		  <el-select class="newtask_input" v-model="datas.category" placeholder="Please select a Category">
		    <el-option label="Account" value="Account"></el-option>
		    <el-option label="Opportunities" value="Opportunities"></el-option>
		    <el-option label="LineItems" value="LineItems"></el-option>
		    <el-option label="Forcast" value="Forcast"></el-option>
		    <el-option label="MgrForcast" value="MgrForcast"></el-option>
		    <el-option label="Leads" value="Leads"></el-option>
		    <el-option label="Contacts" value="Contacts"></el-option>
		    <el-option label="Winplan" value="Winplan"></el-option>
		  </el-select>
		</el-form-item>
  		<el-form-item label-width='120px' label="Owner :">
  		  <el-input class="newtask_row_input" v-model="datas.owner"></el-input>
  		  <span>Email : </span><el-input class="newtask_row_input" v-model="datas.email"></el-input>
  		</el-form-item>
		<el-form-item label-width='120px' label="Description :">
		  <el-input class="newtask_text_input" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="Please enter the content" v-model="datas.description"></el-input>
		</el-form-item>
		<el-form-item label-width='120px' label="Tag :">
		  <el-input class="newtask_text_input" v-model="datas.tag"></el-input>
		</el-form-item>
		<el-form-item label-width='120px' label="Freqency :">
		  <el-select class="newtask_input" v-model="datas.freqency" placeholder="Please select Freqency ">
		    <el-option label="Daily" value="daily"></el-option>
		    <el-option label="Weekly" value="weekly"></el-option>
		    <el-option label="Monthly" value="monthly"></el-option>
		  </el-select>
		</el-form-item>
		<el-form-item label-width='120px' label="Task type :">
		  <el-select class="newtask_input" v-model="datas.task_type" placeholder="Please select Task Type">
		    <el-option label="SQL" value="sql"></el-option>
		  </el-select>
		</el-form-item>
		<el-form-item label-width='120px' label="Result Verify :">
		  <el-input-number class="newtask_input" v-model="datas.threshold" controls-position="right" :min="1" :max="1000000000000"></el-input-number>
		</el-form-item>
		<el-form-item label-width='120px' label="Upload :" v-bind:class="{active:isActive}">
		  <el-upload class="upload-demo" ref="upload" :show-file-list="true" drag action="/file/add" :file-list='datas.fileList' :multiple="false" :limit="1">
		    <i class="el-icon-upload"></i>
		    <div class="el-upload__text">Drag the file here, or <em>click upload</em></div>
		    <div class="el-upload__tip" slot="tip">Currently only SQL files are allowed. Upload one file</div>
		  </el-upload> 
		</el-form-item>
		</el-form-item>
		<el-form-item label-width='120px' label="Content :">
		  <el-input class="newtask_text_input" type="textarea" :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入内容" v-model="datas.content"></el-input>
		</el-form-item>
	  </el-form>
      <div class="clearfix">
        <span class="dialog-footer">
          <el-button @click="runTask">Run</el-button>
          <el-button @click="Edit" disabled>Edit</el-button>
          <el-button @click="History">History</el-button>
        </span>
      </div>
  </div>
</template>
<script type="text/javascript">
	export default {
	  props:['datas'],
	  data() {
	    return {
	  	  isActive: true
	    }
	  },
	  methods: {
	  	runTask() {
	      if(this.sessionId == '') {
	        this.$message({
	          showClose: true,
	          message: 'You need to log in first',
	          type: 'warning'
	        });
	        return
	      }
	      else {
	        this.axios.post(this.$store.state.API + 'user/checkSession',qs.stringify({sessionid: this.sessionId}))
	        .then((response) => {
	          if(response.data.code === 401)
	            this.$router.push({name: 'login'})
	          if(response.data.code === 200)
	            this.axios.post(this.$store.state.API + 'task/run/',qs.stringify(this.datas))
	            .then((response)=> {
	              if(response.data.code == 200) {
	                this.$message({
	                  message: 'Run Task Success',
	                  type: 'success',
	                  duration:2000
	                });
	              }
	            })
	        })
	      }
	    },
	    Edit() {
	      if(this.sessionId == '')
	        this.$router.push({name: 'login'})
	      else {
	        this.axios.post(this.$store.state.API + 'user/checkSession',qs.stringify({sessionid: this.sessionId}))
	        .then((response) => {
	          if(response.data.code === 401)
	            this.$router.push({name: 'login'})
	          if(response.data.code === 200)
	          this.$router.push({name: 'updatetask', params: { data: this.datas}})
	        })
	      }
	    },
	    History() {
	      this.$router.push({name: 'history', params: { data: this.datas.taskid }})
	    },
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
	    }
	  }
	}
</script>
<style type="text/css">
	#newtask_text_input {
		width: 60%;
	}
	.newtask_row_input {
		width: 25%;
		margin-right: 40px;
	}
	.newtask_input {
		width: 25%;
	}
	.dialog-footer {
		width: 20%;
		margin-left: 40%;
	}
	.active {
		display: none;
	}
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
    .crumbs {
      margin: 10px 0px;
    }
</style>