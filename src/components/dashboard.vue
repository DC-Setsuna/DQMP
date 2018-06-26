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
            <el-table :data="tableData6" style="width: 100%" height="245px" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" @row-click='Jump' border :stripe="true">
              <el-table-column prop="Module" label="Category" :span='8'>
              </el-table-column>
              <el-table-column prop="totalCount" label="TotalCount" :span='8'>
              </el-table-column>
              <el-table-column prop="failCount" label="FailCount">
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
          <el-table :data="tableData7" style="width: 100%" height="245px" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" @row-click='Jump' border :stripe="true">
            <el-table-column prop="Module" label="Category" :span='8'>
            </el-table-column>
            <el-table-column prop="totalCount" label="TotalCount" :span='8'>
            </el-table-column>
            <el-table-column prop="failCount" label="FailCount">
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
          <span height="15px">Results this month</span><hr>
          <el-table :data="tableData8" style="width: 100%" height="245px" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" @row-click='Jump' border :stripe="true">
            <el-table-column prop="Module" label="Category" :span='8'>
            </el-table-column>
            <el-table-column prop="totalCount" label="TotalCount" :span='8'>
            </el-table-column>
            <el-table-column prop="failCount" label="FailCount">
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
              <el-table :data="tableData" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" style="width: 95%" height="400px">
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
              <el-table :data="tableData1" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" style="width: 95%" height="400px">
                <el-table-column fixed type="index" width="50"></el-table-column>
                <el-table-column prop="Statistictime" label="Statistic time" :span="8">
                </el-table-column>
                <el-table-column prop="Totalnumberoftasks" label="Total number of tasks" :span="8">
                </el-table-column>
                <el-table-column label="Total number of error tasks" :span="8">
                  <template slot-scope="scope">
                    <span>
                      <a href="javascript:void(0);" @click="WeeklyJump(scope.row.Statistictime)">{{scope.row.Totalnumberoferrortasks}}</a>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="Monthly">
              <el-table :data="tableData2" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" style="width: 95%" height="400px">
                <el-table-column fixed type="index" width="50"></el-table-column>
                <el-table-column prop="Statistictime" label="Statistic time" :span="8">
                </el-table-column>
                <el-table-column prop="Totalnumberoftasks" label="Total number of tasks" :span="8">
                </el-table-column>
                <el-table-column label="Total number of error tasks" :span="8">
                  <template slot-scope="scope">
                    <span>
                      <a href="javascript:void(0);" @click="MonthlyJump(scope.row.Statistictime)">{{scope.row.Totalnumberoferrortasks}}</a>
                    </span>
                  </template>
                </el-table-column>
              </el-table> 
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>

    <el-row class="table-row">
      <el-col :span="8">
        <el-card class="middle-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>Jobs in queue</span>
          </div>
          <el-table :data="tableData3" height="270" border :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center','height':'5px'}" :cell-style="{'height':'10px'}" style="width: 100%" @row-click='showDetailInQueue'>
            <el-table-column type="index" :span="2"></el-table-column>
            <el-table-column prop="name" label="Task Name" :span="11"></el-table-column>
            <el-table-column prop="next_run_time" label="Next Run Time"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="middle-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>Jobs being performed</span>
          </div>
          <el-table :data="tableData4" height="270" border :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center','height':'5px'}" :cell-style="{'height':'10px'}" style="width: 100%" @row-click='showDetail'>
            <el-table-column type="index" :span="2"></el-table-column>
            <el-table-column prop="name" label="Task Name" :span="11"></el-table-column>
            <el-table-column prop="description" label="Task Description"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="middle-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>Error Task</span>
          </div>
          <el-table :data="tableData5" height="270" border :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center','height':'5px'}" :cell-style="{'height':'10px'}" style="width: 100%" @row-click='showDetail' >
            <el-table-column type="index" :span="2"></el-table-column>
            <el-table-column label="TaskName" :span='6'>
              <template slot-scope="scope">
                <span>
                  <el-popover placement="left" title="TaskName:" width="100%" trigger="hover" :content="scope.row.taskname">
                    <span class="description" slot="reference">
                      {{scope.row.taskname}}
                    </span>
                  </el-popover>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="Dscription" :span='6'>
              <template slot-scope="scope">
                <span>
                  <el-popover placement="left" title="Description:" width="100%" trigger="hover" :content="scope.row.description">
                    <span class="description" slot="reference">
                      {{scope.row.description}}
                    </span>
                  </el-popover>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
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
        tableData4: [],
        tableData5: [],
        tableData6:[],
        tableData7:[],
        tableData8:[],
        sessionId:''
      }
    },
    components: { DailyBoard , WeeklyBoard , MonthlyBoard},
    methods: {
      getTabWeeklyData() {
        this.axios.get(this.$store.state.API + 'board/weekly_list',{
        params: {
              sessionid: this.sessionId
          }
        })
        .then((response) => {
          this.tableData1 = response.data.data.tabData
          this.chartData1 = response.data.data.chartData
        })
      },
      getTabMonthlyData() {
        this.axios.get(this.$store.state.API + 'board/monthly_list',{
        params: {
              sessionid: this.sessionId 
          }
        })
        .then((response) => {
          this.tableData2 = response.data.data.tabData
          this.chartData2 = response.data.data.chartData
        })
      },
      init() {
        this.axios.get(this.$store.state.API + 'board/daily_list',{
        params: {
              sessionid: this.sessionId
          }
        })
        .then((response) => {
          this.tableData = response.data.data.tabData
          this.chartData = response.data.data.chartData
        }).catch((error) => {
          console.log(error)
        })
      },
      showDetail(row, event, column) {
        this.$router.push({name: 'viewtaskmodule', params: { data: row.taskid }})
      },
      showDetailInQueue(row, event, column) {
        this.$router.push({name: 'viewtaskmodule', params: { data: row.kwargs.taskid }})
      },
      get_job_tab() {
        this.axios.get(this.$store.state.API + 'scheduler/jobs')
        .then((response) => {
          for(let i=0;i<response.data.length;i++) {
            let date = new Date(response.data[i]["next_run_time"])
            response.data[i]["next_run_time"] = date.toLocaleString()
          }
          this.tableData3 = response.data
        })
      },
      get_fail_daily() {
        this.axios.get(this.$store.state.API + 'board/daily_fail_list',{
        params: {
              sessionid: this.sessionId
          }
        })
        .then((response) => {
          if(response.data.code === 200)
            this.tableData6 = response.data.data
        })
      },
      get_fail_weekly() {
        this.axios.get(this.$store.state.API + 'board/weekly_fail_list',{
        params: {
              sessionid: this.sessionId
          }
        })
        .then((response) => {
          if(response.data.code === 200)
            this.tableData7 = response.data.data
        })
      },
      get_fail_monthly() {
        this.axios.get(this.$store.state.API + 'board/monthly_fail_list',{
        params: {
              sessionid: this.sessionId
          }
        })
        .then((response) => {
          if(response.data.code === 200)
            this.tableData8 = response.data.data
        })
      },
      get_being_perform() {
        this.axios.get(this.$store.state.API + 'board/being_performed',{
        params: {
              sessionid: this.sessionId
          }
        })
        .then((response) => {
          if(response.data.code === 200)
            this.tableData4 = response.data.data
        })
      },
      get_error_tasks() {
        this.axios.get(this.$store.state.API + 'board/error_tasks',{
        params: {
              sessionid: this.sessionId
          }
        })
        .then((response) => {
          if(response.data.code === 200)
            this.tableData5 = response.data.data
        })
      },
      DailyJump(date) {
        this.$router.push({name: 'errortask', params: { data: date,fre:'daily',specific:'0'}})
      },
      WeeklyJump(date) {
        this.$router.push({name: 'errortask', params: { data: date,fre:'weekly',specific:'0'}})
      },
      MonthlyJump(date) {
        this.$router.push({name: 'errortask', params: { data: date,fre:'monthly',specific:'0'}})
      },
      Jump(row, event, column) {
      //   this.$router.push({name: 'viewtaskmodule', params: { data: row.taskid }})
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
        this.get_job_tab()
        this.get_fail_daily()
        this.get_fail_weekly()
        this.get_fail_monthly()
        this.get_being_perform()
        this.get_error_tasks()
    }
  }
</script>
<style type="text/css">
	.table-row {
		height: 50%;
    margin-top: 10px;
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
  .el-card__body {
    padding: 20px;
  }
  .instrument_table {
    margin-top: 20px
  }
  .middle-card {
    margin: 1%;
    height:350px;
  }
  .error_link {
    text-decoration:none;
  }
  .description {
    width:90%;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    /*兼容性*/
    -webkit-text-overflow:ellipsis;
  }
</style>