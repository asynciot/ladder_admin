<template lang="html">
    <!-- Main content -->
    <section class="content">
        <div class="box">
            <div class="box-body">
                <div class="row">
									<div class="col-xs-4 col-sm-4 col-md-3 col-lg-2" v-for="item in list">
											<div class="thumbnail">
													<a href="javascript:void(0)" @click="goDetail(item)" class="text-nowrap">
														<img src="../../assets/img/ladder.jpg" alt="...">
													</a>
													<div class="caption">
															<div class="mt5 left icon-content">
																	<span class="mr10" v-text="item.ladderNo"></span>
																	<span @click="favourite(item)" class="fa fa-heart on"></span>
															</div>
													</div>
											</div>
									</div>
									<div class="col-xs-4 col-sm-4 col-md-3 col-lg-2" v-if="!list.length">
										<p>暂无已关注电梯</p>
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
		options: {
			companyId:$cookie.get('companyId'),
			type: 0,
      page: 1,
      num: 15,
      total: 0
    },
	}),
	created(){
		this.getFocus()
	},
	methods:{
		async getFocus(){
			let res = await this.$api.getFavourite({
				page: 1,
	      num: 100,
			})
			this.list = res.data.data.list
		},
		async favourite(item) {
			let res = await this.$api.reomveFavourite({
        ladderNo: item.ladderNo
      })
			this.getFocus()
    },
		async goDetail(item){
			let res = await this.$api.device({ladderNo:item.ladderNo})
			if (res.data.code == 0) {
				this.$router.push({
					name:'position',
					params:{
						id: res.data.data.list[0].deviceId
					}
				})
			}
		}
	}
};
</script>

<style lang="css" scoped>
.icon-content {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
}
</style>
