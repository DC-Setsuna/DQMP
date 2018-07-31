<template>
	<div style="padding: 50px 50px;">
		<div>
			<el-card class="flowbox-card">
				<Weeklyflow class="board-board"/>
			</el-card>
		</div>
		<div style="padding-top: 30px;">
			<el-card class="flowbox-card">
				<Weeklyflowb class="board-board"/>
			</el-card>
		</div>
		<div style="padding-top: 30px;">
			<el-card class="flowbox-card">
				<Weeklyflowc class="board-board"/>
			</el-card>
		</div>
	</div>
</template>

<script>
	import Weeklyflow from "./weeklyflow"
	import Weeklyflowb from "./weeklyflowb"
	import Weeklyflowc from "./weeklyflowc"
	export default {
		data() {
			return {
				count: '',
				// scount: '',
				// fcount: '',
				success_rate: '',
				failure_count: '',
				sessionId: ''
			}
		},
		components: { Weeklyflow, Weeklyflowb, Weeklyflowc },
		methods:{
			init() {
				this.axios.get(this.$store.state.API + 'board/weekly_list',{
					params: {
						sessionid: this.sessionId
					}
				})
				.then((response) => {
					this.tableData = response.data.data.tabData
					this.chartData = response.data.data.chartData
				}).catch((error) => {
					console.log(error)
				})
			},
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
			this.sessionId = this.getCookie('sessionid')
			this.init()
		}
	}
</script>

<style>
.flowbox-card {
	height: 350px;
	min-width: 800px;
}
</style>