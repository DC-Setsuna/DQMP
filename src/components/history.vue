<template>
  <div>
  	<div class="history_title">Task ID：
  	  <a href="javascript:void(0);" @click="Jump">
  		<span>{{task[0].taskid}}</span>
  	  </a>
  	</div>
  	<div class="history_title">Business Area：<span>{{task[0].category}}</span></div>
  	<div class="history_title">Description：<span>{{task[0].description}}</span></div>

    <el-table :data="tableData3" height="350px" border class="viewtask_tab">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="run_time" label="Run time" width="180">
      </el-table-column>
      <el-table-column prop="count" label="Total" width="180">
      </el-table-column>
      <el-table-column prop="result" label="Result">
      </el-table-column>
      <el-table-column prop="status" label="Running status" width="180">
      </el-table-column>
      <el-table-column prop="duration" label="Duration" width="180">
      </el-table-column>
      <el-table-column prop="" label="Comments">
      </el-table-column>
    </el-table>
    <Resultchart />
    <Totalvsresult />
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
            task: []
		  }
		},
		components:{ Resultchart, Totalvsresult},
		methods:{
	      init() {
			this.axios.post(this.$store.state.API + 'TaskLog/selctTaskLogById',qs.stringify({taskid:this.$route.params.data})).then((response) => {
              if(response.data.code == 200) {
        	    this.tableData3 = response.data.data
              }
            })
            this.axios.post(this.$store.state.API + 'TaskLog/select',qs.stringify({taskid:this.$route.params.data})).then((response) => {
              if(response.data.code == 200) {
        	    this.task = response.data.data
              }
            })
		  },
		  Jump() {
		  	this.$router.push({name: 'viewtaskmodule', params: { data: this.$route.params.data }})
		  }
		},
		created: function() {
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
</style>