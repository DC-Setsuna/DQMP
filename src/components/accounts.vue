<template>
	<div>
	  <el-row>
	  	<el-button size="medium">RUN ALL</el-button>
	  	<el-button size="medium" @click="dialogVisible = true">ADD TASK</el-button>
	  	<!-- add task 模态框 -->
	  	<el-dialog id="1" title="ADD TASK" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
          <el-form ref="form" :model="newTaskForm" label-width="80px" size="small">
			  <el-form-item label-width='120px' label="Task ID :">
			    {{newTaskForm.id}}
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
			    <el-input class="newtask_text_input" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="newTaskForm.description"></el-input>
			  </el-form-item>
			  <el-form-item label-width='120px' label="Tag :">
			    <el-input class="newtask_text_input" v-model="newTaskForm.tag"></el-input>
			  </el-form-item>
			  <el-form-item label-width='120px' label="Enabled :">
			    <el-select class="newtask_input" v-model="newTaskForm.enabled" placeholder="Please select a Enabled">
			      <el-option label="YES" value="YES"></el-option>
			      <el-option label="NO" value="NO"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label-width='120px' label="Freqency :">
			    <el-select class="newtask_input" v-model="newTaskForm.freqency" placeholder="Please select Freqency ">
			      <el-option label="Daily" value="daily"></el-option>
			      <el-option label="Weekly" value="weekly"></el-option>
			      <el-option label="Monthly" value="monthly"></el-option>
			    </el-select>
                <el-button class="task_button" type="primary" size="small">Manual Run</el-button>
			  </el-form-item>
			  <el-form-item label-width='120px' label="Task type :">
			    <el-select class="newtask_input" v-model="newTaskForm.type" placeholder="Please select Task Type">
			      <el-option label="SQL" value="sql"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label-width='120px' label="Result Verify :">
			  	<el-input-number class="newtask_input" v-model="newTaskForm.verify" controls-position="right" :min="1" :max="100000"></el-input-number>
			  </el-form-item>
			  <el-form-item label-width='120px' label="Upload :">
			  	<el-upload class="upload-demo" ref="upload" :show-file-list="true" drag action="http://localhost:5000/upload" :before-remove="Remove" :before-upload="Submit" :auto-upload="true" multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">目前只能上传SQL文件</div>
                </el-upload>
			  </el-form-item>
			  <el-form-item label-width='120px' label="Content :">
			    <el-input class="newtask_text_input" type="textarea" :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入内容" v-model="newTaskForm.content"></el-input>
			  </el-form-item>
		  </el-form>
          <span slot="footer" class="dialog-footer">
          	<el-button @click="refresh">Refresh</el-button>
            <el-button @click="dialogVisible = false">Canel</el-button>
            <el-button type="primary" @click="dialogVisible = false">Submit</el-button>
          </span>
        </el-dialog>
        <!-- END -->
	  </el-row>
	  <el-row class="account-row">
	  	<el-row class="account-filters-row">
	  	  <el-form ref="form" :model="newTaskForm" label-width="80px" size="small">
	  	    <el-col :span="6">
	  	      <label>Frequency :</label>
	  	      <el-select v-model="newTaskForm.freqency">
			    <el-option label="Daily" value="daily"></el-option>
			    <el-option label="Weekly" value="weekly"></el-option>
			    <el-option label="Monthly" value="monthly"></el-option>
			  </el-select>
	        </el-col>
            <el-col :span="6">
          	  <label>Enable :</label>
	  	      <el-select v-model="newTaskForm.enabled">
			    <el-option label="YES" value="YES"></el-option>
			    <el-option label="NO" value="NO"></el-option>
			  </el-select>
            </el-col>
            <el-col :span="6">
          	  <label>Owner :</label>
	  	      <el-select v-model="newTaskForm.category">
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
	  	  <el-table :data="tableData" border :height="window_height" :header-cell-style="{'text-align':'center'}" :row-style="{'text-align':'center'}" style="width: 96%">
            <el-table-column fixed prop="id" label="Task ID" width="200px">
            </el-table-column>
            <el-table-column prop="name" label="Owner" width="180px">
            </el-table-column>
            <el-table-column prop="province" label="Description" width="180px">
            </el-table-column>
            <el-table-column prop="city" label="Create Date" width="200px">
            </el-table-column>
            <el-table-column prop="address" label="Last Update Date" width="200px">
            </el-table-column>
            <el-table-column prop="zip" label="Last Run Date" width="260px">
            </el-table-column>
            <el-table-column prop="name" label="Enabled" width="120px">
            </el-table-column>
            <el-table-column prop="province" label="Freqency" width="120px">
            </el-table-column>
            <el-table-column prop="city" label="Total Ran" width="120px">
            </el-table-column>
            <el-table-column prop="address" label="Tptal Fail" width="120px">
            </el-table-column>
            <el-table-column fixed="right" width="120px" label="Operation">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="lookdetail(scope.row)">
                  查看
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
	  </el-row>
	</div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      newTaskForm: {
        id: 'ACT20180420_001',
        category: '',
        owner: '',
        email: '',
        description: '',
        tag: '',
        enabled: '',
        freqency: '',
        type: '',
        verify: 0,
        content: ''
      },
      tableData: [],
      window_height: 0
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        done();
      }).catch(_ => {});
    },
    handleClose1(done) {
      this.$confirm('确认关闭？').then(_ => {
        done();
      }).catch(_ => {});
    },
    Remove(file, fileList) {
      console.log(file,fileList);
    },
    handleClick(row) {
      console.log(row.id);
    },
    Submit(file) {
    	debugger;
      console.log(file);
    },
    refresh() {
      this.$confirm('Are you sure refresh？').then(_ => {
      	this.$refs.upload.submit();
        this.newTaskForm={
        id: 'ACT20180420_001',
        category: '',
        owner: '',
        email: '',
        description: '',
        tag: '',
        enabled: '',
        freqency: '',
        type: '',
        verify: 0,
        content: ''
      };
      }).catch(_ => {});
    },
    getWindowSize() {
      this.window_height = window.screen.availHeight * 0.7;
    },
    lookdetail(row) {
      this.$router.push({name: 'viewtaskmodule', params: { data: row.id }})
    },
    getaccount_tab_data() {
      this.axios.get("../../../static/account_tab.json").then((response) => {
          this.tableData = response.data;
        })
    }
  },
  created: function () {
  	this.getWindowSize();
    this.getaccount_tab_data();
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
</style>