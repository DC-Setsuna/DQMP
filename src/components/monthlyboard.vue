<template>
  <div class="grid-content bg-purple">
    <div id="histogram3" class="instrument_table" :style="{width: '95%', height: '450px'}">
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
	methods: {
	  drawLine(){
	  	let histogram3 = this.$echarts.init(document.getElementById('histogram3'))
	    histogram3.setOption({
	      title: {
            text: 'Monthly'
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
	        calculable : true,
	        legend: {
	          data:['Growth', 'Totals tasks', 'Fail tasks'],
	          itemGap: 5,
	          left: 70,
	          itemWidth : 15,
	          itemHeight : 15
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
	            data : ["One","Two","Thr","Fou","Fiv","Six","Sev","Eig","Nin","Ten","Ele","Twe"]
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
	            data: [100,123,131,132,1231,1231,123,43,544,54,234,142]
	          },
	          {
	            name: 'Fail tasks',
	            type: 'bar',
	            data: [230,123,111,13,123,123,12,43,54,54,24,42]
	          }
	        ]
	    });
	  }
	},
	mounted() {
		this.drawLine()
	}
  }
</script>