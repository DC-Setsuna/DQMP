<template>
	<div id="histogram" class="instrument_table" :style="{width: '90%', height: '250px'}">
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
	  	let histogram = this.$echarts.init(document.getElementById('histogram'))
	    histogram.setOption({
			title: {
			  text: 'Total vs Result',
			  textStyle: {
			  	fontSize: 15
			  }
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
	        legend: {
	          data:['Growth', 'Totals', 'Result'],
	          itemGap: 5,
              textStyle: {
			    fontSize: 12
			  }
	        },
	        xAxis: [
	          {
	            type : 'category',
	            data : ['one','two','three','four','five','six']
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
	        series : [
	          {
	            name: 'Totals',
	            type: 'bar',
	            data: [100,12,152,125,102,35]
	          },
	          {
	            name: 'Result',
	            type: 'bar',
	            data: [10,5,15,26,57,30]
	          }
	        ]
	    });
	  }
	}
  }
</script>
<style type="text/css"></style>