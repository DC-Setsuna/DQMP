<template>
	<div>
      <el-form ref="form" :model="newTaskForm" label-width="80px" size="small" v-bind:disabled=disable>
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
            <el-button  v-bind:class="{active:isActive}" class="task_button" type="primary" size="small">Manual Run</el-button>
		  </el-form-item>
		  <el-form-item label-width='120px' label="Task type :">
		    <el-select class="newtask_input" v-model="newTaskForm.type" placeholder="Please select Task Type">
		      <el-option label="SQL" value="sql"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label-width='120px' label="Result Verify :">
		  	<el-input-number class="newtask_input" v-model="newTaskForm.verify" controls-position="right" :min="1" :max="100000"></el-input-number>
		  </el-form-item>
		  <el-form-item label-width='120px' label="Upload :"  v-bind:class="{active:isActive}">
		  	<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" :before-remove="Remove" :file-list="newTaskForm.fileList" multiple>
              <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传sql文件，且不超过500kb</div>
            </el-upload>
		  </el-form-item>
		  <el-form-item label-width='120px' label="Content :">
		    <el-input class="newtask_text_input" type="textarea" :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入内容" v-model="newTaskForm.content"></el-input>
		  </el-form-item>
	  </el-form>
      <span slot="footer" class="dialog-footer">
      	<el-button>Run</el-button>
        <el-button @click="Edit()">Edit</el-button>
        <el-button >History</el-button>
      </span>
      <el-table v-bind:class="{active:tableActive}" :data="tableData3" height="350px" border class="viewtask_tab">
      	<el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="date" label="Run time" width="180">
        </el-table-column>
        <el-table-column prop="name" label="Total" width="180">
        </el-table-column>
        <el-table-column prop="address" label="Result">
        </el-table-column>
        <el-table-column prop="date" label="Running status" width="180">
        </el-table-column>
        <el-table-column prop="name" label="Duration" width="180">
        </el-table-column>
        <el-table-column prop="address" label="Comments">
        </el-table-column>
      </el-table>
	</div>
</template>
<script type="text/javascript">
  export default {
  data () {
    return {
	  data: '',
	  isActive: true,
	  disable: true,
	  tableActive: false,
	  newTaskForm: {
        id: 'ACT20180420_001',
        category: '1',
        owner: '2',
        email: '3',
        description: '4',
        tag: '5',
        enabled: '6',
        freqency: '7',
        type: '8',
        verify: 9,
        content: '10',
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      },
      tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
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
    }
  },
  created: function(){
  	this.data = this.$route.params.data
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