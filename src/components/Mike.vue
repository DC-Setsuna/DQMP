<template>
  <div>
	<el-card class="box-card mike-card">
		<h1>Mike's Task</h1>
	  <el-collapse　:data="tableData3" accordion>
      <el-dialog v-for="item1 in tableData3" key="item1.id" title="TASK INFORMATION" :visible.sync="item1.visible">
        <taskinfo :datas="item1"/>
      </el-dialog>
		  <div v-for="item in tableData3" style="border-bottom:1px solid #ebeef5" @click="Click(item.taskid)">
        <el-collapse-item >
  		    <template slot="title">
  		      <el-button type="text" @click="item.visible = true">
  		      	{{item.taskname}}
  		      </el-button>
            <el-tag class="mike_tag">Last Count:{{item.last_count}}</el-tag>
            <el-tag class="mike_tag" v-if="item.chang>=0" type="success">Change: +{{item.chang}}</el-tag>
            <el-tag class="mike_tag" v-if="item.chang<0" type="danger">Change: {{item.chang}}</el-tag>
            <el-tag class="mike_tag" type="info">Last Run Time:{{item.last_runtimes}}</el-tag>
  		    </template>
  		    <div class="Mike_resultchart">
  		      <div :id='item.taskid' class="instrument_table" :style="{width: '95%', height: '250px'}">
                </div>
  		    </div>
		      <el-table :data="tableDatas" height="250px" class="Mike_table">
	          <el-table-column type="index" width="20"></el-table-column>
	          <el-table-column label="TaskName" :span='5'>
	          	<template slot-scope="scope">
                  <span>
                    <el-popover placement="left" title="TaskName:" width="100%" trigger="hover" :content="scope.row.taskname">
                      <span class="task_taskname" slot="reference">
                        {{scope.row.taskname}}
                      </span>
                    </el-popover>
                  </span>
                </template>
	          </el-table-column>
	          <el-table-column prop="run_time" label="Runtime" :span='5'>
	          	<template slot-scope="scope">
                  <span>
                    <el-popover placement="left" title="Runtime:" width="100%" trigger="hover" :content="scope.row.run_time">
                    <span class="task_taskname" slot="reference">
                      {{scope.row.run_time}}
                    </span>
                    </el-popover>
                  </span>
                </template>
	          </el-table-column>
	          <el-table-column prop="duration" label="Duration" :span='1'>
	          </el-table-column>
	          <el-table-column prop="result" label="Count" :span='1'>
	          </el-table-column>
	        </el-table>
		    </el-collapse-item>
      </div>
		</el-collapse>
	</el-card>
  </div>
</template>
<script type="text/javascript">
	import qs from 'qs'
	import Resultchart from "./resultchart"
	import taskinfo from './taskinfo'
	export default {
	  data() {
	  	return {
	  		chart_data: [],
	  		tableDatas: [],
        tableData3: [],
        taskid: ''
	  	}
	  },
	  components: { Resultchart,taskinfo },
	  methods: {
	  	drawLine(id){
	  	  let histogram1 = this.$echarts.init(document.getElementById(id))
	      histogram1.setOption({
    			title: {
    			  text: 'Result',
    			  textStyle: {
    			  	fontSize: 15
    			  }
    			},
    		    tooltip : {
    			  trigger: 'axis',
    			  axisPointer: {
    			  type: 'shadow',
    			    label: {
    			      show: true
    			    }
    			  }
    			},
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          grid: {
            top: '12%',
            left: '5%',
            right: '5%',
            containLabel: true
          },
          legend: {
            data:['Growth', 'Result'],
            itemGap: 5,
              textStyle: {
        		    fontSize: 12
        		  }
          },
          xAxis: [
            {
              type : 'category',
              data : this.chart_data['run_time']
            }
          ],
          yAxis: {},
          dataZoom: [
            {
              show: true,
              start: 0,
              end: 100
            }
          ],
          series: [{
          	name: 'Result',
  	        data: this.chart_data['result'],
  	        type: 'line'
  	      }]
        });
	    },
	    init() {
	      this.axios.post(this.$store.state.API + 'log/selectTasks',qs.stringify({sessionid: this.sessionId,owner: 'Mike'})).then((response) => {
            if(response.data.code === 401) {
              this.$message({
		        showClose: true,
		        message: 'You need to log in first',
		        type: 'warning'
		       });
		       return
            }
            if(response.data.code == 200) {
            }
          }),
          this.axios.post(this.$store.state.API + 'log/selectTasks',qs.stringify({owner:'Mike',sessionid: this.sessionId})).then((response) => {
            if(response.data.code === 401)
              this.$message({
                showClose: true,
                message: 'You need to log in first',
                type: 'warning'
              });
            if(response.data.code == 200) {
            this.tableData3 = response.data.data
            }
          })
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
	    },
      Click(id) {
        this.axios.post(this.$store.state.API + 'log/selctTaskLogById',qs.stringify({sessionid: this.sessionId,taskid: id})).then((response) => {
          if(response.data.code === 401)
            this.$message({
              showClose: true,
              message: 'You need to log in first',
              type: 'warning'
            });
          if(response.data.code == 200) {
            this.tableDatas = response.data.data.tab_data
            this.chart_data = response.data.data.chart_data
          }
        }).then(response => {
          this.drawLine(id)
        })
      }
	  },
	  created: function() {
	  	this.sessionid = this.getCookie('sessionid')
	  	this.init()
	  }
	}
</script>
<style type="text/css">
  .box-card {
    margin-top: 15px;
  }
  .mike-card {
  	padding: 0 3% 3% 3%;
  }
  .Mike_resultchart {
  	width: 50%;
  	float: left;
  }
  .Mike_table {
	 width: 50%;
  	float: left;
  }
  .task_taskname {
  	max-width:90%;
  	overflow:hidden;
  	white-space:nowrap !important;
  	text-overflow:ellipsis;
  	/*兼容性*/
  	-webkit-text-overflow:ellipsis;
  }
  .mike_tag {
    margin-left: 30px;
  }
</style>