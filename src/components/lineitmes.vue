<template>
	<div>
		<el-row class="board-row row-bg" justify="center">
			<el-col :span="16">
				<el-card class="box-card box-card-left" shadow="hover">
					<DailyBoard :datas="chartData" class="board-board"/>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="box-card box-card-right" shadow="hover"></el-card>
			</el-col>
		</el-row>
		<el-row class="board-row row-bg" justify="center">
			<el-col :span="16">
				<el-card class="box-card-left" shadow="hover">
					<WeeklyBoard :datas="chartData1" class="board-board"/>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="box-card-right" shadow="hover"></el-card>
			</el-col>
		</el-row>
		<el-row class="board-row row-bg" justify="center">
			<el-col :span="16">
				<el-card class="box-card-left" shadow="hover">
					<MonthlyBoard :datas="chartData2" class="board-board"/>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="box-card-right" shadow="hover"></el-card>
			</el-col>
		</el-row>

		<el-row class="table-row row-bg" justify="center">
			<el-col :span="24">
				<div class="el-card is-hover-shadow grid-content bg-purple-dark">
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
			chartData1: [],
			chartData2: [],
			tableData: [],
			tableData1: [],
			tableData2: []
		}
	},
	components: { DailyBoard , WeeklyBoard , MonthlyBoard},
	methods: {
		getTabWeeklyData() {
			this.axios.get(this.$store.state.API + 'board/category_weekly_list',{
			  params: {
                  category: 'Lineitmes'
			    }
			  })
			.then((response) => {
				this.tableData1 = response.data.data.tabData
				this.chartData1 = response.data.data.chartData
			})
		},
		getTabMonthlyData() {
			this.axios.get(this.$store.state.API + 'board/category_monthly_list',{
			  params: {
                  category: 'Lineitmes'
			    }
			  })
			.then((response) => {
				this.tableData2 = response.data.data.tabData
				this.chartData2 = response.data.data.chartData
			})
		},
		init() {
			this.axios.get(this.$store.state.API + 'board/category_daily_list',{
			  params: {
                  category: 'Lineitmes'
			    }
			  })
			.then((response) => {
				this.tableData = response.data.data.tabData
				this.chartData = response.data.data.chartData
			})
		},
		showDetail(row, event, column) {
			this.$router.push({name: 'viewtaskmodule', params: { data: row.taskid }})
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
	margin-top: 20px;
}
.board-board {
	padding: 0px 8px;
}
.box-card {
	margin-top: 15px;
}
.box-card-left {
	width: 98%;
	margin-bottom: 10px;
}
.box-card-right {
	width: 100%;
	height:280px;
	margin-bottom: 10px;
}
.el-card__body {
	padding: 10px;
}
.instrument_table {
	margin-top: 10px
}
.middle-card {
	margin: 1%;
	height:350px;
}
</style>