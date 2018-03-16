<template lang="html">
	<section class="row content">
		<div class="col-xs-6 col-sm-6 col-md-5 col-lg-4" style="max-width:420px;">
			<div class="shaft">
        <section>
          <div></div>
        </section>
        <section class="noborder">
          <div></div>
        </section>
        <p></p>
        <div class="shaftinfo">
          <p>关到位输入
            <i :class="{'signal':true, 'ready': state[5] == 1}"></i>
          </p>
          <p>开到位输入
            <i :class="{'signal':true, 'ready': state[7] == 1}"></i>
          </p>
        </div>
      </div>
			<div class="doors">
        <section :style="{'width':`${50*(1 - position/65535)}%`}"></section>
        <section class="doorstitle">
          <div :class="{'screen':state[1] == 1}">
					</div>
          <p>光幕信号</p>
        </section>
        <section :style="{'width':`${50*(1 - position/65535)}%`}"></section>
      </div>
		</div>
		<div class="col-xs-6 col-sm-6 col-md-6 col-lg-5">
			<div class=" door switch">
				<section>
	        <p>门坐标 ：<i class="status" v-text="position"></i></p>
	        <p>门状态 ：<i class="status" v-text="statusName"></i></p>
	        <p>门电流 ：<i class="status" v-text="`${door[2] ? (door[2].value / 1000).toFixed(2) : 0.00}A`"></i></p>
	        <p>报警 ：<i class="status" v-text="alertName(alert)"></i></p>
	      </section>
				<section>
	        <button class="btn btn-primary btn-sm" type="button" @click="refresh()" name="button" :disabled="disabled">刷新</button>
	      </section>
			</div>
			<div class="door">
				<section>
          <p>开减速信号 ：
            <i :class="{'signal':true, 'ready': state[3] == 1}" />
          </p>
          <p>开到位输出信号 ：
            <i :class="{'signal':true, 'ready': state[6] == 1}" />
          </p>
        </section>
        <section>
          <p>关减速信号 ：
            <i :class="{'signal':true, 'ready': state[2] == 1}" />
          </p>
          <p>关到位输出信号 ：
            <i :class="{'signal':true, 'ready': state[4] == 1}" />
          </p>
        </section>
			</div>
		</div>
	</section>
</template>

<script>
const status = ['输入电压过高', '输入电压过低', '输出过流', '电机过载', '飞车保护', '开关门受阻'];
const array2obj = (arr) => {
  const obj = {};
  arr.forEach((item) => {
    obj[item.propertyName] = item;
  });
  return obj;
}
export default {
  data: () => ({
		disabled:false,
    device: {},
    statusName: '',
    state: '',
		alert:'',
		position: 0,
    door: []
  }),
  created() {
    this.getData()
  },
  methods: {
    alertName(bit) {
			console.log(bit);
      if (bit == '0') {
        return '运行正常';
      }
      let hex = (+bit).toString(2);
      while (hex.length < 8) {
        hex = `0${hex}`;
      }
      hex = hex.split('').reverse();
      let alert = '';
      hex.forEach((item, index) => {
        if (item == '1') {
          alert += `${status[index]}、`;
        }
      });
      alert = alert.substring(0, alert.length - 1);
      return alert;
    },
    parseState(val) {
      if (val && val != '0') {
        let bit = (+val).toString(2);
        while (bit.length < 16) {
          bit = `0${bit}`;
        }
        const arr = bit.split('');
        return arr;
      } else {
        return '0000000000000000';
      }
    },
    async getData() {
      let res = await this.$api.deviceInfo(this.$route.params.id)
      this.parseData(res.data.data.list)
    },
    parseData(list) {
      let property = array2obj(list)
      this.device = property
      this.door = [property.Position, property.State, property.Current, property.Alert]
			this.position = property.Position ? property.Position.value : 0;
			this.alert = property.Alert ? property.Alert.value : ''
      const state = this.parseState(property.State ? property.State.value : 0)
      this.state = state
      let statusName = '无状态';
      if (state[13] == 1) {
        statusName = '开门到位维持状态';
      }
      if (state[12] == 1) {
        statusName = '关门到位维持状态';
      }
      if (state[15] == 1) {
        statusName = '开门状态';
      }
      if (state[14] == 1) {
        statusName = '关门状态';
      }
      if (state[11] == 1) {
        statusName = '停止输出状态';
      }
      this.statusName = statusName
    },
    refresh() {
			this.disabled = true
      this.$api.hbp(this.$route.params.id)
      let ws = this.$api.socket({
        deviceId: this.$route.params.id,
        propertyIds: '11,12,13,14',
        delay: 0,
        interval: 1000,
        duration: 30
      })
      console.log(ws);
      if (ws) {
        ws.onmessage = (msg) => {
          try {
            this.parseData(JSON.parse(msg.data).data.list)
          } catch (e) {}
        };
        ws.onopen = (() => {
          let timer = setInterval(() => {
            ws.send('a');
          }, 1000);
          setTimeout(() => {
            ws.close();
						this.disabled = false
            clearInterval(timer);
          }, 30000);
        });
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
    border-top: 0;
}
.shaft {
    border: 2px solid #aaa;
    border-bottom: 1px solid #aaa;
    height: 56px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    position: relative;
}
.shaft section {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #666;
    padding: 11px 11px 0;
}
.shaft div {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #666;
}
.shaft .noborder {
    border-color: transparent;
}
.shaft > p {
    position: absolute;
    top: 19px;
    left: 29px;
    right: 29px;
    border: 1px solid #666;
    height: 16px;
}
.shaft .shaftinfo {
    border: 0;
    position: absolute;
    left: 0;
    bottom: 3px;
    width: 100%;

}
.shaft .shaftinfo p {
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
    background: #CB0C27;
}
.doors {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    border: 3px solid #C6C6C6;
    height: 320px;
    justify-content: space-between;
}
.doors section {
    height: 100%;
    background: url("../../assets/img/ladder-bg.jpg") repeat;
}
.doors p {
    position: absolute;
    width: 10px;
    top: 120px;
    right: 6px;
    font-size: 11px;
}
.doors > section:first-child {
    width: 50%;
    border-right: 1px solid #B8B8B8;
}
.doors > section:last-child {
    width: 50%;
    border-left: 1px solid #B8B8B8;
}
.doors .doorstitle {
    width: 16%;
    height: 100%;
    background: transparent;
    position: absolute;
    left: 42%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
}
.doorstitle div {
    width: 3px;
    max-width: 10px;
    height: 60%;
    margin: auto;
    background: #fff;
}
.screen {
    background: #CB0C27;
}
.ladder {
    max-width: 500px;
    margin: 0 auto;
}
.door {
    background: #FEFCFD;
    box-shadow: 0 0 6px 0 rgba(19, 19, 19, .2);
}
.door {
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 5px 20px;
    section {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }
    p {
        font-size: 13px;
        margin: 0;
        text-align: left;
        line-height: 22px;
    }
    .status {
        color: #289EFC;
        font-style: normal;
    }
    .signal {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #828081;
        border-radius: 50%;
    }
    .ready {
        background: #CB0C27;
    }
}
.switch {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > section:first-child {
        width: 60%;
        // height: 44px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;
    }
    & > section:last-child {
        width: 40%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: flex-end;
    }
}
</style>
