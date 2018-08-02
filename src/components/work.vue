<template>
  <div class="work_board">
    <el-card class="work-box-card">
	  <div slot="header" class="clearfix">
	    <h1>Work</h1>
	  </div>
	  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane v-for="items in category" :label="items.category" :name="items.category">
          <el-table :data="workLog" border style="width: 100%;" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}">
          	<el-table-column fixed="left" type="index" :span="1"></el-table-column>
            <el-table-column fixed="left" prop="taskname" label="Task Name" width="200">
              <template slot-scope="scope">
                <span>
                <el-popover placement="right" title="Task Name:" width="100%" trigger="hover" :content="scope.row.taskname">
                  <span class="account_description" slot="reference" style="display: block">
                  {{scope.row.taskname}}
                </span>
                </el-popover>
              </span>
              </template>
            </el-table-column>
            <el-table-column fixed="left" label="Description" width="240">
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
            <el-table-column fixed="left" label="Change" prop="change" width="100">
            </el-table-column>
            <el-table-column fixed="left" label="Percent" prop="percent" width="100">
            </el-table-column>
            <el-table-column v-for="item in workDate" :label="item" :prop="item" width="120">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
	</el-card>
  </div>
</template>
<script type="text/javascript">
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
        for(var i=0 ;i<8;i++) {
          var now = new Date();
          var date = new Date(now.getTime() - i * 24 * 3600 * 1000);
          var year = date.getFullYear();//年
          var month = date.getMonth()>9? (date.getMonth()+1).toString():'0' + (date.getMonth()+1);//月
          var day = date.getDate()>9?date.getDate().toString():'0' + date.getDate();//日
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
	.work_board {
		margin-top: 15px;
	}
	.work-box-card {
		min-height: 100%;
	}
  .account_description {
    /*max-width:90%;
    overflow:hidden;
    white-space:nowrap !important;
    text-overflow:ellipsis;
    /*兼容性1*/
    /*-webkit-text-overflow:ellipsis;*/
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
</style>