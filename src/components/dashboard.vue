<template>
  <div>
	<el-row class="board-row row-bg" justify="center">
      <el-col :span="8">
      	<DailyBoard class="board-board"/>
      </el-col>
      <el-col :span="8">
      	<WeeklyBoard class="board-board"/>
      </el-col>
      <el-col :span="8">
      	<MonthlyBoard class="board-board"/>
      </el-col>
    </el-row>
    <el-row class="table-row row-bg" justify="center">
      <el-col :span="24">
      	<div class="grid-content bg-purple-dark">
      	  <el-tabs :tab-position="tabPosition" style="height: 400px;">
		    <el-tab-pane label="Daily">
              <el-table :data="tableData" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" style="width: 90%" height="400px">
			    <el-table-column fixed prop="Statistictime" label="Statistic time" :span="8">
			    </el-table-column>
			    <el-table-column prop="Totalnumberoftasks" label="Total number of tasks" :span="8">
			    </el-table-column>
			    <el-table-column prop="Totalnumberoferrortasks" label="Total number of error tasks" :span="8">
			    </el-table-column>
			  </el-table>
		    </el-tab-pane>
		    <el-tab-pane label="Weekly">
              <el-table :data="tableData1" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" style="width: 90%" height="400px">
			    <el-table-column fixed prop="Statistictime" label="Statistic time" :span="8">
			    </el-table-column>
			    <el-table-column prop="Totalnumberoftasks" label="Total number of tasks" :span="8">
			    </el-table-column>
			    <el-table-column prop="Totalnumberoferrortasks" label="Total number of error tasks" :span="8">
			    </el-table-column>
			  </el-table>
		    </el-tab-pane>
		    <el-tab-pane label="Monthly">
		      <el-table :data="tableData2" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" style="width: 90%" height="400px">
			    <el-table-column fixed prop="Statistictime" label="Statistic time" :span="8">
			    </el-table-column>
			    <el-table-column prop="Totalnumberoftasks" label="Total number of tasks" :span="8">
			    </el-table-column>
			    <el-table-column prop="Totalnumberoferrortasks" label="Total number of error tasks" :span="8">
			    </el-table-column>
			  </el-table>	
		    </el-tab-pane>
		  </el-tabs>
      	</div>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
	import DailyBoard from "./dailyboard"
	import WeeklyBoard from "./weeklyboard"
	import MonthlyBoard from "./monthlyboard"
	export default {
    data () {
      return {
        tabPosition: 'left',
        tableData: [{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        }],
        tableData1: [{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        }],
        tableData2: [{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        },{
          Statistictime: '2016-05-03',
          Totalnumberoftasks: '123',
          Totalnumberoferrortasks: '12',
        }]
      }
    },
    components: { DailyBoard , WeeklyBoard , MonthlyBoard},
    
  }
</script>
<style type="text/css">
	.table-row {
		height: 50%;
    margin-top: 80px;
	}
  .board-board {
    padding: 0px 8px;
  }
</style>