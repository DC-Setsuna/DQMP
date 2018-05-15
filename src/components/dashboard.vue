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
          <el-table :data="tableData6" style="width: 100%" height="255px" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" >
            <el-table-column prop="result_time" label="Result_Time" :span='8'>
            </el-table-column>
            <el-table-column prop="taskname" label="TaskName" :span='8'>
            </el-table-column>
            <el-table-column prop="status" label="Status" :span='8'>
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
          <el-table :data="tableData7" style="width: 100%" height="255px" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" >
            <el-table-column prop="result_time" label="Result_Time" :span='8'>
            </el-table-column>
            <el-table-column prop="taskname" label="TaskName" :span='8'>
            </el-table-column>
            <el-table-column prop="status" label="Status" :span='8'>
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
          <el-table :data="tableData8" style="width: 100%" height="255px" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" >
            <el-table-column prop="result_time" label="Result_Time" :span='8'>
            </el-table-column>
            <el-table-column prop="taskname" label="TaskName" :span='8'>
            </el-table-column>
            <el-table-column prop="status" label="Status" :span='8'>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-card class="middle-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>Job in queue</span>
          </div>
          <el-table :data="tableData3" height="270" border :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center','height':'5px'}" :cell-style="{'height':'10px'}" style="width: 100%" @row-click='showDetail'>
            <el-table-column type="index" :span="2"></el-table-column>
            <el-table-column prop="id" label="Task Id" :span="11"></el-table-column>
            <el-table-column prop="name" label="Task Name"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="middle-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>The job being performed</span>
          </div>
          <el-table :data="tableData4" height="270" border :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center','height':'5px'}" :cell-style="{'height':'10px'}" style="width: 100%" @row-click='showDetail'>
            <el-table-column type="index" :span="2"></el-table-column>
            <el-table-column prop="taskid" label="taskid" :span="11"></el-table-column>
            <el-table-column prop="freqency" label="freqency"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="middle-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>Job execution results</span>
          </div>
          <el-table :data="tableData5" height="270" border :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center','height':'5px'}" :cell-style="{'height':'10px'}" style="width: 100%" @row-click='showDetail'>
            <el-table-column type="index" :span="2"></el-table-column>
            <el-table-column prop="taskid" label="taskid" :span="11"></el-table-column>
            <el-table-column prop="freqency" label="freqency"></el-table-column>
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
        tableData2: [],
        tableData3: [],
        tableData4: [{
          taskid: '234',
          freqency: 'daily'
        },{
          taskid: '938302F6E93D',
          freqency: 'daily'
        },{
          taskid: '938302F6E93E',
          freqency: 'weekly'
        },{
          taskid: '938302F6E93F',
          freqency: 'monthly'
        },{
          taskid: '938302F6E93F',
          freqency: 'monthly'
        },{
          taskid: '938302F6E93F',
          freqency: 'monthly'
        },{
          taskid: '938302F6E93F',
          freqency: 'monthly'
        }],
        tableData5: [{
          taskid: '234',
          freqency: 'daily'
        },{
          taskid: '938302F6E93D',
          freqency: 'daily'
        },{
          taskid: '938302F6E93E',
          freqency: 'weekly'
        },{
          taskid: '938302F6E93F',
          freqency: 'monthly'
        },{
          taskid: '938302F6E93F',
          freqency: 'monthly'
        },{
          taskid: '938302F6E93F',
          freqency: 'monthly'
        },{
          taskid: '938302F6E93F',
          freqency: 'monthly'
        }],
        tableData6:[],
        tableData7:[],
        tableData8:[]
      }
    },
    components: { DailyBoard , WeeklyBoard , MonthlyBoard},
    methods: {
      getTabWeeklyData() {
        this.axios.get(this.$store.state.API + 'board/weekly_list')
        .then((response) => {
          this.tableData1 = response.data.data.tabData
          this.chartData1 = response.data.data.chartData
        })
      },
      getTabMonthlyData() {
        this.axios.get(this.$store.state.API + 'board/monthly_list')
        .then((response) => {
          this.tableData2 = response.data.data.tabData
          this.chartData2 = response.data.data.chartData
        })
      },
      init() {
        this.axios.get(this.$store.state.API + 'board/daily_list')
        .then((response) => {
          this.tableData = response.data.data.tabData
          this.chartData = response.data.data.chartData
        }).catch((error) => {
          console.log(error)
        })
      },
      showDetail(row, event, column) {
        this.$router.push({name: 'viewtaskmodule', params: { data: row.id }})
      },
      get_job_tab() {
        this.axios.get(this.$store.state.API + 'scheduler/jobs')
        .then((response) => {
          this.tableData3 = response.data
        })
      },
      get_fail_daily() {
        this.axios.get(this.$store.state.API + 'board/daily_fail_list')
        .then((response) => {
          if(response.data.code == 200)
            this.tableData6 = response.data.data
        })
      },
      get_fail_weekly() {
        this.axios.get(this.$store.state.API + 'board/weekly_fail_list')
        .then((response) => {
          if(response.data.code == 200)
            this.tableData7 = response.data.data
        })
      },
      get_fail_monthly() {
        this.axios.get(this.$store.state.API + 'board/monthly_fail_list')
        .then((response) => {
          if(response.data.code == 200)
            this.tableData8 = response.data.data
        })
      }
    },
    created: function() {
      this.init()
      this.getTabWeeklyData()
      this.getTabMonthlyData()
      this.get_job_tab()
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