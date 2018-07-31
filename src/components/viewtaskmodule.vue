<template>
	<div>
      <div class='crumbs'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>Task</el-breadcrumb-item>
          <el-breadcrumb-item>Detail</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    <el-card class="box-card">
      <taskinfo :datas="newTaskForm"/>
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
import taskinfo from './taskinfo'
  export default {
  data () {
    return {
	    data: '',
      value4:true,
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
  components: { taskinfo },
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
    commentSubmit(row) {
      if(this.sessionId == '') {
        // this.$router.push({name: 'login'})
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
          if(response.data.code === 401) {
            // this.$router.push({name: 'login'})
            this.$message({
              showClose: true,
              message: 'You need to log in first',
              type: 'warning'
            });
            return
          }
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
	.dialog-footer {
		width: 20%;
		margin-left: 40%;
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