<template>
	<div class="grid-content bg-purple">
		<div id="flowsuccess" class="instrument_table" :style="{width: '100%', height: '300px'}">
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
  	// props:['datas'],
  	methods: {
  		drawLine(){
  			let flowsuccess = this.$echarts.init(document.getElementById('flowsuccess'))
  			flowsuccess.setOption({
  				title: {
  					text: '成功率统计图'
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
  					data:['成功率']
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
  					name:'成功率',
  					type:'line',
  					stack: '成功率',
  					label: {
  						normal: {
  							show: true,
  							position: 'top'
  						}
  					},
  					data:[0.83, 0.92, 0.901, 0.934, 0.9, 0.98, 0.969]
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