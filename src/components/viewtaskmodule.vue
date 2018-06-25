<template>
	<div>
      <div class='crumbs'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>Task</el-breadcrumb-item>
          <el-breadcrumb-item>Detail</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    <el-card class="box-card">
      <label>Enabled :</label>
      <el-switch style="display: block" v-model="value4" active-color="#ff4949"
        inactive-color="#13ce66" active-text="NO" inactive-text="YES">
      </el-switch>
      <el-form ref="form" :model="newTaskForm" label-width="80px" size="small" v-bind:disabled='true'>
		    <el-form-item label-width='120px' label="Task ID :">
		      {{newTaskForm.taskid}}
		    </el-form-item>
        <el-form-item label-width='120px' label="Task Name :" prop="taskname">
          <el-input class="newtask_row_input" v-model="newTaskForm.taskname"></el-input>
        </el-form-item>
  		  <el-form-item label-width='120px' label="Category :">
  		    <el-select class="newtask_input" v-model="newTaskForm.category" placeholder="Please select a Category">
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
  		    <el-input class="newtask_row_input" v-model="newTaskForm.owner"></el-input>
  		    <span>Email : </span><el-input class="newtask_row_input" v-model="newTaskForm.email"></el-input>
  		  </el-form-item>
  		  <el-form-item label-width='120px' label="Description :">
  		    <el-input class="newtask_text_input" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="newTaskForm.description"></el-input>
  		  </el-form-item>
  		  <el-form-item label-width='120px' label="Tag :">
  		    <el-input class="newtask_text_input" v-model="newTaskForm.tag"></el-input>
  		  </el-form-item>
  		  <el-form-item label-width='120px' label="Freqency :">
  		    <el-select class="newtask_input" v-model="newTaskForm.freqency" placeholder="Please select Freqency ">
  		      <el-option label="Daily" value="daily"></el-option>
  		      <el-option label="Weekly" value="weekly"></el-option>
  		      <el-option label="Monthly" value="monthly"></el-option>
  		    </el-select>
  		  </el-form-item>
  		  <el-form-item label-width='120px' label="Task type :">
  		    <el-select class="newtask_input" v-model="newTaskForm.task_type" placeholder="Please select Task Type">
  		      <el-option label="SQL" value="sql"></el-option>
  		    </el-select>
  		  </el-form-item>
  		  <el-form-item label-width='120px' label="Result Verify :">
  		  	<el-input-number class="newtask_input" v-model="newTaskForm.threshold" controls-position="right" :min="1" :max="1000000000000"></el-input-number>
  		  </el-form-item>
  		  <el-form-item label-width='120px' label="Upload :" v-bind:class="{active:isActive}">
  			<el-upload class="upload-demo" ref="upload" :show-file-list="true" drag action="/file/add" :file-list='newTaskForm.fileList' :multiple="false" :limit="1">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">Drag the file here, or <em>click upload</em></div>
              <div class="el-upload__tip" slot="tip">Currently only SQL files are allowed. Upload one file</div>
            </el-upload> 
  			  </el-form-item>
  		  </el-form-item>
  		  <el-form-item label-width='120px' label="Content :">
  		    <el-input class="newtask_text_input" type="textarea" :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入内容" v-model="newTaskForm.content"></el-input>
  		  </el-form-item>
	    </el-form>
      <div class="clearfix">
        <span class="dialog-footer">
          <el-button @click="runTask">Run</el-button>
          <el-button @click="Edit">Edit</el-button>
          <el-button @click="History">History</el-button>
        </span>
      </div>
    </el-card>
    <el-table :data="tableData3" height="350px" border class="viewtask_tab">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="run_time" label="Run time" width="180">
      </el-table-column>
      <el-table-column prop="result" label="Result">
      </el-table-column>
      <el-table-column prop="status" label="Running status" width="180">
      </el-table-column>
      <el-table-column prop="duration" label="Duration" width="180">
      </el-table-column>
      <el-table-column label="Comments">
        <template slot-scope="scope">
          <el-input v-model="scope.row.comments" @change='commentSubmit(scope.row)' placeholder="Please enter content">
          </el-input>
        </template>
      </el-table-column>
    </el-table>
	</div>
</template>
<script type="text/javascript">
import qs from 'qs'
  export default {
  data () {
    return {
	    data: '',
      value4:true,
	    isActive: true,
	    newTaskForm: {
        taskid: '',
        category: '',
        owner: '',
        email: '',
        description: '',
        tag: '',
        enabled: '',
        freqency: '',
        task_type: '',
        threshold: 0,
        content: '',
        run_now: '',
        filepath: '',
        upload_user_id: '',
        fileList: []
      },
      tableData3: [],
      commentsForm: {
        id:'',
        comment: ''
      },
      sessionId: ''
	  }
  },
  methods: {
  	Remove(file, fileList) {
      console.log(file,fileList)
    },
    init() {
      this.axios.post(this.$store.state.API + 'log/select',qs.stringify({taskid:this.$route.params.data,sessionid: this.sessionId})).then((response) => {
        if(response.data.code === 401)
          this.$router.push({name: 'login'})
      	if(response.data.code == 200) {
          this.newTaskForm = response.data.data[0];
          if(this.newTaskForm.run_now === "True") this.newTaskForm.run_now = true
          if(this.newTaskForm.run_now === "False") this.newTaskForm.run_now = false
          this.filepath = this.newTaskForm.filepath.substring(16,25)
          this.newTaskForm.fileList = [{name: this.newTaskForm.filepath.substring(16,25), url: this.newTaskForm.filepath}]
        }
      })
      this.axios.post(this.$store.state.API + 'log/selctTaskLogById',qs.stringify({taskid:this.$route.params.data,sessionid: this.sessionId})).then((response) => {
        if(response.data.code === 401)
          this.$router.push({name: 'login'})
        if(response.data.code == 200) {
        	this.tableData3 = response.data.data.tab_data
        }
      })
    },
    runTask() {
      if(this.sessionId == '')
        this.$router.push({name: 'login'})
      else {
        this.axios.post(this.$store.state.API + 'user/checkSession',qs.stringify({sessionid: this.sessionId}))
        .then((response) => {
          if(response.data.code === 401)
            this.$router.push({name: 'login'})
          if(response.data.code === 200)
            this.axios.post(this.$store.state.API + 'task/run/',qs.stringify(this.newTaskForm))
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
          this.$router.push({name: 'updatetask', params: { data: this.newTaskForm}})
        })
      }
    },
    History() {
      this.$router.push({name: 'history', params: { data: this.newTaskForm.taskid }})
    },
    commentSubmit(row) {
      if(this.sessionId == '')
        this.$router.push({name: 'login'})
      else {
        this.axios.post(this.$store.state.API + 'user/checkSession',qs.stringify({sessionid: this.sessionId}))
        .then((response) => {
          if(response.data.code === 401)
            this.$router.push({name: 'login'})
          if(response.data.code === 200)
            this.axios.post(this.$store.state.API + 'log/updateComment',
              qs.stringify({id: row.id , comments: row.comments})
            )
          .then((response) => {
            if(response.data.code == 200){
              this.$message({
                message: 'Comments add success',
                type: 'success',
                duration:2000
              });
            }
          })
        })
      }
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
  },
  created: function(){
    this.sessionId = this.getCookie('sessionid')
  	this.init()
  },
  watch: {
    value4: function() {
      console.log("+++"+this.value4)
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
	.task_button {
		margin-left: 20%;
	}
	.dialog-footer {
		width: 20%;
		margin-left: 40%;
	}
	.active {
		display: none;
	}
	.viewtask_tab {
	  margin-top:30px; 
	  width: 100%;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	}
  .box-card {
    margin-top: 15px;
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