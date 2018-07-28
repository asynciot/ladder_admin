<template lang="jade">
div.layout-content-main
	div.form.mb-10.form-detail
		Row.mb-10(:gutter="8")
			Col.padding(span="8")
				Card.card
					p.clearfix(slot="title")
						|基础信息
						span.fr
							RadioGroup(v-if="type=='door'",v-model="mode",@on-change="changeMode")
								Radio(:label="0")
									span|实时
								Radio(:label="1")
									span|历史
					div.control
						span(v-if="!mode")|实时时长：
						span(v-else)|历史记录：
						Select.mr-10(v-if="!mode",size="small",v-model="pick",:style="{width:'150px'}")
							Option(v-for="item in picks",:value="item.value",:key="item.value")|{{item.label}}
						Select.mr-10(v-else,size="small",v-model="historyId",@on-change="getHistory",:style="{width:'150px'}")
							Option(v-for="item in history",:value="item.value",:key="item.value")|{{item.label}}
						i-switch(v-model="open",@on-change="change")
							span(slot='open')|开
							span(slot='close')|关
					Form.status(:model="event",label-position="left",:label-width="75",v-if="type=='door'")
						Row(:gutter="16")
							Col(span="10")
								Form-item(label="门坐标：")
									p(v-text="event.position ? event.position : '无'")
							Col(span="12")
								Form-item(label="门电流：")
									p(v-text="isNaN(event.current) ? '无' : `${event.current} A`")
						//- Row(:gutter="16")
						//- 	Col(span="10")
						//- 		Form-item(label="开门次数：")
						//- 			p(v-text="event.times")
						Row(:gutter="16")
							Col(span="10")
								Form-item(label="开门信号：")
									p(v-text="event.openIn ? '开' : '关'")
							Col(span="10")
								Form-item(label="关门信号：")
									p(v-text="event.closeIn ? '开' : '关'")
						Row(:gutter="16")
							Col(span="22")
								Form-item(label="门状态：")
									p(v-text="parseStatus(event)")
						Row(:gutter="16")
							Col(span="22")
								Form-item(label="开到位输出信号：",:label-width="120")
									p(v-text="event.openToOut ? '开' : '关'")
						Row(:gutter="16")
							Col(span="22")
								Form-item(label="关到位输出信号：",:label-width="120")
									p(v-text="event.closeToOut ? '开' : '关'")
						Row(:gutter="16")
							Col(span="22")
								Form-item(label="报警：",:label-width="60")
									p(v-text="alertName(event)")
						Row(:gutter="16")
							Col(span="22")
								Form-item(label="最后更新时间：",:label-width="110")
									p(v-text="formatDate(property.updateTime, 'yyyy-MM-dd HH:mm')")
					Form.status(:model="event",label-position="left",:label-width="80",v-if="type=='ctrl'")
						Row(:gutter="16")
							Col(span="10")
								Form-item(label="运行信号：")
									p(v-text="event.run ? '运行':'停车'")
							Col(span="10")
								Form-item(label="门锁信号：")
									p(v-text="event.lock ? '通':'断'")
						Row(:gutter="16")
							Col(span="10")
								Form-item(label="按钮信号：")
									p(v-text="event.btn")
							Col(span="12")
								Form-item(label="关门信号：")
									p(v-text="event.close ? '动作':'不动作'")
						Row(:gutter="16")
							Col(span="10")
								Form-item(label="按钮信号：")
									p(v-text="event.btn")
							Col(span="10")
								Form-item(label="电梯模式：")
									p(v-text="event.model")
						Row(:gutter="16")
							Col(span="22")
								Form-item(label="状态：")
									p(v-text="event.status")
						Row(:gutter="16")
							Col(span="22")
								Form-item(label="电梯外已按向上楼层：",:label-width="140")
									p(v-text="event.upCall.toString(' ')")
						Row(:gutter="16")
							Col(span="22")
								Form-item(label="电梯外已按向下楼层：",:label-width="140")
									p(v-text="event.downCall.toString(' ')")
						Row(:gutter="16")
							Col(span="22")
								Form-item(label="最后更新时间：",:label-width="110")
									p(v-text="formatDate(property.updateTime, 'yyyy-MM-dd HH:mm')")
			Col(span="8")
				Card.card.animate
					p(slot="title",v-text="type=='door'?'控制器':'控制柜'")
					div.doors(v-if="type=='ctrl'")
						div.outer
							div.inner
								section
								section
						div.info
							p
								Icon(type="direction[`${event.toDown}${event.toUp}`]")
								i(v-text="event.floor")
							ul
								li(v-for="(item, index) in floors",v-text="item",:key="index",:style="{width:floorWidth(floors.length)}")
					div.shaft(v-if="type=='door'")
						section
							div
						section.noborder
							div
						p
						div.shaftinfo
							p|关到位输入
								i.signal(:class="event.closeTo?'ready':''")
							p|开到位输入
								i.signal(:class="event.openTo?'ready':''")
					div.realdoors(v-if="type=='door'")
						div.doorbox(:style="{ left: `-${(event.position / doorWidth) * 50}%` }")
						section.doorstitle
							div(:class="event.door?'screen':''")
							p|光幕信号
						div.doorbox(:style="{ right: `-${(event.position / doorWidth) * 50}%` }")
			Col.mb-10(span="8",v-for="(item, index) in types[type]",:key="index")
				Card.card
					p.clearfix(slot="title")
						|{{item.label}}图
						i.fr(v-text="`${event[item.key]} ${item.unit?item.unit:''}`")
					canvas(:id="`chart${index}`")
			Col.mb-10(span="10",v-if="type=='ctrl'")
				Card.card.debug-card
					p.clearfix(slot="title")|调试
					Form(:model="form",label-position="left",:label-width="75")
						Form-item.mb-10(label="段地址：")
							ul.ul
								li
									input.input(maxLength="2",:disabled="debug",type="text",v-model="base[0]",@change="(e)=>this.inputChange(e, 'base', 0)")
								li|:
								li
									input.input(maxLength="2",:disabled="debug",type="text",v-model="base[1]",@change="(e)=>this.inputChange(e, 'base', 1)")
							ul.ul
								li
									input.input(maxLength="2",:disabled="debug",type="text",v-model="base[2]",@change="(e)=>this.inputChange(e, 'base', 2)")
								li|:
								li
									input.input(maxLength="2",:disabled="debug",type="text",v-model="base[3]",@change="(e)=>this.inputChange(e, 'base', 3)")
						Form-item.clearfix(label="调试时长：")
							Select.fl.mr-10(v-model="debugInterval",:style="{width:'150px'}",:disabled="debug")
								Option(v-for="item in picks",:value="item.value",:key="item.value")|{{item.label}}
							i-switch.fr(v-model="debug",@on-change="debugChange")
								span(slot='open')|开
								span(slot='close')|关
						Form-item(label="调试时长：")
							Checkbox(v-model="checked",@on-change="checkChange")|连续
					div.offsets
						ul.ul
							li
								input.input(maxLength="2",:disabled="debug",type="text",v-model="offsets[0]",@change="(e)=>this.inputChange(e, 'offsets', 0)",@blur="(e)=>inputOffset(e, 'offsets', 0)")
							li|:
							li
								input.input(maxLength="2",:disabled="debug",type="text",v-model="offsets[1]",@change="(e)=>this.inputChange(e, 'offsets', 1)",@blur="(e)=>inputOffset(e, 'offsets', 1)")
						ul.ul
							li
								input.input(maxLength="2",:disabled="checked||debug",type="text",v-model="offsets[2]",@change="(e)=>this.inputChange(e, 'offsets', 2)")
							li|:
							li
								input.input(maxLength="2",:disabled="checked||debug",type="text",v-model="offsets[3]",@change="(e)=>this.inputChange(e, 'offsets', 3)")
						ul.ul
							li
								input.input(maxLength="2",:disabled="checked||debug",type="text",v-model="offsets[4]",@change="(e)=>this.inputChange(e, 'offsets', 4)")
							li|:
							li
								input.input(maxLength="2",:disabled="checked||debug",type="text",v-model="offsets[5]",@change="(e)=>this.inputChange(e, 'offsets', 5)")
						ul.ul
							li
								input.input(maxLength="2",:disabled="checked||debug",type="text",v-model="offsets[6]",@change="(e)=>this.inputChange(e, 'offsets', 6)")
							li|:
							li
								input.input(maxLength="2",:disabled="checked||debug",type="text",v-model="offsets[7]",@change="(e)=>this.inputChange(e, 'offsets', 7)")
						ul.ul
							li
								input.input(maxLength="2",:disabled="checked||debug",type="text",v-model="offsets[8]",@change="(e)=>this.inputChange(e, 'offsets', 8)")
							li|:
							li
								input.input(maxLength="2",:disabled="checked||debug",type="text",v-model="offsets[9]",@change="(e)=>this.inputChange(e, 'offsets', 9)")
						ul.ul
							li
								input.input(maxLength="2",:disabled="checked||debug",type="text",v-model="offsets[10]",@change="(e)=>this.inputChange(e, 'offsets', 10)")
							li|:
							li
								input.input(maxLength="2",:disabled="checked||debug",type="text",v-model="offsets[11]",@change="(e)=>this.inputChange(e, 'offsets', 11)")
						ul.ul
							li
								input.input(maxLength="2",:disabled="checked||debug",type="text",v-model="offsets[12]",@change="(e)=>this.inputChange(e, 'offsets', 12)")
							li|:
							li
								input.input(maxLength="2",:disabled="checked||debug",type="text",v-model="offsets[13]",@change="(e)=>this.inputChange(e, 'offsets', 13)")
					div.debug
						div
							ul.ul.detail
								li(v-text="debugData[0]")
								li
								li(v-text="debugData[1]")
							ul.ul.detail
								li(v-text="debugData[2]")
								li
								li(v-text="debugData[3]")
						div
							ul.ul.detail
								li(v-text="debugData[4]")
								li
								li(v-text="debugData[5]")
							ul.ul.detail
								li(v-text="debugData[6]")
								li
								li(v-text="debugData[7]")
			Col.mb-10(span="8")
				Card.card
					p.clearfix(slot="title")|报表
					Form(:model="data",label-position="left",:label-width="75")
						Form-item(label="时间段：")
							Select.fl.mr-10(:style="{width:'150px'}",@on-change="changeDate")
								Option(v-for="item in dataRange",:value="item.value",:key="item.value")|{{item.label}}
					Form.status(:model="statistics",label-position="left",:label-width="75")
						Row(:gutter="16")
							Col(span="8")
								Form-item(label="故障数量：")
									p(v-text="statistics.error")
							Col(span="8")
								Form-item(label="报警数量：")
									p(v-text="statistics.error")
							Col(span="8",v-if="type == 'door'")
								Form-item(label="控制器：")
									p(v-text="statistics.door")
							Col(span="8",v-else)
								Form-item(label="控制柜：")
									p(v-text="statistics.ctrl")
					p.chart-title|警报统计
					canvas(id="alertChart")
					p.chart-title|错误统计
					canvas(id="errorChart")
</template>

<script>
import F2 from '@antv/f2';
import Tooltip from '@antv/f2/lib/plugin/tooltip'
import StringMask from 'string-mask';
import {
  api,
  ladderApi,
  formatDate,
  array2obj,
  buffer2hex,
  parseBuffer,
  parseEvent,
  parseInfo,
  parseMsg
} from '@/utils'
const data = [{
  time: 0,
  value: 0,
}]
const formatter = new StringMask('AA,AA,AA,AA,AA,AA,AA,AA,AA,AA,AA,AA,AA,AA,AA,AA');
const pattern = /^[0-9a-fA-f]+$/
const randomHexColor = () => { // 随机生成十六进制颜色
  let hex = Math.floor(Math.random() * 11777216).toString(16); // 生成ffffff以内16进制数
  while (hex.length < 6) { // while循环判断hex位数，少于6位前面加0凑够6位
    hex = `0${hex}`;
  }
  return `#${hex}`; // 返回‘#'开头16进制颜色
};
F2.Animate.registerAnimation('lineUpdate', function(updateShape, animateCfg) {
  var cacheShape = updateShape.get('cacheShape'); // 该动画 shape 的前一个状态
  var cacheAttrs = cacheShape.attrs; // 上一个 shape 属性
  var oldPoints = cacheAttrs.points; // 上一个状态的关键点
  var newPoints = updateShape.attr('points'); // 当前 shape 的关键点

  var oldLength = oldPoints.length;
  var newLength = newPoints.length;
  var deltaLength = newLength - oldLength;

  var lastPoint = newPoints[newPoints.length - 1];
  for (var i = 0; i < deltaLength; i++) {
    oldPoints.push(lastPoint);
  }

  updateShape.attr(cacheAttrs);
  updateShape.animate().to({
    attrs: {
      points: newPoints
    },
    duration: 800,
    easing: animateCfg.easing
  });
});
export default {
  created() {
    this.getData()
  },
  data() {
    return {
			data: {
				date: []
			},
			dataRange: [{
        label: '1天',
        value: 1,
      }, {
        label: '7天',
        value: 7,
      }, {
        label: '30天',
        value: 30,
      }],
      mode: 0,
      debug: false,
      debugInterval: 30,
      debugList: [],
      debugData: ['', '', '', '', '', '', '', '', ],
      playDebugTimer: null,
      checked: false,
      form: {},
      offsetIdx: [],
      offsets: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
      base: ['', '', '', '', '', '', '', '', ],
      history: [],
      historyId: '',
      historyEvens: [],
      historyInterval: 0,
      historyTimer: null,
      startTime: '',
      types: {
        ctrl: [{
          key: 'run',
          label: '运行信号'
        }, {
          key: 'lock',
          label: '门锁信号'
        }, {
          key: 'open',
          label: '开门信号'
        }, {
          key: 'close',
          label: '关门信号'
        }],
        door: [{
          key: 'speed',
          label: '速度',
          unit: 'm/s'
        }, {
          key: 'current',
          label: '电流',
          unit: 'A'
        }, {
          key: 'position',
          label: '位置'
        }, {
          key: 'door',
          label: '门光幕'
        }, {
          key: 'openIn',
          label: '开门输入'
        }, {
          key: 'closeIn',
          label: '关门输入'
        }, {
          key: 'openTo',
          label: '开到位输入'
        }, {
          key: 'closeTo',
          label: '关到位输入'
        }, {
          key: 'openSlow',
          label: '开减速输入'
        }, {
          key: 'closeSlow',
          label: '关减速输入'
        }, {
          key: 'openToOut',
          label: '开到位输出'
        }, {
          key: 'closeToOut',
          label: '关到位输出'
        }],
      },
      direction: {
        '01': 'arrow-up-c',
        '10': 'arrow-down-c',
        '00': '',
        '11': '',
      },
      pick: 30,
      picks: [{
        label: '30s',
        value: 30,
      }, {
        label: '60s',
        value: 60,
      }, {
        label: '90s',
        value: 90,
      }],
      canvas: [],
      canvasData: [],
      open: false,
      id: this.$route.params.id,
      type: this.$route.params.type,
      api: api,
      ladderApi: ladderApi,
      property: {},
      timer: null,
      play: null,
      doorWidth: 4096,
      event: {
        downCall: [],
        upCall: []
      },
      floors: [],
      opt: {
        threshold: 15,
        duration: 30
      },
      ws: null,
      eventList: [],
      startId: 0,
      isEnd: true,
      debugSocket: null,
      errorChart: null,
			alertChart: null,
			statistics: {
	    	error: 0,
	    	alert: 0,
	    	door: 0,
	    	ctrl: 0,
	    },
    }
  },
  mounted() {
    this.types[this.type].forEach((item, index) => {
      this.initChart(index)
    })
    this.initDataChart('errorChart')
		this.initDataChart('alertChart')
    this.setTime(true)
  },
  methods: {
    initDataChart(val) {
      var chart = new F2.Chart({
        id: val,
        pixelRatio: window.devicePixelRatio,
				plugins: Tooltip
      });
      chart.source([{
        title: formatDate(new Date(), 'MM-dd'),
        value: 0
      }], {
        sales: {
          tickCount: 5
        }
      });
      chart.tooltip(true);
			chart.interval().position('title*value');
			chart.render();
      this[val] = chart
    },
		async changeDate(val) {
			let statistics = Object.assign({}, this.statistics), alertList = [],errorList = [], date= [];
			let res = await this.$api.staticts({
				days: val,
				id: this.id,
				datail: true,
				page:1,
				num: 30,
				type: this.type =='door' ? 0:1
			})
			if (res.data.code == 0) {
				statistics.door = res.data.data.count[0] || 0;
        statistics.ctrl = res.data.data.count[1] || 0;
				date = Object.keys(res.data.data.list);
				date.length == 0 ? date = [formatDate(new Date(), "MM-dd")] : '';
				let error = 0, alert = 0, errorList = [], alertList = [];
				Object.values(res.data.data.list).forEach((item,index) => {
          const door = item[0] || { 0:0, 1:0 };
          const ctrl = item[1] || { 0:0, 1:0 };
          alert += (ctrl[0]||0 + door[0]||0);
          error += (ctrl[1]||0 + door[1]||0);
          alertList.push({title: date[index], value: (ctrl[0]||0 + door[0]||0)});
          errorList.push({title: date[index], value: (ctrl[1]||0 + door[1]||0)});
        });
				statistics.error = error;
        statistics.alert = alert;
			}

			errorList.length == 0 ? errorList = [{ title: date[0], value: 0}]:'';
			alertList.length == 0 ? alertList = [{ title: date[0], value: 0}]:'';
			this.statistics = statistics
			this.errorChart.changeData(errorList)
			this.alertChart.changeData(alertList)
		},
    parseDebug(property) {
      let debugList = [].concat(this.debugList);
      const start = parseInt(property.StartId);
      const count = parseInt(property.Count);
      const end = debugList.length ? debugList[debugList.length - 1].startId : -1;
      if (start + count <= end) return;
      if (property.Events) {
        const buffer = base64url.toBuffer(property.Events);
        for (let index = 0; index < count; index++) {
          if ((start + index) > end) {
            const debugBuffer = buffer.slice(index * 8, (index + 1) * 8);
            let arr = [];
            debugBuffer.forEach((item) => {
              item = item.toString(16)
              item.length == 1 ? item = `0${item}` : null;
              arr = arr.concat(item);
            });
            const obj = {
              startId: start + index,
              data: arr,
            };
            debugList.push(obj);
          }
        }
        this.debugList = debugList
      }
    },
    async debugWs(base, offsets) {
      const random = parseInt(Math.random() * 1000)
      const form = {
        deviceId: this.id,
        delay: 0,
        interval: 100,
        duration: 30,
        threshold: 50,
        monitorId: random,
        base: base,
        offsets: offsets,
      }
      let ws = new WebSocket(this.$api.debug(form))
      setTimeout(() => {
        if (ws) {
          ws.close();
        }
        this.debug = false
      }, parseInt(this.debugInterval) * 1000);
      if (ws) {
        this.debugSocket = ws
        ws.onerror = (error) => {
          this.debug = false
          ws.close()
          return this.$Notice.error({
            title: '错误',
            desc: '内存诊断失败!'
          })
        }
        ws.onmessage = (msg) => {
          try {
            const data = JSON.parse(msg.data)
            if (data.code == 677) {
              ws.close()
              return this.$Notice.error({
                title: '错误',
                desc: '内存诊断正在使用中!'
              })
            }
            if (data.Events) {
              this.parseDebug(data)
            }
          } catch (e) {
            console.error(e);
          }
        };
        ws.onopen = (() => {
          this.playDebugTimer = setInterval(() => {
            this.playDebugMsg();
          }, 100);
        });
        ws.onclose = (() => {
          this.debug = false
					this.debugList = []
          clearInterval(this.playDebugTimer);
        });
      }
    },
    playDebugMsg() {
      let debug = null
      const lastId = this.debugList.length ? this.debugList[this.debugList.length - 1].startId : 0;
      debug = this.debugList.shift();
      if (debug) {
        let data = ['', '', '', '', '', '', '', '', ];
        if (!this.checked && this.offsetIdx.length) {
          this.offsetIdx.forEach((item, index) => {
            data[item - 1] = debug.data[index]
          })
          this.debugData = data
        } else {
          this.debugData = debug.data
        }
      }
    },
    debugChange(val) {
      let baseVal = '',
        offsetsVal = '';
      let offsetIdx = [];
      let isNotFull = false
      this.base.forEach((item, index) => {
        if ((+index + 1) % 2 == 0) {
          if (this.base[index - 1] != '' || this.base[index] != '') {
            this.base[index - 1] == '' ? this.base[index - 1] = '00' : null;
            this.base[index] == '' ? this.base[index] = '00' : null;
            baseVal += (this.base[index - 1] + this.base[index]);
          }
        }
      })
      if (!this.checked) {
        this.offsets.forEach((item, index) => {
          if ((+index + 1) % 2 == 0) {
            if (this.offsets[index - 1] == '' && this.offsets[index]) {
              isNotFull = true
            }
            if (this.offsets[index - 1] && this.offsets[index] == '') {
              isNotFull = true
            }
          }
          if (item != '') {
						const val = Math.ceil((+index + 1) / 2)
            let i = offsetIdx.findIndex(idx => val == idx)
            if (i == -1) {
              offsetIdx.push(val)
            }
            offsetsVal += item
          }
        })
      } else {
        if (this.offsets[1] != '' || this.offsets[0] != '') {
          this.offsets[1] == '' ? this.offsets[1] = '00' : null;
          this.offsets[0] == '' ? this.offsets[0] = '00' : null;
        }
        const first = this.offsets[0] + this.offsets[1];
        let num = Number(`0x${first}`);
        offsetsVal = first;
        if (first == '') {
          setTimeout(() => {
            this.debug = false
          }, 100)

          return this.$Notice.error({
            title: '错误',
            desc: '请输入偏移量!'
          })
        } else {
          if (first != 'ffff') {
            let i = 1;
            while (i < 8) {
              num++;
              let str = num.toString(16)
              while (str.length < 4) {
                str = '0' + str;
              }
              offsetsVal += str;
              i++;
            }
            this.offsets = formatter.apply(offsetsVal).split(',')
          }
        }
      }
      if (baseVal == '' || baseVal.length < 8) {
        setTimeout(() => {
          this.debug = false
        }, 100)
        return this.$Notice.error({
          title: '错误',
          desc: '请输入段地址!'
        })
      }
      if (offsetsVal == '' || isNotFull) {
        setTimeout(() => {
          this.debug = false
        }, 100)
        return this.$Notice.error({
          title: '错误',
          desc: '请输入偏移量!'
        })
      }
      if (!val) {
        clearInterval(this.playDebugTimer)
        this.debugSocket.close();
				this.debugList = []
      } else {
				this.debugData = ['','','','','','','','',]
        this.offsetIdx = offsetIdx
        this.debugWs(baseVal, offsetsVal)
      }
    },
    inputChange(e, name, index) {
      if (pattern.test(e.target.value) || e.target.value == '') {
        this.$set(this[name], index, e.target.value)
      } else {
        this.$set(this[name], index, '')
      }
    },
    inputOffset(e, val, index) {
      let arr = [].concat(this[val])
      if (val == 'offsets' && index <= 1 && this.checked) {
        let offsetsVal = '';
        if (arr[1] != '' || arr[0] != '') {
          arr[1] == '' ? arr[1] = '00' : null;
          arr[0] == '' ? arr[0] = '00' : null;
        }
        const first = arr[0] + arr[1];
        let num = Number(`0x${first}`);
        offsetsVal = first;
        if (first == '') {
          return;
        } else {
          if (first != 'ffff') {
            let i = 1;
            while (i < 8) {
              num++;
              let str = num.toString(16)
              while (str.length < 4) {
                str = '0' + str;
              }
              offsetsVal += str;
              i++;
            }
            arr = formatter.apply(offsetsVal).split(',')
          }
          this.offsets = arr
        }
      }
    },
    checkChange(val) {
      let offsets = [];
      let arr = [].concat(this.offsets)
      if (val) {
        let offsetsVal = '';
        if (arr[1] != '' || arr[0] != '') {
          arr[1] == '' ? arr[1] = '00' : null;
          arr[0] == '' ? arr[0] = '00' : null;
        }
        const first = arr[0] + arr[1];
        let num = Number(`0x${first}`);
        offsetsVal = first;
        if (first == '') {
          return;
        } else {
          if (first != 'ffff') {
            let i = 1;
            while (i < 8) {
              num++;
              let str = num.toString(16)
              while (str.length < 4) {
                str = '0' + str;
              }
              offsetsVal += str;
              i++;
            }
            arr = formatter.apply(offsetsVal).split(',')
          }
        }
      } else {
        arr = this.offsets.map((item, index) => {
          item = ''
          return item
        })
      }
      this.offsets = arr
    },
    async getHistory(id) {
      if (!id) return;
      this.clear()
      let res = await this.$api.getHistory(this.id, {
        id: id
      })
      let property = array2obj(res.data.list)
      let arr = [],
        list = [];
      if (property.Events) {
        const buffer = base64url.toBuffer(property.Events.value);
        const length = buffer.length / 8;
        for (let index = 0; index < length; index++) {
          const eventBuffer = buffer.slice(index * 8, (index + 1) * 8);
          let arr = [];
          eventBuffer.forEach((item) => {
            arr = arr.concat(parseBuffer(item));
          });
          list.push(parseEvent(arr));
        }
        this.historyEvens = list
        this.historyInterval = parseInt(property.Interval.value)
        this.startTime = this.history.filter(item => item.value === id)[0].time
      }
    },
    playHistory(val) {
      if (val) {
        this.historyTimer = setInterval(() => {
          this.historyData()
        }, this.historyInterval * 2)
      } else {
        clearInterval(this.historyTimer)
      }
    },
    historyData() {
      if (this.canvasData[0] == null) {
        this.canvasData[0] = []
      }
      let idx = this.canvasData[0].length
      if (idx < this.historyEvens.length) {
        this.playEvent();
      } else {
        clearInterval(this.historyTimer)
        this.open = false
      }
    },
    async changeMode(val) {
      this.clear()
      if (val) {
        this.setTime(false)
        let res = await this.$api.deviceHistory(this.id, {
          propertyIds: 38,
          num: 10
        })
        this.history = res.data.data.list.map(item => ({
          value: item.id,
          time: item.createTime,
          label: formatDate(item.createTime, 'yyyy-MM-dd HH:mm:ss')
        }))
      } else {
        this.setTime(true)
      }
    },
    floorWidth(length) {
      const int = parseInt(length / 15);
      switch (int) {
        case 1:
          return '50%'
          break;
        case 2:
          return '30%'
          break;
        case 3:
          return '25%'
          break;
        case 4:
          return '20%'
          break;
        case 5:
          return '15%'
          break;
        default:
          return '50%'
          break;
      }
    },
    formatDate(val, format) {
      return formatDate(val, format)
    },
    alertName(event) {
      if (event.isLoss) {
        return '无';
      }
      let str = '';
      if (event.inHigh) {
        str += ' 输入电压过高 ';
      }
      if (event.inLow) {
        str += ' 输入电压过低 ';
      }
      if (event.outHigh) {
        str += ' 输出过流 ';
      }
      if (event.motorHigh) {
        str += ' 电机过载 ';
      }
      if (event.flySafe) {
        str += ' 飞车保护 ';
      }
      if (event.closeStop) {
        str += ' 开关门受阻 ';
      }
      if (str === '') {
        str = '运行正常';
      }
      return str;
    },
    parseStatus(event) {
      let statusName = '无';
      if (event.openKeep) {
        statusName = '开门到位维持';
      }
      if (event.closeKeep) {
        statusName = '关门到位维持';
      }
      if (event.open) {
        statusName = '正在开门';
      }
      if (event.close) {
        statusName = '正在关门';
      }
      if (event.stop) {
        statusName = '停止输出';
      }
      return statusName
    },
    async getData(val = false) {
      let response = await this.$api.deviceInfo(this.id)
      if (response.data.code === 0) {
        let event = {};
        let property = array2obj(response.data.data.list);
        let arr = [];
        if (property.Event) {
          const buffer = base64url.toBuffer(property.Event.value);
          buffer.forEach((item) => {
            arr = arr.concat(parseBuffer(item));
          });
          property.updateTime = property.Event.updateTime
        }
        const now = new Date().getTime();
        let isLoss = false;
        if (!property.Event || !property.Event.updateTime) {
          isLoss = true;
        } else if (now - property.Event.updateTime > 120000) {
          isLoss = true;
        } else {
          isLoss = false;
        }
        if (this.type == 'door') {
          event = parseEvent(arr)
          let doorWidth = 4096;
          if (property.MaxDoorPos && property.MaxDoorPos.value && parseInt(property.MaxDoorPos.value) != 0) {
            this.doorWidth = parseInt(property.MaxDoorPos.value);
          }
        }
        if (this.type == 'ctrl') {
          event = parseInfo(arr)
          let floorMax = 0,
            floors = [];
          if (property.MaxFloorNum && property.MaxFloorNum.value && parseInt(property.MaxFloorNum.value) != 0) {
            floorMax = parseInt(property.MaxFloorNum.value);
          }
          if (property.FloorNames && property.FloorNames.value.match(/\d+/g)) {
            const floorsStr = property.FloorNames.value;
            const l = floorsStr.length / 3;
            for (let i = 0; i < l; i++) {
              floors.push((`${floorsStr[i*3]}${floorsStr[i*3+1]}${floorsStr[i*3+2]}`).trim())
            }
          } else {
            floors = new Array(floorMax).fill(0).map((item, index) => 1 + index)
          }
          event.floor = floors[event.floor - 1];
          this.floors = floors.reverse()
        }
        event.isLoss = isLoss;
        this.event = event
        this.property = property
        if (val) {
          this.playEvent(event)
        }
      }
    },
    initChart(id) {
      const chart = new F2.Chart({
        id: `chart${id}`,
        // width: 350,
        height: 260,
        pixelRatio: window.devicePixelRatio, // 指定分辨率
        animate: false,
        // padding: [18, 12, 20, 30],
      });
      if (this.type == 'door' && id <= 2) {
        chart.source(data, {
          time: {
            type: 'timeCat',
            mask: 'ss.S',
            tickCount: 5,
            range: [0, 1],
          },
          value: {
            type: 'linear',
            tickCount: 2,
          }
        });
      } else {
        chart.source(data, {
          time: {
            type: 'timeCat',
            mask: 'ss.S',
            tickCount: 4,
            range: [0, 1]
          },
          value: {
            type: 'linear',
            tickCount: 2,
            min: 0,
            max: 1,
            range: [0, 1],
          }
        });
      }
      chart.axis('time', {
        position: 'bottom',
        label: function label(text, index, total) {
          var textCfg = {
            text: ''
          };
          if (index === 0) {
            textCfg.textAlign = 'left';
            textCfg.text = text;
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
            textCfg.text = text;
          }
          return textCfg;
        }
      });
      chart.line({
        sortable: false,
      }).position('time*value').color(randomHexColor()).animate({
        update: {
          animation: 'lineUpdate'
        }
      });
      chart.render();
      this.canvas[id] = chart;
    },
    setTime(val) {
      if (val) {
        this.timer = setInterval(() => {
          this.getData(true)
        }, parseInt(this.pick) * 1000)
      } else {
        clearInterval(this.timer)
      }
    },
    playEvent(data) {
      let time = new Date().getTime(),
        time1 = '',
        arr = [],
        arr1 = [];
      if (this.mode) {
        let idx = this.canvasData[0].length
        data = this.historyEvens[idx]
        time = this.startTime + (this.historyInterval * idx / 2) - this.historyInterval;
        arr = [data.speed, data.current, data.position, data.door, data.openIn, data.closeIn, data.openTo, data.closeTo, data.openSlow, data.closeSlow, data.openToOut, data.closeToOut];
        this.event = data
        if (idx + 2 < this.historyEvens.length) {
          data = this.historyEvens[idx + 1]
          time1 = this.startTime + (this.historyInterval * idx / 2);
          arr1 = [data.speed, data.current, data.position, data.door, data.openIn, data.closeIn, data.openTo, data.closeTo, data.openSlow, data.closeSlow, data.openToOut, data.closeToOut];
        }
      } else {
        arr = this.type == 'ctrl' ? [data.run, data.lock, data.open, data.close] : [data.speed, data.current, data.position, data.door, data.openIn, data.closeIn, data.openTo, data.closeTo, data.openSlow, data.closeSlow, data.openToOut, data.closeToOut];
      }
      const length = this.types[this.type].length
      for (let idx = 0; idx < length; idx++) {
        if (this.canvasData[idx] == null) {
          this.canvasData[idx] = []
        }
        this.canvasData[idx].push({
          time,
          value: arr[idx],
        });
        if (arr1.length && time1) {
          this.canvasData[idx].push({
            time1: time1,
            value: arr1[idx],
          });
        }
      }
      if (this.canvasData[0].length > 200) {
        for (let idx = 0; idx < length; idx++) {
          this.canvasData[idx].splice(0, 1);
        }
      }
      for (let idx = 0; idx < length; idx++) {
        this.canvas[idx].changeData(this.canvasData[idx]);
      }
    },
    async change(val) {
      if (val) {
        this.clear()
        if (this.mode) {
          this.playHistory(true)
          return;
        }
        this.setTime(false)
        const num = parseInt(Math.random() * 1000)
        let res = await this.$api.monitor({
          id: this.id,
          num: num
        }, this.opt)
        if (res.data.code == 0) {
          let ws = new WebSocket(this.$api.ws({
            deviceId: this.id,
            delay: 0,
            interval: 100,
            duration: 30,
            monitorId: num,
          }))
          setTimeout(() => {
            if (ws) {
              ws.close();
            }
            this.open = false
            this.isEnd = true;
          }, parseInt(this.pick) * 1000);
          if (ws) {
            ws.onerror = (error) => {
              ws.close()
            }
            ws.onmessage = (msg) => {
              try {
                const data = JSON.parse(msg.data)
                if (data.Events) {
                  this.parseMsg(data)
                }
              } catch (e) {
                console.error(e);
              }
            };
            ws.onopen = (() => {
              this.isEnd = false
              this.clear();
              this.play = setInterval(() => {
                this.playMsg();
              }, 100);
            });
            ws.onclose = (() => {
              this.eventList = []
              this.idEnd = true
              clearInterval(this.play);
              this.setTime(true)
            });
            this.ws = ws
          }
        }
      } else {
        if (this.mode) {
          this.playHistory(false)
          return;
        }
        if (this.ws) {
          this.ws.close()
        }
      }
    },
    parseMsg(property) {
      let eventList = [].concat(this.eventList)
      const start = parseInt(property.StartId);
      const count = parseInt(property.Count);
      const end = eventList.length ? eventList[eventList.length - 1].startId : -1;
      if (start + count <= end) return;
      const buffer = base64url.toBuffer(property.Events);
      for (let index = 0; index < count; index++) {
        if ((start + index) > end) {
          const eventBuffer = this.type == 'ctrl' ? buffer.slice(index * 33, (index + 1) * 33) : buffer.slice(index * 8, (index + 1) * 8);
          let arr = [];
          eventBuffer.forEach((item) => {
            arr = arr.concat(parseBuffer(item));
          });
          let obj = {}
          if (this.type == 'ctrl') {
            obj = parseMsg(arr, this.floors);
          }
          if (this.type == 'door') {
            obj = parseEvent(arr);
          }
          obj.startId = start + index;
          eventList.push(obj);
        }
      }
      this.eventList = eventList
    },
    playMsg() {
      let eventList = [].concat(this.eventList)
      const lastId = eventList.length ? eventList[eventList.length - 1].startId : 0;
      if (lastId > this.canvasData[0].length) {
        event = this.eventList.shift();
        this.event = event
        this.playEvent(event);
      } else if (lastId == 0 && this.canvasData[0].length && this.isEnd) {
        clearInterval(this.play);
      }
    },
    clear() {
      this.canvas.forEach((item, index) => {
        this.canvasData[index] = []
        item.clear()
        item.source(data)
        item.line({
          sortable: false,
        }).position('time*value').color(randomHexColor()).animate({
          update: {
            animation: 'lineUpdate'
          }
        });
        item.render()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
    min-height: 340px;
    .fr {
        font-style: normal;
        color: #289efc;
    }
}
.status {
    p {
        color: #289efc;
    }
}
.control {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 6px;
    & > span {
        font-size: 12px;
    }
}
.doors {
    max-width: 330px;
    display: flex;
    flex-flow: row;
    background-color: #EEEEEE;
}
.outer {
    background: url("../../assets/ladder-bg.jpg") repeat;
    width: 68%;
    height: 230px;
    padding: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, .5) inset;
}
.inner {
    position: relative;
    height: 200px;
    border: 1px solid #333;
    section {
        position: absolute;
        width: 50%;
        height: 100%;
        left: 0;
        background: url("../../assets/ladder-bg.jpg") repeat;
    }
    & > section:nth-child(2) {
        left: 50%;
        right: 0;
        border-left: 1px solid #666;
    }
}
.info {
    width: 32%;
    display: flex;
    flex-flow: column;
    padding-bottom: 6px;
    p {
        margin: 0;
        padding: 0;
        display: flex;
        flex-flow: row wrap;
        color: #D72800;
        font-size: 26px;
        font-weight: bold;
        height: 40px;
        line-height: 40px;
        i {
            font-style: normal;
            width: 50%;
            text-align: center;
        }
        .icon {
            height: 40px;
            line-height: 40px;
        }
    }
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        width: 100%;
        height: 184px;
        display: flex;
        flex-flow: row wrap;
        li {
            font-size: 12px;
            margin: 0;
            padding: 0;
            width: 50%;
            text-align: center;
            color: #999;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
canvas {
    width: 85%;
}
.shaft {
    max-width: 320px;
    margin-top: -10px;
    border: 2px solid #aaa;
    border-bottom: 1px solid #aaa;
    height: 56px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    position: relative;
    section {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #666;
        padding: 11px 11px 0;
    }
    div {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid #666;
    }
    .noborder {
        border-color: transparent;
    }
    & > p {
        position: absolute;
        top: 19px;
        left: 29px;
        right: 29px;
        border: 1px solid #666;
        height: 16px;
    }
    .shaftinfo {
        border: 0;
        position: absolute;
        left: 0;
        bottom: 3px;
        width: 100%;
        p {
            display: inline-block;
            width: 45%;
            font-size: 11px;
            line-height: 12px;
            margin: 0;
            text-align: right;
        }
        .signal {
            display: inline-block;
            width: 8px;
            height: 8px;
            line-height: 12px;
            background: #828081;
            border-radius: 50%;
        }
        .ready {
            background: #21B923;
        }
    }
}
.realdoors {
    max-width: 320px;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    border: 3px solid #C6C6C6;
    height: 220px;
    justify-content: space-between;
    overflow: hidden;
    .doorbox {
        position: absolute;
        width: 50%;
        height: 100%;
        background: url("../../assets/ladder-bg.jpg") repeat;
        background-size: 100% 100%;
    }
    & > .doorbox:first-child {
        left: 0;
        border-right: 1px solid #B8B8B8;
    }
    & > .doorbox:last-child {
        right: 0;
        border-left: 1px solid #B8B8B8;
    }
    .doorstitle {
        width: 16%;
        height: 100%;
        background: transparent;
        position: absolute;
        left: 42%;
        z-index: 8;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        div {
            width: 6px;
            max-width: 10px;
            height: 60%;
            margin: auto;
            border: 1px solid #eaeaea;
            background: #fff;
        }
        .screen {
            background: #21B923;
        }
    }
    p {
        position: absolute;
        width: 10px;
        top: 70px;
        right: 6px;
        font-size: 11px;
    }
}
.ul {
    list-style: none;
    display: inline-block;
    padding: 0;
    width: 40%;
    text-align: center;
    z-index: 5;
    margin-top: 8px;
    li {
        position: relative;
        display: inline-block;
    }
    & > li:nth-child(1),
    & > li:nth-child(3) {
        width: 36px;
        height: 36px;
        border: 1px solid #eaeeea;
        background: #fff;
        vertical-align: middle;
        text-align: center;
        // word-spacing: 8px;
        letter-spacing: 1px;
        line-height: 36px;
        font-size: 16px;
    }
    & > li:nth-child(2) {
        display: inline-block;
        width: 20px;
        height: 36px;
        line-height: 36px;
        vertical-align: middle;
        text-align: center;
        font-size: 18px;
    }
}
.offsets {
    .ul {
        width: 33%;
    }
}
.detail {
    width: 50%;
}
.addr {
    padding: 0;
    margin-bottom: 0;
}
.input {
    // color: transparent;
    // transform: scale(0);
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // opacity: 0;
    z-index: 10;
    font-size: 14px;
    outline: none;
    border: 0;
    text-align: center;
    background: transparent;
    letter-spacing: 1px;
}
.center {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
}
.debug {
    margin-top: 8px;
    border-radius: 3px;
    border: 1px solid #ccc;
    padding-bottom: 8px;
}
.debug-card {
    max-width: 460px;
}
input[disabled] {
    color: #999;
}
.chart-title {
	font-size: 12px;
	padding-left: 8px;
}
</style>
