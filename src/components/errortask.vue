<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item>Dash board</el-breadcrumb-item>
			  <el-breadcrumb-item>Error List</el-breadcrumb-item>
			</el-breadcrumb>
	    </div>
		<el-row>
		    <el-card class="box-card">
			  <el-table :data="tableData" border :height="window_height" :header-cell-style="{'text-align':'center'}" @row-click='showDetail' :row-style="{'text-align':'center'}" style="width: 96%">
	            <el-table-column fixed prop="taskid" label="Task ID" :span="3">
	            </el-table-column>
	            <el-table-column prop="taskname" label="Task Name" :span="4">
	            </el-table-column>
	            <el-table-column prop="owner" label="Owner" :span="4">
	            </el-table-column>
	            <el-table-column prop="description" label="Description" :span="4">
                </el-table-column>
	            <el-table-column prop="last_runtime" label="Last Run Date" :span="3"></el-table-column>
	            <el-table-column prop="update_time" label="Last Update Date" :span="3"></el-table-column>
	            <el-table-column prop="upload_time" label="Create Date" :span="3">
	            </el-table-column>
            </el-table>
		  </el-card>
		</el-row>
	</div>
</template>
<script type="text/javascript">
    import qs from 'qs'
	export default {
      data() {
      	return {
          tableData: [],
          window_height: 0
      	}
      },
      methods:{
      	init() {
	      this.axios.post(this.$store.state.API + 'log/error_list',qs.stringify({date:this.$route.params.data, fre:this.$route.params.fre})).then((response) => {
	        this.tableData = response.data.data;
	      })
      	},
	    showDetail(row, event, column) {
	      this.$router.push({name: 'viewtaskmodule', params: { data: row.taskid }})
	    },
	    getWindowSize() {
	      this.window_height = window.screen.availHeight * 0.83;
	    }
      },
      created: function() {
        this.init()
        this.getWindowSize()
      }
	}
</script>
<style type="text/css">
	.box-card {
		margin-top: 15px;
	}
	.crumbs {
	  margin: 10px 0px;
	}
</style>