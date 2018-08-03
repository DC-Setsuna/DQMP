<template>
	<div class="grid-content bg-purple">
		<div id="flowfailure" class="instrument_table" :style="{width: '100%', height: '300px'}">
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
  	// props:['datas'],
  	methods: {
  		drawLine(){
  			let flowfailure = this.$echarts.init(document.getElementById('flowfailure'))
  			flowfailure.setOption({
  				title: {
  					text: 'failure统计图'
  				},
  				tooltip : {
  					trigger: 'axis',
  					axisPointer: {
  						type: 'cross',
  						label: {
  							backgroundColor: '#6a7985'
  						}
  					}
  				},
  				legend: {
  					data:['failure数']
  				},
  				grid: {
  					left: '3%',
  					right: '4%',
  					bottom: '3%',
  					containLabel: true
  				},
  				xAxis : [
  				{
  					type : 'category',
  					boundaryGap : false,
  					data : ['2018-07-19','1018-07-26','2018-08-02','2018-08-09','2018-08-16','2018-08-23','2018-08-30','2018-09-06','2018-09-13']
  				}
  				],
  				yAxis : [
  				{
  					type : 'value'
  				}
  				],
  				series : [
  				{
  					name:'failure数',
  					type:'line',
  					stack: 'failure数',
  					label: {
  						normal: {
  							show: true,
  							position: 'top'
  						}
  					},
  					data:[820, 932, 901, 934, 1290, 1330, 1320]
  				}
  				]
  			});
  		}
  	},
  	// watch: {
  	// 	datas: function() {
  	// 		this.drawLine()
  	// 	}
  	// }
  	mounted: function() {
  		this.drawLine()
  	}
  }
</script>