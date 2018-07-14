<template lang="jade">
div.layout-content-main
	div#map
</template>

<script>
import {
  api,
  ladderApi,
  formatDate
} from '@/utils'
import img from '@/assets/green.png'
const mark = new BMap.Icon(img, new BMap.Size(25, 25), {
  anchor: new BMap.Size(10, 26),
  imageSize: new BMap.Size(25, 25),
});
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
    return {
      option: {
        lon: this.$cookie.get('lng'),
        lat: this.$cookie.get('lat'),
        zoom: this.$cookie.get('zoom') || 9,
      },
      map: null,
      devices: [],
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
			map.addEventListener('tilesloaded', () => { this.eventHandler() ;});
      map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_RIGHT}));
      map.addControl(new BMap.OverviewMapControl());
      this.map = map
      this.getList()
    },
		eventHandler() {
			const center = this.map.getCenter();
			const zoom = this.map.getZoom();
			this.$cookie.set('lat', center.lat)
			this.$cookie.set('lng', center.lng)
			this.$cookie.set('zoom', zoom)
		},
    async getList() {
      let res = await this.$api.devices({
        lat1: -4.939958,
        lat2: 61.245268,
        lon1: 77.524303,
        lon2: 132.716194,
        page: 1,
        num: 50
      })
      if (res.data.code ==0) {
      	this.devices = res.data.data.list
      }
			this.addMark()
    },
    addMark() {
      this.devices.forEach(item => {
        const point = new BMap.Point(item.longitude, item.latitude);
        labelStyle.color = '#55BC52';
        labelStyle.borderColor = '#55BC52';
        const marker = new BMap.Marker(point, {
          icon: mark
        });
        const opts = {
          position: point,
          offset: item.Name != undefined && item.Name ? new BMap.Size(-item.Name.length * 5.7, -42) : new BMap.Size(-item.deviceId.length * 3.5, -42),
        };
        const label = new BMap.Label(item.Name != undefined && item.Name ? item.Name : item.deviceId, opts);
				marker.addEventListener('click', ()=>this.goDevice(item));
        label.setStyle(labelStyle);
        this.map.addOverlay(marker);
        this.map.addOverlay(label);
      })
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
#map {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
