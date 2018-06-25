<template>
	<div>
		<el-row class="board-row row-bg" justify="center">
			<el-col :span="16">
				<el-card class="box-card box-card-left" shadow="hover">
					<DailyBoard :datas="chartData" class="board-board"/>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="box-card box-card-right" shadow="hover">
				  <span height="15px">Results of today</span><hr>
				  <el-table :data="tableData6" style="width: 100%" height="255px" :header-cell-style="{'text-align':'center'}" border :row-style="{'text-align':'center'}" @row-click='Jump' :stripe="true">
				    <el-table-column prop="result_time" label="Result_Time" :span='6'>
					</el-table-column>
					<el-table-column label="TaskName" :span='6'>
					  <template slot-scope="scope">
					    <span>
					      <el-popover placement="left" title="TaskName:" width="100%" trigger="hover" :content="scope.row.taskname">
					        <span class="forcast_description" slot="reference">
					          {{scope.row.taskname}}
					        </span>
					      </el-popover>
					    </span>
					  </template>
					</el-table-column>
					<el-table-column label="Description" :span='6'>
					  <template slot-scope="scope">
					    <span>
					      <el-popover placement="left" title="Description:" width="100%" trigger="hover" :content="scope.row.description">
					        <span class="forcast_description" slot="reference">
					          {{scope.row.description}}
					        </span>
					      </el-popover>
					    </span>
					  </template>
					</el-table-column>
					<el-table-column prop="status" label="Status" :span='6'>
					</el-table-column>
		          </el-table>
				</el-card>
			</el-col>
		</el-row>
		<el-row class="board-row row-bg" justify="center">
			<el-col :span="16">
			  <el-card class="box-card-left" shadow="hover">
			    <WeeklyBoard :datas="chartData1" class="board-board"/>
			  </el-card>
			</el-col>
			<el-col :span="8">
			  <el-card class="box-card-right" shadow="hover">
				<span height="15px">Results this week</span><hr>
				<el-table :data="tableData7" style="width: 100%" height="255px" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" @row-click='Jump' border :stripe="true">
				  <el-table-column prop="result_time" label="Result_Time" :span='6'>
				  </el-table-column>
				  <el-table-column label="TaskName" :span='6'>
					<template slot-scope="scope">
					  <span>
					    <el-popover placement="left" title="TaskName:" width="100%" trigger="hover" :content="scope.row.taskname">
					      <span class="forcast_description" slot="reference">
					        {{scope.row.taskname}}
					      </span>
					    </el-popover>
					  </span>
					</template>
				  </el-table-column>
				  <el-table-column label="Description" :span='6'>
					<template slot-scope="scope">
					  <span>
					    <el-popover placement="left" title="Description:" width="100%" trigger="hover" :content="scope.row.description">
					      <span class="forcast_description" slot="reference">
					        {{scope.row.description}}
					      </span>
					    </el-popover>
					  </span>
					</template>
				  </el-table-column>
				  <el-table-column prop="status" label="Status" :span='6'>
				  </el-table-column>
				</el-table>
			  </el-card>
			</el-col>
		</el-row>
		<el-row class="board-row row-bg" justify="center">
			<el-col :span="16">
				<el-card class="box-card-left" shadow="hover">
					<MonthlyBoard :datas="chartData2" class="board-board"/>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="box-card-right" shadow="hover">
					<span height="15px">Results of month</span><hr>
					<el-table :data="tableData8" style="width: 100%" height="255px" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" border :stripe="true" @row-click='Jump'>
			            <el-table-column prop="result_time" label="Result_Time" :span='8'>
			            </el-table-column>
			            <el-table-column label="TaskName" :span='6'>
			              <template slot-scope="scope">
                		    <span>
                			  <el-popover placement="left" title="TaskName:" width="100%" trigger="hover" :content="scope.row.taskname">
  							    <span class="forcast_description" slot="reference">
  								  {{scope.row.taskname}}
  								</span>
							  </el-popover>
                			</span>
              			  </template>
			            </el-table-column>
			            <el-table-column label="Description" :span='6'>
			              <template slot-scope="scope">
                		    <span>
                			  <el-popover placement="left" title="Description:" width="100%" trigger="hover" :content="scope.row.description">
  							    <span class="forcast_description" slot="reference">
  								  {{scope.row.description}}
  								</span>
							  </el-popover>
                			</span>
              			  </template>
			            </el-table-column>
			            <el-table-column prop="status" label="Status" :span='8'>
			            </el-table-column>
			          </el-table>
				</el-card>
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
								<el-table-column label="Total number of error tasks" :span="8">
				                  <template slot-scope="scope">
				                    <span>
				                      <a class="error_link" href="javascript:void(0);" @click="DailyJump(scope.row.Statistictime)">{{scope.row.Totalnumberoferrortasks}}</a>
				                    </span>
				                  </template>
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
								<el-table-column label="Total number of error tasks" :span="8">
				                  <template slot-scope="scope">
				                    <span>
				                      <a class="error_link" href="javascript:void(0);" @click="WeeklyJump(scope.row.Statistictime)">{{scope.row.Totalnumberoferrortasks}}</a>
				                    </span>
				                  </template>
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
								<el-table-column label="Total number of error tasks" :span="8">
				                  <template slot-scope="scope">
				                    <span>
				                      <a class="error_link" href="javascript:void(0);" @click="MonthlyJump(scope.row.Statistictime)">{{scope.row.Totalnumberoferrortasks}}</a>
				                    </span>
				                  </template>
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
			tableData2: [],
			tableData6:[],
	        tableData7:[],
	        tableData8:[],
	        sessionId: ''
		}
	},
	components: { DailyBoard , WeeklyBoard , MonthlyBoard},
	methods: {
		getTabWeeklyData() {
			this.axios.get(this.$store.state.API + 'board/category_weekly_list',{
			  params: {
	              category: 'Forecast',
	              sessionid: this.sessionId
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
                  category: 'Forecast',
                  sessionid: this.sessionId
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
                  category: 'Forecast',
                  sessionid: this.sessionId
			    }
			  })
			.then((response) => {
				this.tableData = response.data.data.tabData
				this.chartData = response.data.data.chartData
			})
		},
		showDetail(row, event, column) {
			this.$router.push({name: 'viewtaskmodule', params: { data: row.taskid }})
		},
		get_fail_daily() {
			this.axios.get(this.$store.state.API + 'board/category_daily_fail_list',{
			  params: {
                  category: 'Forecast',
                  sessionid: this.sessionId
			    }
			  })
			.then((response) => {
			  if(response.data.code == 200)
			    this.tableData6 = response.data.data
			})
		},
		get_fail_weekly() {
			this.axios.get(this.$store.state.API + 'board/category_weekly_fail_list',{
			  params: {
                  category: 'Forecast',
                  sessionid: this.sessionId
			    }
			  })
			.then((response) => {
			  if(response.data.code == 200)
			    this.tableData7 = response.data.data
			})
		},
		get_fail_monthly() {
			this.axios.get(this.$store.state.API + 'board/category_monthly_fail_list',{
			  params: {
                  category: 'Forecast',
                  sessionid: this.sessionId
			    }
			  })
			.then((response) => {
			  if(response.data.code == 200)
			    this.tableData8 = response.data.data
			})
		},
		Jump(row, event, column) {
          this.$router.push({name: 'viewtaskmodule', params: { data: row.taskid }})
        },
		DailyJump(date) {
          this.$router.push({name: 'errortask', params: { data: date,fre:'daily',specific:'1',module:'Forecast'}})
		},
		WeeklyJump(date) {
		  this.$router.push({name: 'errortask', params: { data: date,fre:'weekly',specific:'1',module:'Forecast'}})
		},
		MonthlyJump(date) {
		  this.$router.push({name: 'errortask', params: { data: date,fre:'monthly',specific:'1',module:'Forecast'}})
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
		this.getTabWeeklyData()
		this.getTabMonthlyData()
		this.get_fail_daily()
        this.get_fail_weekly()
        this.get_fail_monthly()
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
    height:310px;
    margin-bottom: 10px;
}
.middle-card {
	margin: 1%;
	height:350px;
}
.error_link {
    text-decoration:none;
}
.el-card__body {
    padding: 20px;
}
.instrument_table {
    margin-top: 20px
}
.forcast_description {
	width:90%;
	overflow:hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
	/*兼容性*/
	-webkit-text-overflow:ellipsis;
}
</style>