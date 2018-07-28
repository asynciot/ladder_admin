<template lang="jade">
div.layout-content-main
	Row(:gutter="8")
		Col.map(span="20")
			div#map
		Col(span="4")
			Table.deviceList(border,:columns="columns",:data="devices",size="small")
</template>

<script>
import {
  api,
  ladderApi,
  formatDate
} from '@/utils'
import r from '@/assets/red.png';
import g from '@/assets/green.png';
import error from '@/assets/error.gif';
import lost from '@/assets/lost.gif';
import open from '@/assets/open.gif';
const createMark = (img) => {
  return new BMap.Icon(img, new BMap.Size(25, 25), {
    anchor: new BMap.Size(10, 26),
    imageSize: new BMap.Size(25, 25),
  });
};
const redMark = createMark(r);
const greenMark = createMark(g);
const errorMark = createMark(error);
const lostMark = createMark(lost);
const openMark = createMark(`@/assets/open.gif?timestamp=${new Date().getTime()}`);
const labelStyle = {
  color: 'black',
  fontSize: '12px',
  borderRadius: '4px',
  height: '16px',
  lineHeight: '12px',
  borderColor: 'black',
  fontFamily: ' 微软雅黑',
};
export default {
  data() {
    const type = {
      'door': '控制器',
      'ctrl': '控制柜',
    };
    const netWork = {
      3: '联通3G',
      40: '移动4G',
      41: '联通4G',
    };
    return {
      option: {
        lon: this.$cookie.get('lng'),
        lat: this.$cookie.get('lat'),
        zoom: this.$cookie.get('zoom') || 9,
      },
      map: null,
      devices: [],
      openAnimateList: [],
      columns: [{
          title: '编号',
          minWidth: 80,
          key: 'deviceId',
          align: 'center',
          render: (h, params) =>
            h('Button', {
              props: {
                type: 'text',
                size: "small",
              },
              style: {
                paddingRight: '4px',
                paddingLeft: '4px',
              },
              on: {
                click: () => {
                  this.$router.push({
                    name: 'device',
                    params: {
                      id: params.row.deviceId,
                      type: params.row.type,
                    }
                  })
                }
              }
            }, params.row.deviceId)
        },
        {
          title: '设备类型',
          minWidth: 30,
          align: 'center',
          key: 'typeId',
          render: (h, params) => {
            return h('p', type[params.row.type] || '-')
          }
        },
      ],
			markerClusterer: null,
			markers: [],
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      let point = new BMap.Point(121.48, 31.22);
      if (this.option.lon && this.option.lat) {
        point = new BMap.Point(this.option.lon, this.option.lat);
      }
      let map = new BMap.Map('map', {
        enableMapClick: false
      });
      map.centerAndZoom(point, this.option.zoom);
      map.addControl(new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        // type: BMAP_NAVIGATION_CONTROL_SMALL,
        enableGeolocation: true,
      }));
      map.addEventListener('tilesloaded', () => {
        this.eventHandler();
      });
      map.addControl(new BMap.ScaleControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT
      }));
      map.addControl(new BMap.OverviewMapControl());
      this.map = map
      this.getList()
      setInterval(() => {
        this.getList()
      }, 60000)
			this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
        markers: this.markers
      });
			this.markerClusterer.setGridSize(90);
      this.markerClusterer.setMinClusterSize(1);
			this.markerClusterer.setMaxZoom(12)
    },
    eventHandler() {
      const center = this.map.getCenter();
      const zoom = this.map.getZoom();
      this.$cookie.set('lat', center.lat)
      this.$cookie.set('lng', center.lng)
      this.$cookie.set('zoom', zoom)
      this.getList()
    },
    async getList() {
      this.openAnimateList.forEach((item) => {
        clearTimeout(item);
      });
      this.openAnimateList = [];
      let res = await this.$api.devices({
        lat1: -4.939958,
        lat2: 61.245268,
        lon1: 77.524303,
        lon2: 132.716194,
        page: 1,
        num: 50
      })
      if (res.data.code == 0) {
        const now = new Date().getTime();
        this.devices = res.data.data.list.map((item) => {
          if (!item.updateTime) {
            item.isLoss = true;
            return item;
          }
          if (now - item.updateTime > 120000) {
            item.isLoss = true;
          } else {
            item.isLoss = false;
          }
          if (item.deviceId.indexOf('test') !== -1) {
            item.isLoss = false;
            item.Alert = '0';
          }
          return item;
        });
      }
      this.addMark()
    },
    addMark() {
      this.map.clearOverlays();
			this.markerClusterer.removeMarkers(this.markers)
			this.markers = []
      this.devices.forEach(item => {
        const point = new BMap.Point(item.longitude, item.latitude);
        let marker = null;
        if (item.isLoss) {
          labelStyle.color = 'red';
          labelStyle.borderColor = 'red';
          marker = new BMap.Marker(point, {
            icon: redMark
          });
        }
        if (!item.isLoss && item.Alert == '0') {
          labelStyle.color = '#55BC52';
          labelStyle.borderColor = '#55BC52';
          marker = new BMap.Marker(point, {
            icon: greenMark
          });
        }
        if (!item.isLoss && item.Alert != '0') {
          labelStyle.color = '#55BC52';
          labelStyle.borderColor = '#55BC52';
          marker = new BMap.Marker(point, {
            icon: lostMark
          });
        }
        if (!item.isLoss && parseInt(item.isOpen) === 1) {
          labelStyle.color = '#55BC52';
          labelStyle.borderColor = '#55BC52';
          marker = new BMap.Marker(point, {
            icon: createMark(`/open.gif?timestamp=${new Date().getTime()}`)
          });
          // const animation = setTimeout(() => {
          //   clearTimeout(animation);
          //   marker = new BMap.Marker(point, {
          //     icon: greenMark
          //   });
          //   marker.addEventListener('click', this.goDevice(item));
          //   map.addOverlay(marker);
          // }, 1500);
          // this.openAnimateList.push(animation);
        }
        const opts = {
          position: point,
          offset: item.Name != undefined && item.Name ? new BMap.Size(-item.Name.length * 5.7, -16) : new BMap.Size(-item.deviceId.length * 3, -16),
        };
        const label = new BMap.Label(item.Name != undefined && item.Name ? item.Name : item.deviceId, opts);
        label.setStyle(labelStyle);
        marker.setLabel(label)
				marker.addEventListener('click', () => this.goDevice(item));
        // this.map.addOverlay(marker);
				// this.map.addOverlay(label);
        this.markers.push(marker)
      })
      this.markerClusterer.addMarkers(this.markers)
    },
    goDevice(data) {
      this.$router.push({
        name: 'device',
        params: {
          id: data.deviceId,
          type: data.type,
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
    height: calc(100vh - 180px);
}
#map {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
