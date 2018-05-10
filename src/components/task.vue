<template>
	<div class='add_tab'>
	<!-- add task -->
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
        <el-button type="primary" @click="Submit()">Submit</el-button>
      </span>
    </el-dialog>
    <!-- END -->
  </div>
</template>
<script type="text/javascript">
    import qs from 'qs'
	export default {
		data() {
			return {
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
			    fileList: [],
                disable: false
			}
		},
		methods: {
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
		            taskid: this.uuid(12,16),
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
		        taskid: this.uuid(12,16),
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
		    }
		},
		created: function() {
			this.newTaskForm.taskid = this.uuid(12,16)
		}
	}
</script>
<style type="text/css">
	.add_tab {
		width: 80%;
	}
	.newtask_row_input {
		width: 30%;
		margin-right: 40px;
	}
	.newtask_text_input {
		width: 72%;
	}
	.newtask_input {
		width: 30%;
	}
	.task_button {
		margin-left: 20%;
	}
</style>