<template>
  <div>
    <el-card class="box-card">
      <el-row slot="header" class="clearfix">
        <el-button size="medium">RUN ALL</el-button>
        <el-button size="medium" @click="showmodule()">ADD TASK</el-button>
        <!-- add task 模态框 -->
        <el-dialog id="1" title="ADD TASK" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
          <el-form :model="newTaskForm" :rules="rules" ref="newTaskForm" label-width="80px" size="small">
            <el-form-item label-width='120px' label="Task Name :" prop="taskname">
              <div class="newtask_row_input" >
                <el-input v-model="newTaskForm.taskname"></el-input>
              </div>
            </el-form-item>
            <el-form-item label-width='120px' label="Category :" prop="category">
              <el-select class="newtask_input" v-model="newTaskForm.category" placeholder="Please select a Category">
                <el-option label="Account" value="Account"></el-option>
                <el-option label="Opportunities" value="Opportunities"></el-option>
                <el-option label="LineItmes" value="Lineitmes"></el-option>
                <el-option label="Forecast" value="Forecast"></el-option>
                <el-option label="MgrForecast" value="MgrForecast"></el-option>
                <el-option label="Leads" value="Leads"></el-option>
                <el-option label="Contacts" value="Contacts"></el-option>
                <el-option label="Winplan" value="Winplan"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width='120px' label="Owner :" prop="owner">
              <div class="newtask_row_input">
                <el-input id="el-input" v-model="newTaskForm.owner"></el-input>
              </div>
            </el-form-item>
            <el-form-item label-width='120px' label="Email :" prop="email">
              <div class="newtask_row_input">
                <el-input v-model="newTaskForm.email">
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label-width='120px' label="Description :" prop="description">
              <el-input class="newtask_text_input" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="Please enter content" v-model="newTaskForm.description"></el-input>
              </el-form-item>
              <el-form-item label-width='120px' label="Tag :" prop="tag">
              <el-input class="newtask_text_input" v-model="newTaskForm.tag"></el-input>
            </el-form-item>
            <el-form-item label-width='120px' label="Enabled :" prop="enabled">
              <el-select class="newtask_input" v-model="newTaskForm.enabled" placeholder="Please select a Enabled">
                <el-option label="YES" value="True"></el-option>
                <el-option label="NO" value="False"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width='120px' label="Freqency :" prop="freqency">
              <el-select class="newtask_input" v-model="newTaskForm.freqency" placeholder="Please select Freqency ">
                <el-option label="Daily" value="daily"></el-option>
                <el-option label="Weekly" value="weekly"></el-option>
                <el-option label="Monthly" value="monthly"></el-option>
              </el-select>
              <el-checkbox v-model="newTaskForm.run_now">RUN NOW</el-checkbox>
            </el-form-item>
            <!-- <el-form-item label-width='120px'  label="Time Range :">
              <el-date-picker v-model="newTaskForm.date" type="datetimerange"
                :picker-options="pickerOptions2" range-separator="To" start-placeholder="Start date" end-placeholder="End date"
                align="right" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item> -->
            <el-form-item label-width='120px' label="Task type :" prop="task_type">
              <el-select class="newtask_input" v-model="newTaskForm.task_type" placeholder="Please select Task Type">
                <el-option label="SQL" value="sql"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width='125px' label="Result Verify :" prop="threshold">
              <el-input-number class="newtask_input" v-model="newTaskForm.threshold" controls-position="right" :step='100' :min="100" :max="1000000000000"></el-input-number>
            </el-form-item>
            <el-form-item label-width='120px' label="Upload :">
              <el-upload class="upload-demo" ref="upload" :show-file-list="true" drag action="/file/add" :on-success='UploadSuccess' :on-remove="Remove" :file-list='fileList' :multiple="false" :limit="1">
               <i class="el-icon-upload"></i>
               <div class="el-upload__text">Drag the file here, or <em>click upload</em></div>
               <div class="el-upload__tip" slot="tip">Currently only SQL files are allowed. Upload one file</div>
               <div class="el-upload__tip" slot="tip">
                 Must be “SELECT COUNT”.  Don't have "SELECT *" and "DELETE" and "UPDATE" in the file.
               </div>
              </el-upload>
            </el-form-item>
            <el-form-item label-width='120px' label="Content :" prop="content">
              <el-input class="newtask_text_input" type="textarea" :autosize="{ minRows: 5, maxRows: 10}" placeholder="Please enter content" v-model="newTaskForm.content"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="resetForm('newTaskForm')">Refresh</el-button>
            <el-button @click="cancel">Canel</el-button>
            <el-button type="primary" @click="Submit()">Submit</el-button>
          </span>
        </el-dialog>
        <!-- END -->
      </el-row>
      <el-row class="account-row">
        <el-row class="account-filters-row">
          <el-form ref="form" :model="filtrateForm" label-width="80px" size="small">
            <el-col :span="7">
              <label>Frequency :</label>
              <el-select v-model="filtrateForm.freqency" placeholder="Please select">
                <el-option label="ALL" value=""></el-option>                
                <el-option label="Daily" value="daily"></el-option>
                <el-option label="Weekly" value="weekly"></el-option>
                <el-option label="Monthly" value="monthly"></el-option>
              </el-select>
            </el-col>
            <el-col :span="7">
              <label>Enable :</label>
              <el-select v-model="filtrateForm.enabled" placeholder="Please select">
              <el-option label="ALL" value=""></el-option>
               <el-option label="YES" value="1"></el-option>
               <el-option label="NO" value="0"></el-option>
              </el-select>
            </el-col>
            <el-col :span="7">
              <label>Category :</label>
              <el-select v-model="filtrateForm.category" placeholder="Please select">
               <el-option label="ALL" value=""></el-option>
               <el-option label="Account" value="Account"></el-option>
               <el-option label="Opportunities" value="Opportunities"></el-option>
               <el-option label="LineItmes" value="LineItmes"></el-option>
               <el-option label="Forecast" value="Forecast"></el-option>
               <el-option label="MgrForecast" value="MgrForecast"></el-option>
               <el-option label="Leads" value="Leads"></el-option>
               <el-option label="Contacts" value="Contacts"></el-option>
               <el-option label="Winplan" value="Winplan"></el-option>
              </el-select>
            </el-col>
          </el-form>
        </el-row>
        <el-row class="account-row">
          <el-table :data="tableData" border :height="window_height" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" style="width: 96%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column fixed label="Task Name" width="220px">
              <template slot-scope="scope">
                <span>
                  <a class="error_link" href="javascript:void(0);" @click="showDetail(scope.row.taskid)">{{scope.row.taskname}}</a>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="owner" label="Owner" width="180px">
            </el-table-column>
            <el-table-column prop="description" label="Description" width="220px">
            </el-table-column>
            <el-table-column prop="last_runtime" label="Last Run Date" width="200px"></el-table-column>
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
            <!-- <el-table-column label="Operation" fixed="right" width="100px">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
                </template>
            </el-table-column> -->
          </el-table>
        </el-row>
      </el-row>
    </el-card>
  </div>
</template>
<script type="text/javascript">
import qs from 'qs'
export default {
  data () {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      newTaskForm: {
        taskname: '',
        category: '',
        owner: '',
        email: '',
        description: '',
        tag: '',
        enabled: '',
        freqency: '',
        task_type: '',
        threshold: 0,
        content: '',
        run_now: '',
        file_path: '',
        // date:'',
        upload_user_id: ''
      },
      tableData: [],
      window_height: 0,
      filtrateForm: {
        freqency: '',
        enabled: '',
        category: '',
        sessionid: ''
      },
      fileList: [],
      multipleSelection: [],
      rules: {
          taskname: [
            { required: true, message: 'Please fill in a Task Name', trigger: 'blur' }
          ],
          category: [
            { required: true, message: 'Please select a Category', trigger: 'change' }
          ],
          owner: [
            { required: true, message: 'Please fill in Owner and Email', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Please fill in Email', trigger: 'blur' }
          ],
          enabled: [
            { required: true, message: 'Please select a Enabled', trigger: 'blur' }
          ],
          freqency: [
            { required: true, message: 'Please select a Freqency', trigger: 'change' }
          ],
          task_type: [
            { required: true, message: 'Please select a Type', trigger: 'change' }
          ],
          threshold: [
            { type:'number', required: true, message: 'Please select a Verify', trigger: 'blue' },
            { type:'number', min: 0, message: 'Verify cannot be less than 0', trigger: 'change' }
          ],
          file_path: [
            { required: true, message: 'Please select a File', trigger: 'blur' }
          ]
      },
      sessionid: '',
      pickerOptions2: {
          shortcuts: [{
            text: 'Last week',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Last month',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Last 3 months',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('Confirm close?').then(_ => {
        this.newTaskForm={
          taskname: '',
          category: '',
          owner: '',
          email: '',
          description: '',
          tag: '',
          enabled: '',
          freqency: '',
          task_type: '',
          threshold: 0,
          content: '',
          run_now: '',
          file_path: '',
          // date:'',
          upload_user_id: this.sessionid
        };
        this.fileList = []
        done();
      }).catch(_ => {});
    },
    cancel() {
      this.dialogVisible = false
      this.newTaskForm={
          taskname: '',
          category: '',
          owner: '',
          email: '',
          description: '',
          tag: '',
          enabled: '',
          freqency: '',
          task_type: '',
          threshold: 0,
          content: '',
          run_now: '',
          // date:'',
          upload_user_id: this.sessionid
        };
        this.fileList = []
    },
    // Change(file, fileList) {
    //   if(fileList != '' && fileList != null){
    //     this.disable = true
    //   }
    // },
    Remove(file, fileList) {
      this.axios.post(this.$store.state.API + 'file/remove',qs.stringify({filename:file.name})
        ).then((response) =>{
          this.newTaskForm.content = ''
        })
    },
    Submit(file) {
      this.dialogVisible = false
      // this.newTaskForm.file_path = this.fileList[0]
      this.newTaskForm.upload_user_id = this.sessionid
      if(!this.newTaskForm.taskname || !this.newTaskForm.category 
        || !this.newTaskForm.owner || !this.newTaskForm.email 
        || !this.newTaskForm.enabled || !this.newTaskForm.freqency 
        || !this.newTaskForm.task_type || this.newTaskForm.threshold == 0) {
        this.$message({
          showClose: true,
          message: 'You have some information not added.',
          type: 'warning'
        });
        return
      }
      if(this.newTaskForm.run_now!=true) {
        this.newTaskForm.run_now = 'False'
      } else {this.newTaskForm.run_now = 'True'}

      if(this.sessionid == '')
        this.$router.push({name: 'login'})
      else {
        this.axios.post(this.$store.state.API + 'user/checkSession',qs.stringify({sessionid: this.sessionid}))
        .then((response) => {
          if(response.data.code === 401)
            this.$router.push({name: 'login'})
          if(response.data.code === 200)
            this.axios.post(this.$store.state.API + 'task/add/',qs.stringify(this.newTaskForm)).then((response) => {
              if(response.data.code == 200) {
                this.newTaskForm={
                  taskname: '',
                  category: '',
                  owner: '',
                  email: '',
                  description: '',
                  tag: '',
                  enabled: '',
                  freqency: '',
                  task_type: '',
                  threshold: 0,
                  content: '',
                  run_now: '',
                  file_path: '',
                  upload_user_id: this.sessionid
                };
                this.fileList = []
                this.getaccount_tab_data()
              }
            })
        })
      }
    },
    Run() {
      this.axios.get(this.$store.state.API + 'add_task').then((response) => {
        if (response.data.code === 200) {

        }
      })
    },
    resetForm(formName) {
      this.$confirm('Are you sure refresh？').then(_ => {
       this.$refs[formName].resetFields()
       this.newTaskForm.email = ''
    }).catch(_ => {});
    },
    getWindowSize() {
      this.window_height = window.screen.availHeight * 0.8;
    },
    showDetail(taskid) {
      this.$router.push({name: 'viewtaskmodule', params: { data: taskid }})
    },
    getaccount_tab_data() {
      this.axios.get(this.$store.state.API + 'log/list',{
        params: {
              sessionid:this.sessionid
          }
        }).then((response) => {
          this.tableData = response.data.data;
      })
    },
    filtrateTask() {
      this.filtrateForm.sessionid = this.sessionid
      this.axios.post(this.$store.state.API + 'log/filtrate',qs.stringify(this.filtrateForm)).then((response) => {
        this.tableData = response.data.data;
      })
    },
    showmodule() {
      if(this.sessionid == '')
        this.$router.push({name: 'login'})
      else {
        this.axios.post(this.$store.state.API + 'user/checkSession',qs.stringify({sessionid: this.sessionid}))
        .then((response) => {
          if(response.data.code === 401)
            this.$router.push({name: 'login'})
          if(response.data.code === 200)
            this.dialogVisible = true
        })
      }
    },
    // uuid(len, radix) {
    //   var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    //   var uuid = [], i;
    //   radix = radix || chars.length;
    //   if (len) {
    //     // Compact form
    //     for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    //   } else {
    //     var r;
    //     uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    //     uuid[14] = '4';
    //     for (i = 0; i < 36; i++) {
    //       if (!uuid[i]) {
    //         r = 0 | Math.random()*16;
    //         uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
    //       }
    //     }
    //   }
    //   return uuid.join('');
    // },
    UploadSuccess(response,file,fileList) {
      if (response.code == 200) {
        this.newTaskForm.file_path = response.data
        this.newTaskForm.content = response.sql
      } 
      if (response.code == 300) {
        this.$message.error(response.message);
        this.fileList = []
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    // 删除task函数
    // handleDelete(row) {
    //   this.axios.post(this.$store.state.API + 'task/delete/',qs.stringify({
    //   taskid:row.taskid})).then((response) => {
    //       if(response.data.code === 200) {
    //         this.$message({
    //           showClose: true,
    //           message: 'Delect Success',
    //           type: 'success'
    //         })
    //         this.getaccount_tab_data();
    //       }
    //   });
    // },
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
  created: function () {
      this.sessionid = this.getCookie('sessionid')
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
.newtask_text_input {
  width: 72%;
}
.newtask_row_input {
  width: 35%;
  margin-right: 40px;
}
.newtask_input {
  width: 35%;
}
.task_button {
  margin-left: 20%;
}
.account-row {
  margin-top: 50px;
  padding-left: 2%;
}
.account-filters-row {
  padding-left: 2%;
}
.box-card {
  margin-top: 15px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.error_link {
  text-decoration:none;
}
</style>