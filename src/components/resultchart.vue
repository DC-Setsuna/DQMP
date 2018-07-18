<template>
	<div id="histogram1" class="instrument_table" :style="{width: '96%', height: '250px'}">
    </div>
</template>
<script type="text/javascript">
  export default {
  	props:['datas'],
  	data() {
      return {}
  	},
  	watch: {
      datas: {
        handler:function(){
          this.drawLine()
        },
        deep:true
      }
    },
  	methods:{
	  drawLine(){
	  	let histogram1 = this.$echarts.init(document.getElementById('histogram1'))
	    histogram1.setOption({
			title: {
			  text: 'Result',
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
	          data:['Growth', 'Result'],
	          itemGap: 5,
              textStyle: {
			    fontSize: 12
			  }
	        },
	        xAxis: [
	          {
	            type : 'category',
	            data : this.datas['run_time']
	          }
	        ],
	        yAxis: {},
	        dataZoom: [
	          {
	            show: true,
	            start: 0,
	            end: 100
	          }
	        ],
	        series: [{
	        	name: 'Result',
		        data: this.datas['result'],
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