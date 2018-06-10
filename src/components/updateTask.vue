<template>
	<el-card class="box-card">
      <el-form ref="form" :model="newTaskForm" label-width="80px" size="small">
		    <el-form-item label-width='120px' label="Task ID :">
		      {{newTaskForm.taskid}}
		    </el-form-item>
        <el-form-item label-width='120px' label="Task Name :" prop="taskname">
          <div class="newtask_row_input" >
            <el-input v-model="newTaskForm.taskname"></el-input>
          </div>
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
          <div class="newtask_row_input">
  		      <el-input v-model="newTaskForm.owner"></el-input>
          </div>
  		  </el-form-item>
        <el-form-item label-width='120px' label="Email :">
          <div class="newtask_row_input" >
            <el-input v-model="newTaskForm.email"></el-input>
          </div>
        </el-form-item>
  		  <el-form-item label-width='120px' label="Description :">
  		    <el-input class="newtask_text_input" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="newTaskForm.description"></el-input>
  		  </el-form-item>
  		  <el-form-item label-width='120px' label="Tag :">
  		    <el-input class="newtask_text_input" v-model="newTaskForm.tag"></el-input>
  		  </el-form-item>
  		  <el-form-item label-width='120px' label="Freqency :">
  		    <el-select class="newtask_input" v-model="newTaskForm.freqency" placeholder="Please select Freqency ">
  		      <el-option label="Daily" value="daily"></el-option>
  		      <el-option label="Weekly" value="weekly"></el-option>
  		      <el-option label="Monthly" value="monthly"></el-option>
  		    </el-select>
  		  </el-form-item>
  		  <el-form-item label-width='120px' label="Task type :">
  		    <el-select class="newtask_input" v-model="newTaskForm.task_type" placeholder="Please select Task Type">
  		      <el-option label="SQL" value="sql"></el-option>
  		    </el-select>
  		  </el-form-item>
  		  <el-form-item label-width='120px' label="Result Verify :">
  		  	<el-input-number class="newtask_input" v-model="newTaskForm.threshold" controls-position="right" :step='100' :min="1" :max="10000000000"></el-input-number>
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
  		  </el-form-item>
  		  <el-form-item label-width='120px' label="Content :">
  		    <el-input class="newtask_text_input" type="textarea" :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入内容" v-model="newTaskForm.content"></el-input>
  		  </el-form-item>
	    </el-form>
      <div class="clearfix">
        <span class="dialog-footer">
          <el-button>Run</el-button>
          <el-button @click="Cancel">Cancel</el-button>
	      <el-button @click="Submit">Submit</el-button>
        </span>
      </div>
    </el-card>
	
</template>
<script type="text/javascript">
    import qs from 'qs'
	export default {
		data() {
			return {
        newTaskForm:{},
        fileList:[]
			}
		},
		methods: {
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
	    Change(file, fileList) {
	      if(fileList != '' && fileList != null){
	        this.disable = true
	      }
	    },
	    Remove(file, fileList) {
	      this.axios.post(this.$store.state.API + 'file/remove',qs.stringify({filename:file.name})
	        ).then((response) =>{
	          this.newTaskForm.content = ''
	        })
	    },
	    Submit() {
	      this.axios.post(this.$store.state.API + 'task/update/',qs.stringify(this.newTaskForm)).then((response) => {
	        if(response.data.code == 200) {
	          this.$router.push({name: 'viewtaskmodule', params: { data: this.newTaskForm.taskid }})
	        }
	      })
	    },
	    Cancel() {
        this.$router.push({name: 'viewtaskmodule', params: { data: this.newTaskForm.taskid }})
	    }
		},
		created: function() {
			this.newTaskForm = this.$route.params.data
		}
	}
</script>
<style type="text/css">
	
</style>