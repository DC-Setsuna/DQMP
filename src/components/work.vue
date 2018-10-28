<template>
  <div class="work_board">
    <el-card class="work-box-card">
	  <div slot="header" class="clearfix">
	    <h2 class="work_head_title">Work</h2>
	  </div>
	  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane v-for="items in category" :label="items.category" :name="items.category" :key="items.taskid">
          <el-table show-summary row-class-name="work_table_row" header-row-class-name="work_table_head_row" cell-class-name="work_table_cell"
           header-cell-class-name="work_table_head_cell" :data="workLog" border style="width: 100%;" 
           :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}">
            <el-table-column fixed="left" prop="taskname" label="Task Name">
              <template slot-scope="scope">
                <span>
                <el-popover placement="right" title="Task Name:" width="100%" trigger="hover" :content="scope.row.taskname">
                  <span class="account_description" slot="reference" style="display: block">
                    <a class="work_item_taskname" href="javascript:void(0);" @click="showDetail(scope.row.taskid)">{{scope.row.taskname}}</a>
                  </span>
                </el-popover>
              </span>
              </template>
            </el-table-column>

            <el-table-column fixed="left" label="Description">
              <template slot-scope="scope">
                <span>
                <el-popover placement="right" title="Description:" width="100%" trigger="hover" :content="scope.row.description">
                  <span class="account_description" slot="reference" style="display: block">
                  {{scope.row.description}}
                </span>
                </el-popover>
              </span>
              </template>
            </el-table-column>
            <el-table-column fixed="left" label="Change" prop="change">
            </el-table-column>
            <el-table-column fixed="left" label="Percent" prop="percent">
            </el-table-column>
            <el-table-column v-for="item in workDate" :label="item" :prop="item" :key="item.taskid">
            </el-table-column>
            <el-table-column fixed="left" class-name="work_item_total" label="Total" prop="total">
            </el-table-column>
            <el-table-column label="Comments">
              <template slot-scope="scope">
                <el-input v-model="scope.row.comments" @change='commentSubmit(scope.row)' placeholder="Please enter content">
                </el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
	</el-card>
  </div>
</template>
<script type="text/javascript">
import qs from 'qs'
  export default {
	data() {
      return {
        activeName: '',
        sessionId: '',
        category: [],
        workDate: [],
        workLog:[]
      };
    },
    methods: {
      handleClick(tab, event) {
        this.getTaskLog(tab.label)
      },
      commentSubmit(row) {
        if(this.sessionId == '') {
          // this.$router.push({name: 'login'})
          this.$message({
            showClose: true,
            message: 'You need to log in first',
            type: 'warning'
          });
          return
        }
        else {
          this.axios.post(this.$store.state.API + 'user/checkSession',qs.stringify({sessionid: this.sessionId}))
          .then((response) => {
            if(response.data.code === 401) {
              // this.$router.push({name: 'login'})
              this.$message({
                showClose: true,
                message: 'You need to log in first',
                type: 'warning'
              });
              return
            }
            if(response.data.code === 200)
              this.axios.post(this.$store.state.API + 'log/updateTaskComment',
                qs.stringify({taskid: row.taskid , comments: row.comments})
              )
            .then((response) => {
              if(response.data.code == 200){
                this.$message({
                  message: 'Comments add success',
                  type: 'success',
                  duration:2000
                });
              }
            })
          })
        }
      },
      getBeforeDate(n) {
        var n = n;
        var d = new Date();
        var year = d.getFullYear();
        var mon=d.getMonth()+1;
        var day=d.getDate();
        if(day <= n){
          if(mon>1) {
             mon=mon-1;
          }
          else {
           year = year-1;
           mon = 12;
          }
        }
        d.setDate(d.getDate()-n);
        year = d.getFullYear();
        mon=d.getMonth()+1;
        day=d.getDate();
        s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
        return s;
      },
      getDate2() {
        for(var i=1 ;i<9;i++) {
          var now = new Date();
          var date = new Date(now.getTime() - i * 24 * 3600 * 1000);
          var year = date.getFullYear();//年
          var month = date.getMonth()>=9? (date.getMonth()+1).toString():'0' + (date.getMonth()+1);//月
          var day = date.getDate()>=9? date.getDate().toString():'0' + date.getDate();//日
          this.workDate.push(year + '-' + month + '-' + day)
        }
      },
      getTaskLog(category) {
        this.axios.get(this.$store.state.API + 'log/getTasklogByUsername',{
          params: {
              sessionid: this.sessionId,
              category: category
            }
          })
        .then((response) => {
            if(response.data.code == 200)
              this.workLog = response.data.result
        })
      },
      showDetail(taskid) {
        this.$router.push({name: 'viewtaskmodule', params: { data: taskid }})
      },
      init() {
        this.axios.get(this.$store.state.API + 'log/getCategoryByUsername',{
          params: {
              sessionid: this.sessionId
            }
          })
        .then((response) => {
            if(response.data.code == 200)
              this.category = response.data.category
              this.activeName = this.category[0]['category']
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
      }
    },
    created: function() {
      this.getDate2()
      this.sessionId = this.getCookie('sessionid')
      this.init()
    },
    watch: {
      category: function () {
        this.getTaskLog(this.category[0]['category'])
      }
    }
  }
</script>
<style type="text/css">
  .work_item_taskname {
    text-decoration: none;
  }
	.work_board {
		margin-top: 15px;
	}
	.work-box-card {
		min-height: 100%;
	}
  .account_description {
    width: 90%;
    course: hand;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; /* for IE */
    -o-text-overflow: ellipsis; /* for Opera */
    -icab-text-overflow: ellipsis; /* for iCab */
    -khtml-text-overflow: ellipsis; /* for Konqueror Safari */
    -moz-text-overflow: ellipsis; /* for Firefox,mozilla */
    -webkit-text-overflow: ellipsis; /* for Safari,Swift*/
  }
  .work_table_head_cell {
    padding: 8px 0px !important;
    font-size: 12px;
  }
  .work_table_cell {
    padding: 5px 0px !important;
    font-size: 10px;
  }
  .work_table_row .cell {
    padding: 0px;
  }
  .work_board .el-card__header {
    padding: 0px 20px;
  }
  .work_board .el-card__body {
    padding: 10px;
  }
  .work_head_title {
    margin: 10px 0px;
  }
  .work_table_head_row .cell {
    padding: 0px !important;
  }
  .el-popover {
    padding: 5px 15px !important;
  }
  .work_table_cell .cell .el-input .el-input__inner {
    height: 25px;
    border: 1px solid #FFF;
    border-radius: 0px;
  }
  .work_item_total {
    font-weight: 800;
    color: brown;
  }
  .el-table__footer {
    text-align: center;
    height: 30px;
  }
  .el-table__footer .is-leaf {
    padding: 8px;
  }
</style>