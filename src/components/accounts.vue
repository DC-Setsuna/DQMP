<template>
  <div>
    Account
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
        upload_user_id: 123333
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
    Change(file, fileList) {
      console.log("上传文件改变" + fileList)
    },
    Remove(file, fileList) {
      this.axios.post(this.$store.state.API + 'file/remove',qs.stringify({filename:file.name})
      )
    },
    Submit(file) {
      if(this.newTaskForm.run_now!=true) {
        this.newTaskForm.run_now = 'False'
      } else {this.newTaskForm.run_now = 'True'}
      console.log("+++++++"+this.newTaskForm.file_path)
      this.axios.post(this.$store.state.API + 'task/add/',qs.stringify(this.newTaskForm)).then((response) => {
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
    }
  },
  created: function () {
  	this.getWindowSize();
    this.getaccount_tab_data();
  }
}
</script>
<style type="text/css"></style>