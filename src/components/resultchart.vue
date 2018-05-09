<template>
	<div id="histogram1" class="instrument_table" :style="{width: '90%', height: '350px'}">
    </div>
</template>
<script type="text/javascript">
  export default {
  	data() {
        return {
          
        }
  	},
  	mounted: function() {
       this.drawLine()
  	},
  	methods:{
	  drawLine(){
	  	let histogram1 = this.$echarts.init(document.getElementById('histogram1'))
	    histogram1.setOption({
			title: {
			  text: 'Result'
			},
		    tooltip : {
			  trigger: 'axis',
			  axisPointer: {
			  type: 'shadow',
			    label: {
			      show: true
			    }
			  }
			},
	        toolbox: {
	          show : true,
	          feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            magicType: {show: true, type: ['line', 'bar']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	          }
	        },
	        grid: {
	          top: '12%',
	          left: '5%',
	          right: '5%',
	          containLabel: true
	        },
	        xAxis: [
	          {
	            type : 'category',
	            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	          }
	        ],
	        yAxis: {},
	        dataZoom: [
	          {
	            show: true,
	            start: 0,
	            end: 100
	          },
	          {
	            type: 'inside',
	            start: 0,
	            end: 100
	          }
	        ],
	        series: [{
	        	name: 'Result',
		        data: [820, 932, 901, 934, 1290, 1330, 1320],
		        type: 'line'
		    }]
	    });
	  }
	}
  }
</script>
<style type="text/css">
	.instrument_table {
		margin-top: 20px
	}
</style>