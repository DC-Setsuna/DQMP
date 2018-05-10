<template>
	<div>
      <el-form ref="form" :model="newTaskForm" label-width="80px" size="small" v-bind:disabled=disable>
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
            <el-checkbox v-model="newTaskForm.run_now">提交后立即执行</el-checkbox>
		  </el-form-item>
		  <el-form-item label-width='120px' label="Task type :">
		    <el-select class="newtask_input" v-model="newTaskForm.task_type" placeholder="Please select Task Type">
		      <el-option label="SQL" value="sql"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label-width='120px' label="Result Verify :">
		  	<el-input-number class="newtask_input" v-model="newTaskForm.threshold" controls-position="right" :min="1" :max="100000"></el-input-number>
		  </el-form-item>
		  <el-form-item label-width='120px' label="Upload :" v-bind:class="{active:isActive}">
			<el-upload class="upload-demo" ref="upload" :show-file-list="true" drag action="http://localhost:5000/file/add" :on-success='UploadSuccess' :on-change="Change" :on-remove="Remove" :file-list='newTaskForm.fileList' :multiple="false" :limit="1">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drag the file here, or <em>click upload</em></div>
            <div class="el-upload__tip" slot="tip">Currently only SQL files are allowed. Upload one file</div>
          </el-upload> 
			  </el-form-item>
		  </el-form-item>
		  <el-form-item label-width='120px' label="Content :">
		    <el-input class="newtask_text_input" type="textarea" :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入内容" v-model="newTaskForm.content"></el-input>
		  </el-form-item>
	  </el-form>
      <span slot="footer" class="dialog-footer">
      	<el-button v-bind:class="{active:tableActive}">Run</el-button>
        <el-button @click="Edit">Edit</el-button>
        <el-button v-bind:class="{active:tableActive}" @click="History">History</el-button>
        <el-button v-bind:class="{active:isActive}" @click="Cancel">Cancel</el-button>
        <el-button v-bind:class="{active:isActive}" @click="Submit">Submit</el-button>
      </span>
      <el-table v-bind:class="{active:tableActive}" :data="tableData3" height="350px" border class="viewtask_tab">
      	<el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="run_time" label="Run time" width="180">
        </el-table-column>
        <el-table-column prop="count" label="Total" width="180">
        </el-table-column>
        <el-table-column prop="result" label="Result">
        </el-table-column>
        <el-table-column prop="status" label="Running status" width="180">
        </el-table-column>
        <el-table-column prop="duration" label="Duration" width="180">
        </el-table-column>
        <el-table-column prop="" label="Comments">
        </el-table-column>
      </el-table>
	</div>
</template>
<script type="text/javascript">
import qs from 'qs'
  export default {
  data () {
    return {
	  data: '',
	  isActive: true,
	  disable: true,
	  tableActive: false,
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
        upload_user_id: '1233333',
        fileList: []
      },
      tableData3: []
	}
  },
  methods: {
  	Remove(file, fileList) {
      console.log(file,fileList)
    },
    Edit() {
      this.isActive = false
	  this.disable = false
	  this.tableActive = true
    },
    Cancel() {
      this.isActive = true
	  this.disable = true
	  this.tableActive = false
    },
    Change(file, fileList) {
      if(fileList != '' && fileList != null){
        
      }
    },
    UploadSuccess(response,file,fileList) {
      this.newTaskForm.file_path = response.data
    },
    Remove(file, fileList) {
      this.axios.post(this.$store.state.API + 'file/remove',qs.stringify({filename:file.name})
      ).then((response) =>{
        
      })
    },
    init() {
      this.axios.post(this.$store.state.API + 'TaskLog/select',qs.stringify({taskid:this.$route.params.data})).then((response) => {
      	if(response.data.code == 200) {
          this.newTaskForm = response.data.data[0];
          if(this.newTaskForm.run_now === "True") this.newTaskForm.run_now = true
          if(this.newTaskForm.run_now === "False") this.newTaskForm.run_now = false
          this.file_path = this.newTaskForm.filepath.substring(16,25)
          this.newTaskForm.fileList = [{name: this.newTaskForm.filepath.substring(16,25), url: this.newTaskForm.filepath}]
        }
      })
      this.axios.post(this.$store.state.API + 'TaskLog/selctTaskLogById',qs.stringify({taskid:this.$route.params.data})).then((response) => {
        if(response.data.code == 200) {
        	this.tableData3 = response.data.data
        }
      })
    },
    Submit() {
    	console.log('Here Will Submit')
    },
    History() {
        this.$router.push({name: 'history', params: { data: this.newTaskForm.taskid }})
    }
  },
  created: function(){
  	this.init()
  }
}
</script>
<style type="text/css">
  .newtask_text_input {
		width: 60%;
	}
	.newtask_row_input {
		width: 25%;
		margin-right: 40px;
	}
	.newtask_input {
		width: 25%;
	}
	.task_button {
		margin-left: 20%;
	}
	.dialog-footer {
		width: 20%;
		margin-left: 40%;
	}
	.active {
		display: none;
	}
	.viewtask_tab {
	  margin-top:50px; 
	  width: 90%; 
	  margin-left:5%;
	}
</style>