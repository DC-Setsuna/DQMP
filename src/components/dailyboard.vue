<template>
  <div class="grid-content bg-purple">
    <div id="histogram1" class="instrument_table" :style="{width: '96%', height: '250px'}">
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
  	props:['datas'],
  	data() {
  		return {
  			dailydata: []
  		}
  	},
	methods: {
	  drawLine(){
	  	let histogram1 = this.$echarts.init(document.getElementById('histogram1'))
	    histogram1.setOption({
			title: {
			  text: 'Daily',
			  textStyle: {
			  	fontSize: 15
			  }
			},
			color: ['#003366','#e5323e'],
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
	        calculable : true,
	        legend: {
	          data:['Growth', 'Totals tasks', 'Fail tasks'],
	          itemGap: 5,
              textStyle: {
			    fontSize: 12
			  }
	        },
	        grid: {
	          top: '12%',
	          left: '1%',
	          right: '10%',
	          containLabel: true
	        },
	        xAxis: [
	          {
	            type : 'category',
	            data : this.datas[0]
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
	            name: 'Totals tasks',
	            type: 'bar',
	            data: this.datas[1]
	          },
	          {
	            name: 'Fail tasks',
	            type: 'bar',
	            data: this.datas[2]
	          }
	        ]
	    });
	  }
	},
	watch: {
		datas: function() {
			this.drawLine()
		}
	}
  }
</script>