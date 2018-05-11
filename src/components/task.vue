<template>
  <div>
    <el-card class="box-card">
      <el-row slot="header" class="clearfix">
        <el-button size="medium">RUN ALL</el-button>
        <el-button size="medium" @click="showmodule()">ADD TASK</el-button>
        <!-- add task 模态框 -->
        <el-dialog id="1" title="ADD TASK" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
          <el-form ref="form" :model="newTaskForm" label-width="80px" size="small">
            <el-form-item label-width='120px' label="Task ID :">
             {{newTaskForm.taskid}}
            </el-form-item>
            <el-form-item label-width='120px' label="Category :">
              <el-select class="newtask_input" v-model="newTaskForm.category" placeholder="Please select a Category">
                <el-option label="Account" value="Account"></el-option>
                <el-option label="Opportunities" value="Opportunities"></el-option>
                <el-option label="LineItems" value="LineItems"></el-option>
                <el-option label="Forcast" value="Forcast"></el-option>
                <el-option label="MgrForcast" value="MgrForcast"></el-option>
                <el-option label="Leads" value="Leads"></el-option>
                <el-option label="Contacts" value="Contacts"></el-option>
                <el-option label="Winplan" value="Winplan"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width='120px' label="Owner :">
              <el-input class="newtask_row_input" v-model="newTaskForm.owner"></el-input>
              <span>Email : </span><el-input class="newtask_row_input" v-model="newTaskForm.email"></el-input>
            </el-form-item>
            <el-form-item label-width='120px' label="Description :">
              <el-input class="newtask_text_input" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="Please enter content" v-model="newTaskForm.description"></el-input>
              </el-form-item>
              <el-form-item label-width='120px' label="Tag :">
              <el-input class="newtask_text_input" v-model="newTaskForm.tag"></el-input>
            </el-form-item>
            <el-form-item label-width='120px' label="Enabled :">
              <el-select class="newtask_input" v-model="newTaskForm.enabled" placeholder="Please select a Enabled">
                <el-option label="YES" value="True"></el-option>
                <el-option label="NO" value="False"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width='120px' label="Freqency :">
              <el-select class="newtask_input" v-model="newTaskForm.freqency" placeholder="Please select Freqency ">
                <el-option label="Daily" value="daily"></el-option>
                <el-option label="Weekly" value="weekly"></el-option>
                <el-option label="Monthly" value="monthly"></el-option>
              </el-select>
              <el-checkbox v-model="newTaskForm.run_now">Execute immediately after submission.</el-checkbox>
            </el-form-item>
            <el-form-item label-width='120px' label="Task type :">
              <el-select class="newtask_input" v-model="newTaskForm.task_type" placeholder="Please select Task Type">
                <el-option label="SQL" value="sql"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width='120px' label="Result Verify :">
              <el-input-number class="newtask_input" v-model="newTaskForm.threshold" controls-position="right" :min="0" :max="1000000000000"></el-input-number>
            </el-form-item>
            <el-form-item label-width='120px' label="Upload :">
              <el-upload class="upload-demo" ref="upload" :show-file-list="true" drag action="http://localhost:5000/file/add" :on-success='UploadSuccess' :on-change="Change" :on-remove="Remove" :file-list='fileList' :multiple="false" :limit="1">
               <i class="el-icon-upload"></i>
               <div class="el-upload__text">Drag the file here, or <em>click upload</em></div>
               <div class="el-upload__tip" slot="tip">Currently only SQL files are allowed. Upload one file</div>
              </el-upload> 
            </el-form-item>
            <el-form-item label-width='120px' label="Content :">
              <el-input class="newtask_text_input" v-bind:disabled=disable type="textarea" :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入内容" v-model="newTaskForm.content"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="refresh">Refresh</el-button>
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
                <el-option label="Daily" value="daily"></el-option>
                <el-option label="Weekly" value="weekly"></el-option>
                <el-option label="Monthly" value="monthly"></el-option>
              </el-select>
            </el-col>
            <el-col :span="7">
              <label>Enable :</label>
              <el-select v-model="filtrateForm.enabled" placeholder="Please select">
               <el-option label="YES" value="1"></el-option>
               <el-option label="NO" value="0"></el-option>
              </el-select>
            </el-col>
            <el-col :span="7">
              <label>Category :</label>
              <el-select v-model="filtrateForm.category" placeholder="Please select">
               <el-option label="Account" value="Account"></el-option>
               <el-option label="Opportunities" value="Opportunities"></el-option>
               <el-option label="LineItems" value="LineItems"></el-option>
               <el-option label="Forcast" value="Forcast"></el-option>
               <el-option label="MgrForcast" value="MgrForcast"></el-option>
               <el-option label="Leads" value="Leads"></el-option>
               <el-option label="Contacts" value="Contacts"></el-option>
               <el-option label="Winplan" value="Winplan"></el-option>
              </el-select>
            </el-col>
          </el-form>
        </el-row>
        <el-row class="account-row">
          <el-table :data="tableData" border :height="window_height" :header-cell-style="{'text-align':'center'}" @row-click='showDetail' :row-style="{'text-align':'center'}" style="width: 96%">
            <el-table-column fixed prop="taskid" label="Task ID" width="180px">
            </el-table-column>
            <el-table-column prop="owner" label="Owner" width="150px">
            </el-table-column>
            <el-table-column prop="description" label="Description" width="180px">
            </el-table-column>
            <el-table-column prop="last_runtime" label="Last Run Date" width="180px"></el-table-column>
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
        taskid: '',
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
        upload_user_id: '1233333'
      },
      tableData: [],
      window_height: 0,
      filtrateForm: {
        freqency: '',
        enabled: '',
        category: ''
      },
      fileList: [],
      disable: false
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        this.newTaskForm={
          taskid: '',
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
          upload_user_id: ''
        };
        done();
      }).catch(_ => {});
    },
    cancel() {
      this.dialogVisible = false
      this.newTaskForm={
        id: this.uuid(12,16),
        category: '',
        owner: '',
        email: '',
        description: '',
        tag: '',
        enabled: '',
        freqency: '',
        task_type: '',
        verify: 0,
        content: ''
      };
    }
    ,
    Change(file, fileList) {
      if(fileList != '' && fileList != null){
        this.disable = true
      }
    },
    Remove(file, fileList) {
      this.axios.post(this.$store.state.API + 'file/remove',qs.stringify({filename:file.name})
        ).then((response) =>{
          this.disable = false
        })
      },
      Submit(file) {
        if(this.newTaskForm.run_now!=true) {
          this.newTaskForm.run_now = 'False'
        } else {this.newTaskForm.run_now = 'True'}
        this.axios.post(this.$store.state.API + 'task/add/',qs.stringify(this.newTaskForm)).then((response) => {
          if(response.data.code == 200) {
            this.newTaskForm={
              id: '',
              taskid: '',
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
              upload_user_id: ''
            };
            this.fileList = []
            this.dialogVisible = false
            this.getaccount_tab_data()
          }
        })
      },
      Run() {
        this.axios.get(this.$store.state.API + 'add_task').then((response) => {
          if (response.data.code === 200) {

          }
        })
      },
      refresh() {
        this.$confirm('Are you sure refresh？').then(_ => {
         this.$refs.upload.submit();
         this.newTaskForm={
          id: this.uuid(12,16),
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
          upload_user_id: ''
        };
      }).catch(_ => {});
      },
      getWindowSize() {
        this.window_height = window.screen.availHeight * 0.8;
      },
      showDetail(row, event, column) {
        this.$router.push({name: 'viewtaskmodule', params: { data: row.taskid }})
      },
      getaccount_tab_data() {
        this.axios.post(this.$store.state.API + 'tasklog/list').then((response) => {
          this.tableData = response.data.data;
        })
      },
      filtrateTask() {
        this.axios.post(this.$store.state.API + 'tasklog/filtrate',qs.stringify(this.filtrateForm)).then((response) => {
          this.tableData = response.data.data;
        })
      },
      showmodule() {
        this.newTaskForm.taskid = this.uuid(12,16)
        this.dialogVisible = true
      },
      uuid(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
          // Compact form
          for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
          var r;
          uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
          uuid[14] = '4';
          for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
              r = 0 | Math.random()*16;
              uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
          }
        }
        return uuid.join('');
      },
      UploadSuccess(response,file,fileList) {
        this.newTaskForm.file_path = response.data
      },
    },
    created: function () {
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
  width: 30%;
  margin-right: 40px;
}
.newtask_input {
  width: 30%;
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
</style>