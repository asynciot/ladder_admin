<template lang="html">
	<section class="row content">
		<div class="col-xs-6 col-sm-8 col-md-7 col-lg-7" style="max-width:800px;">
			<form class="form-horizontal">
				<div class="form-group">
						<label for="" class="col-sm-4 control-label">显示数量 ：</label>
						<div class="col-sm-6 col-md-4">
							<select class="form-control" style="width:100%" name="select" @change="getList()" v-model="options.num">
									<option value="" >请选择</option>
									<option v-for="item in numList" :value="item" v-text="item"></option>
							</select>
						</div>
				</div>
			</form>
			<div class="chart" ref="chart"></div>
			<p class="tips" v-show="!list.length">暂无数据！</p>
		</div>
	</section>
</template>

<script>
import echarts from 'echarts';
import base64url from 'base64url';
const buffer2hex = (buffer) => {
  const unit16array = [];
  buffer.forEach((e) => {
    const num = e.toString(16);
    unit16array.push(num.length === 1 ? `0${num}` : num);
  });
  return unit16array;
}
const parseWave = (buffer) => {
  const hex = buffer2hex(buffer);
  const l = buffer.length;
  const arr = [];
  let i = 0;
  if (hex.length < 19) {
    return [];
  }
  while (i < l / 2) {
    arr.push({
      x: i,
      y: (parseInt((hex[i * 2] + hex[i * 2 + 1]), 16) / 1000),
    });
    i++;
  }
  return arr;
}
export default {
  data: () => ({
    numList: [10,20,30],
    list: [],
    chart: null,
		options:{
			propertyIds:14,
			page:1,
			num:10
		}
  }),
  created() {
    this.getList()
  },
  mounted() {
    this.chartInit()
  },
  methods: {
    chartInit() {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.chart);
      }
    },
    showChart() {
      if (this.wave.length) {
        this.chart.setOption({
          xAxis: {
            type: 'category',
          },
					tooltip: {
						trigger: 'item',
        		formatter: "{c} A"
					},
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.list.map(item=>item.y),
            type: 'line',
            smooth: true
          }]
        })
      }
      this.chart.hideLoading();
    },
    async getList() {
      let res = await this.$api.values(this.$route.params.id,this.options)
			if (res.data.code === 0 && res.data.data.list.length) {
        const list = res.data.data.list.sort((a,b)=>a.createTime-b.createTime)
        const data = list.map((item, index) => {
          item.value = (+item.value / 1000);
          return {
            x: index,
            y: item.value,
          }
        })
				this.list = data
			}
    },
  }
}
</script>

<style lang="css">
.chart {
	width:90%;
	height:360px;
	margin: 0 auto;
	border-radius: 5px;
	box-shadow: 0 0 6px 0 rgba(19, 19, 19, 0.2);
}
.tips {
	position: absolute;
	margin:-190px 0 0 40%;
}
</style>
