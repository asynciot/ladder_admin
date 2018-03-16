<template lang="html">
	<section class="row content">
		<div class="col-xs-6 col-sm-8 col-md-7 col-lg-7" style="max-width:800px;">
			<form class="form-horizontal">
				<div class="form-group">
						<label for="" class="col-sm-4 control-label">波形列表</label>
						<div class="col-sm-6 col-md-4">
							<select class="form-control" style="width:100%" name="select" @change="getWave()" v-model="waveId">
									<option value="" >请选择</option>
									<option v-for="item in waveList" :value="item.value" v-text="item.value"></option>
							</select>
						</div>
						<div class="col-sm-4 col-md-4">
							<button @click="getLast()" class="btn btn-primary" type="button" name="button">获取最新波形</button>
						</div>
				</div>
			</form>
			<div class="chart" ref="chart"></div>
			<p class="tips" v-show="!wave.length">暂无数据！</p>
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
    waveId: '',
    waveList: [],
    wave: [],
    timer: null,
    data: {},
    chart: null
  }),
  created() {
    this.getList()
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
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
        		formatter: "{c} m/s"
					},
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.wave.map(item=>item.y),
            type: 'line',
            smooth: true
          }]
        })
      }
      this.chart.hideLoading();
    },
    async getList() {
      let res = await this.$api.waveList(this.$route.params.id)
      this.waveList = res.data.data.list
    },
    async getWave(id) {
      this.chart.showLoading();
      let waveId = id ? id : this.waveId
			if (waveId) {
				let res = await this.$api.wave(this.$route.params.id, {
	        waveId: waveId
	      })
	      if (res.data.code == 0) {
	        const buffer = base64url.toBuffer(res.data.data);
	        this.wave = parseWave(buffer)
	        this.showChart()
	      }else {
	      	this.chart.hideLoading();
	      }
			}
    },
    async getLast() {
      this.timer = setInterval(() => {
        this.$api.waveList(this.$route.params.id).then(res => {
          this.getWave(res.data.data.list[0].id)
        })
      }, 3000);
    }
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
