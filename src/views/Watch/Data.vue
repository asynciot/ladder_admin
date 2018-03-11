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
                <div class="col-sm-3 col-md-2 col-lg-2">
                    <div class="thumbnail">
												<router-link :to="{name:'dataDetail',params:{id:'121442'}}" class="text-nowrap">
                        	<img src="../../assets/img/ladder.jpg" alt="...">
												</router-link>
                        <div class="caption">
                            <div class="mt5 left icon-content">
																<span class="fa fa-signal mr10"></span>
                                <span class="label label-success">在线</span>
																<span @click="favourite()" class="fa fa-heart on"></span>
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
  methods: {
    async favourite() {
			if (true) {
				let res = await this.$api.addFavourite({
	        ladderNo: ''
	      })
			}else {
				let res = await this.$api.reomveFavourite({
	        ladderNo: ''
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
