<template lang="html">
<!-- Main content -->
<section class="content">
    <div class="box">
        <div class="box-body">
            <div class="row">
                <div class="col-xs-2">
                    <input type="text" class="form-control input-sm" placeholder="电梯工号">
                </div>
                <div class="col-xs-2">
                    <input type="text" class="form-control input-sm" placeholder="具体位置别名">
                </div>
                <div class="col-xs-2">
                    <input type="text" class="form-control input-sm" placeholder="注册代码">
                </div>
                <div class="col-xs-2">
                    <input type="text" class="form-control input-sm" placeholder="采集设备注册码">
                </div>
                <div class="col-xs-2">
                    <button class="btn btn-primary btn-sm">搜索</button>
                </div>
            </div>
            <hr class="mt10 mb10">
            <div class="row">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-2" v-for="item in list">
                    <div class="thumbnail">
												<router-link :to="{name:'position',params:{id:item.deviceNo}}" class="text-nowrap">
                        	<img src="../../assets/img/ladder.jpg" alt="...">
												</router-link>
                        <div class="caption">
                            <div class="mt5 left icon-content">
																<span class="mr10" v-text="item.networkType"></span>
                                <span class="label label-success">在线</span>
																<span @click="favourite(item)" :class="{'fa fa-heart':true, 'on':item.favo}"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.box-body -->
        </div>
        <!-- /.box -->
		</div>
</section>
<!-- /.content -->
</template>

<script>
export default {
	data:()=>({
		list:[],
		focus:[],
		options: {
			companyId:$cookie.get('companyId'),
			type: 0,
      page: 1,
      num: 15,
      total: 0
    },
	}),
	created() {
		this.getFocus()
  },
  methods: {
		async getList() {
      let res = await this.$api.search(this.options)
      if (0 === res.data.code) {
        this.list = res.data.data.list.map(item=>{
					let index = this.focus.findIndex(lift =>lift.ladderNo == item.ladderNo)
					if (index > -1) {
						item.favo = true
					}else {
						item.favo = false
					}
					return item
				})
      }
    },
		async getFocus(){
			let res = await this.$api.getFavourite({
				page: 1,
	      num: 100,
			})
			this.focus = res.data.data.list||[]
			this.getList()
		},
    async favourite(item) {
			if (!item.favo) {
				let res = await this.$api.addFavourite({
					userId:this.$cookie.get('userId'),
	        ladderNo: item.ladderNo
	      })
			}else {
				let res = await this.$api.reomveFavourite({
	        ladderNo: item.ladderNo
	      })
			}

    }
  }
}
</script>

<style lang="css" scoped>
.icon-content {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
}
</style>
