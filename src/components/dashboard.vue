<template>
  <div>
	<el-row class="board-row row-bg" justify="center">
      <el-col :span="8">
      	<DailyBoard :datas="chartData" class="board-board"/>
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
            <el-table-column fixed type="index" width="50"></el-table-column>
			      <el-table-column prop="Statistictime" label="Statistic time" :span="8">
			      </el-table-column>
			      <el-table-column prop="Totalnumberoftasks" label="Total number of tasks" :span="8">
			      </el-table-column>
			      <el-table-column prop="Totalnumberoferrortasks" label="Total number of error tasks" :span="8">
			      </el-table-column>
			    </el-table>
		    </el-tab-pane>
		    <el-tab-pane label="Weekly">
          <el-table :data="tableData1" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" style="width: 90%" height="400px">
            <el-table-column fixed type="index" width="50"></el-table-column>
			      <el-table-column prop="Statistictime" label="Statistic time" :span="8">
			      </el-table-column>
			      <el-table-column prop="Totalnumberoftasks" label="Total number of tasks" :span="8">
			      </el-table-column>
			      <el-table-column prop="Totalnumberoferrortasks" label="Total number of error tasks" :span="8">
			      </el-table-column>
			    </el-table>
		    </el-tab-pane>
		    <el-tab-pane label="Monthly">
		      <el-table :data="tableData2" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" style="width: 90%" height="400px">
            <el-table-column fixed type="index" width="50"></el-table-column>
			      <el-table-column prop="Statistictime" label="Statistic time" :span="8">
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
        chartData: [],
        tableData: [],
        tableData1: [],
        tableData2: []
      }
    },
    components: { DailyBoard , WeeklyBoard , MonthlyBoard},
    methods: {
      getTabWeeklyData() {
        this.axios.get('../../../static/dash_tab.json').then((response) => {
          this.tableData1 = response.data;
        })
      },
      getTabMonthlyData() {
        this.axios.post(this.$store.state.API + 'board/weekly_list')
        .then((response) => {
          this.tableData = response.data.data.tabData
          this.$store.commit('dailydata', response.data.data.chartData)
        })
      },
      init() {
        this.axios.post(this.$store.state.API + 'board/daily_list')
        .then((response) => {
          this.tableData = response.data.data.tabData
          this.chartData = response.data.data.chartData
        })
      }
    },
    created: function() {
      this.init()
      this.getTabWeeklyData()
      this.getTabMonthlyData()
    }
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