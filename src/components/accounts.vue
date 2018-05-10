<template>
	<div>
	  <el-row>
	  	<el-button size="medium">RUN ALL</el-button>
	  </el-row>
	  <el-row class="account-row">
	  	<el-row class="account-filters-row">
	  	  <el-form ref="form" :model="filtrateForm" label-width="80px" size="small">
	  	    <el-col :span="6">
	  	      <label>Frequency :</label>
	  	      <el-select v-model="filtrateForm.freqency">
			    <el-option label="Daily" value="daily"></el-option>
			    <el-option label="Weekly" value="weekly"></el-option>
			    <el-option label="Monthly" value="monthly"></el-option>
			  </el-select>
	        </el-col>
            <el-col :span="6">
          	  <label>Enable :</label>
	  	      <el-select v-model="filtrateForm.enabled">
			    <el-option label="YES" value="1"></el-option>
			    <el-option label="NO" value="0"></el-option>
			  </el-select>
            </el-col>
            <el-col :span="6">
          	  <label>Category :</label>
	  	      <el-select v-model="filtrateForm.category">
			    <el-option label="Account" value="Account"></el-option>
			    <el-option label="Opportunities" value="Opportunities"></el-option>
			    <el-option label="LineItems" value="LineItems"></el-option>
			    <el-option label="Forcast" value="Forcast"></el-option>
			    <el-option label="MgrForcast" value="MgrForcast"></el-option>
			    <el-option label="Leads" value="Leads"></el-option>
			    <el-option label="Contacts" value="Contacts"></el-option>
			    <el-option label="Winplan" value="Winplan"></el-option>
		      </el-select>
            </el-col>
          </el-form>
	  	</el-row>
	  	<el-row class="account-row">
	  	  <el-table :data="tableData" border :height="window_height" :header-cell-style="{'text-align':'center'}" @row-click='showDetail' :row-style="{'text-align':'center'}" style="width: 96%">
            <el-table-column fixed prop="taskid" label="Task ID" width="180px">
            </el-table-column>
            <el-table-column prop="owner" label="Owner" width="150px">
            </el-table-column>
            <el-table-column prop="description" label="Description" width="180px">
            </el-table-column>
            <el-table-column prop="last_runtime" label="Last Run Date" width="180px"></el-table-column>
            <el-table-column prop="enabled" label="Enabled" width="100px">
            </el-table-column>
            <el-table-column prop="freqency" label="Freqency" width="120px">
            </el-table-column>
            <el-table-column prop="totalrun" label="Total Ran" width="100px">
            </el-table-column>
            <el-table-column prop="totalfails" label="Total Fail" width="100px">
            </el-table-column>
            <el-table-column prop="update_time" label="Last Update Date" width="180px"></el-table-column>
            <el-table-column prop="upload_time" label="Create Date" width="180px">
            </el-table-column>
          </el-table>
        </el-row>
	  </el-row>
	</div>
</template>
<script type="text/javascript">
import qs from 'qs'
import Task from './task'
export default {
  data () {
    return {
      tableData: [],
      window_height: 0,
      filtrateForm: {
        freqency: '',
        enabled: '',
        category: ''
      }
    }
  },
  methods: {
    getWindowSize() {
      this.window_height = window.screen.availHeight * 0.7;
    },
    showDetail(row, event, column) {
      this.$router.push({name: 'viewtaskmodule', params: { data: row.taskid }})
    },
    getaccount_tab_data() {
      this.axios.post(this.$store.state.API + 'TaskLog/list').then((response) => {
          this.tableData = response.data.data;
        })
    },
    filtrateTask() {
      this.axios.post(this.$store.state.API + 'TaskLog/filtrate',qs.stringify(this.filtrateForm)).then((response) => {
          this.tableData = response.data.data;
        })
    }
  },
  created: function () {
  	this.getWindowSize();
    this.getaccount_tab_data();
  },
  watch: {
    filtrateForm: {
      handler:function(){
        this.filtrateTask()
      },
      deep:true
    }
  }
}
</script>
<style type="text/css">
	.account-row {
		margin-top: 50px;
		padding-left: 2%;
	}
	.account-filters-row {
		padding-left: 2%;
	}
</style>