<template lang="html">
<!-- Main content -->
<section class="content">
    <div class="row">
        <div class="col-sm-8 no-padding-right">
            <div class="box no-margin map-content">
							<div :style="{'height':`${clientHeight-183}px`}" id="map"></div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="box no-margin">
                <div class="box-header with-border">
                    <h4 class="box-title">请从下面列表选择电梯</h4>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-4 no-padding-right">
                            <input type="text" class="form-control input-sm" placeholder="电梯工号">
                        </div>
                        <div class="col-md-4 no-padding-right">
                            <input type="text" class="form-control input-sm" placeholder="具体别名">
                        </div>
                        <div class="col-sm-4 no-padding-right">
                            <button class="btn btn-primary btn-sm">搜索</button>
                        </div>
                    </div>
                    <hr class="mt10 mb10">
										<v-table
												class="mb10 table-height"
												row-hover-color="#eaeaea"
												is-vertical-resize
												is-horizontal-resize
												:height="clientHeight-333"
												style="width:100%"
												:row-click="detail"
												:is-loading="loading"
												:columns="columns"
												:table-data="list"
												@on-custom-comp="getList"
										/>
										<div class="tr">
											<v-pagination
												size="small"
												:pageSize="options.num"
												@page-change="pageChange"
												:total="options.total"
												:layout="['total', 'prev', 'pager', 'next', 'jumper']" />
										</div>
                </div>
                <!-- /.box-body -->
            </div>
        </div>
    </div>
</section>
</template>

<script>
const BMap = window.BMap
export default {
  data: () => ({
		clientHeight:window.innerHeight,
    map: null,
		loading: false,
		list: [
			{
				ladderNumber:'电梯工号',
				alias:'xxxx',
				latitude:31.24916171,
				longitude:121.48789949
			},
			{
				ladderNumber:'电梯工号',
				alias:'xxxx'
			},
		],
    columns: [{
      field: 'ladderNumber',
      title: '电梯工号',
      width: 70,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'alias',
      title: '具体位置别名',
      width: 80,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }],
    options: {
			page:1,
			num:10,
			total:0
    }
  }),
  created() {
    this.option = this.$storage.get("map")
  },
  mounted() {
		this.mapInit()
  },
	beforeDestory(){
		this.map = null
	},
  methods: {
    mapInit() {
      let mapPoint = JSON.parse(this.$storage.get("point"))||{}
      let point = new BMap.Point(121.48, 31.22);
      let map = new BMap.Map("map", {
        enableMapClick: false
      });
      if (mapPoint.lat) {
        map.centerAndZoom(
          new BMap.Point(mapPoint.lon, mapPoint.lat),
          mapPoint.zoom);
      } else {
        let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition((r) => {
          if (geolocation.getStatus() === 0) {
						this.$storage.set("point",JSON.stringify({lat:r.point.lat, lon:r.point.lng, zoom: 12}))
            map.centerAndZoom(new BMap.Point(r.point.lng, r.point.lat), 12);
            // this.getDevice();
          } else {
            map.centerAndZoom(point, 12);
            new BMap.LocalCity().get((result) => {
              map.setCenter(result.name);
            });
          }
        }, {
          enableHighAccuracy: true
        });
      }
      map.addControl(new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        type: BMAP_NAVIGATION_CONTROL_SMALL,
        enableGeolocation: true,
      }));
      map.addControl(new BMap.ScaleControl());
      map.addControl(new BMap.OverviewMapControl());
			// map.addEventListener('tilesloaded', this.getList);
      this.map = map
    },
		pageChange(val) {
      this.options.page = val
      this.getList()
    },
		async getList(){
			if (this.map) {
				this.loading = true
				const mapBounds = this.map.getBounds();
		    const mapSw = mapBounds.getSouthWest();
		    const mapNe = mapBounds.getNorthEast();
				let bounds = {
		      lat1: mapSw.lat,
		      lon1: mapSw.lng,
		      lat2: mapNe.lat,
		      lon2: mapNe.lng,
		    }
				let res = await this.$api.mointors(Object.assign(bounds,this.options))
	      this.loading = false
	      if (0 === res.data.code) {
	        this.list = res.data.data.list
	        this.options.total = res.data.data.totalNumber
	      }
			}
		},
		detail(rowIndex, rowData){
			this.map.centerAndZoom(new BMap.Point(rowData.longitude, rowData.latitude), 15);
		}
  }
}
</script>

<style lang="css" scoped>
.map-content {
	height: 100%;
}
#map {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 100%;
}
</style>
