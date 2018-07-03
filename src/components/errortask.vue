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
			  	<a href="javascript:void(0);">
			  	  <el-table-column fixed type="index" width="50"></el-table-column>
	              <el-table-column prop="taskname" label="Task Name" :span="4">
	              </el-table-column>
	              <el-table-column prop="owner" label="Owner" :span="4">
	              </el-table-column>
	              <el-table-column label="Description" :span="4">
	              	<template slot-scope="scope">
	        		  <span>
	        			<el-popover placement="left" title="Description:" width="100%" trigger="hover" :content="scope.row.description">
					      <span class="error_description" slot="reference">
							{{scope.row.description}}
						  </span>
						</el-popover>
	        	      </span>
	      			</template>
                  </el-table-column>
	              <el-table-column prop="last_runtime" label="Last Run Date" :span="3">
	              </el-table-column>
	              <el-table-column prop="update_time" label="Last Update Date" :span="3">
	              </el-table-column>
	              <el-table-column prop="upload_time" label="Create Date" :span="3">
	              </el-table-column>
	            </a>
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
          window_height: 0,
          sessionId:''
      	}
      },
      methods:{
      	init() {
	      this.axios.post(this.$store.state.API + 'log/error_list',qs.stringify({date:this.$route.params.data, fre:this.$route.params.fre,sessionid:this.sessionId}))
	      .then((response) => {
	        this.tableData = response.data.data;
	      })
      	},
      	speinit() {
      	  this.axios.post(this.$store.state.API + 'log/spe_error_list',qs.stringify({date:this.$route.params.data, fre:this.$route.params.fre, module:this.$route.params.module,sessionid:this.sessionId}))
      	  .then((response) => {
	        this.tableData = response.data.data;
	      })
      	},
	    showDetail(row, event, column) {
	      this.$router.push({name: 'viewtaskmodule', params: { data: row.taskid }})
	    },
	    getWindowSize() {
	      this.window_height = window.screen.availHeight * 0.83;
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
		if(this.$route.params.specific == '0')
		  this.init()
		else
		  this.speinit()
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
	.error_description {
		width:90%;
		overflow:hidden;
		white-space:nowrap !important;
		text-overflow:ellipsis;
		/*兼容性*/
		-webkit-text-overflow:ellipsis;
	}
</style>