<template>
  <div>
    <div class='crumbs'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>Task</el-breadcrumb-item>
        <el-breadcrumb-item>History</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="history-box-card">
      <div slot="header" class="clearfix">
       <div>Task Name：
          <a href="javascript:void(0);" @click="Jump">
            <span>{{taskname}}</span>
          </a>
        </div>
      </div>
      <div class="history_title">Business Area：<span>{{category}}</span></div>
      <div class="history_title">Description：<span>{{description}}</span></div>
      <el-table :data="tableData3" height="350px" border class="viewtask_tab">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="run_time" label="Run time" width="180">
        </el-table-column>
        <!-- <el-table-column prop="count" label="Total" width="180">
        </el-table-column> -->
        <el-table-column prop="result" label="Result">
        </el-table-column>
        <el-table-column prop="status" label="Running status" width="180">
        </el-table-column>
        <el-table-column prop="duration" label="Duration" width="180">
        </el-table-column>
        <el-table-column prop="" label="Comments">
          <template slot-scope="scope">
            <el-input v-model="scope.row.comments" @change='commentSubmit(scope.row)' placeholder="Please enter content">
            </el-input>
        </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <Resultchart :datas="chart_data"/>
    </el-card>
  </div>
</template>
<script type="text/javascript">
  import qs from 'qs'
  import Resultchart from "./resultchart"
	import Totalvsresult from "./totalvsresult"
	export default {
		data() {
		  return {
            tableData3: [],
            task: [],
            chart_data: [],
            commentsForm: {
              id:'',
              comment:''
            },
            taskname:'',
            category:'',
            description:'',
            sessionId: ''
		  }
		},
		components: { Resultchart, Totalvsresult},
		methods:{
  	  init() {
  			this.axios.post(this.$store.state.API + 'log/selctTaskLogById',qs.stringify({taskid:this.$route.params.data,sessionid: this.sessionId})).then((response) => {
                if(response.data.code === 401)
                  this.$router.push({name: 'login'})
                if(response.data.code == 200) {
          	    this.tableData3 = response.data.data.tab_data
                this.chart_data = response.data.data.chart_data
                }
              })
        this.axios.post(this.$store.state.API + 'log/select',qs.stringify({taskid:this.$route.params.data,sessionid: this.sessionId})).then((response) => {
            if(response.data.code === 401)
              this.$router.push({name: 'login'})
            if(response.data.code == 200) {
    	        this.task = response.data.data
              this.taskname = this.task[0].taskname
              this.category = this.task[0].category
              this.description = this.task[0].description
            }
          })
  		},
  		Jump() {
  		  this.$router.push({name: 'viewtaskmodule', params: { data: this.$route.params.data }})
  		},
      commentSubmit(row) {
        if(this.getCookie('sessionid') == '')
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
		created: function() {
      this.sessionId = this.getCookie('sessionid')
		  this.init()
		}
	}
</script>
<style type="text/css">
	.history_title {
	  margin-bottom: 30px;
	}
	a {
	  color: #0366d6;
	  text-decoration: none;
	}
  .history-box-card {
    margin-top: 15px;
  }
  .crumbs {
    margin: 10px 0px;
  }
</style>