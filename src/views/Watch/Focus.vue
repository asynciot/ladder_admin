<template lang="html">
    <!-- Main content -->
    <section class="content">

        <div class="box">
            <div class="box-body">
                <div class="row">
                    <div class="col-sm-4 col-md-3 col-lg-3">
											<div class="thumbnail">
													<router-link :to="{name:'dataDetail',params:{id:'121442'}}" class="text-nowrap">
	                        	<img src="../../assets/img/ladder-w.jpg" alt="...">
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
										<div class="col-sm-4 col-md-3 col-lg-3">
											<div class="thumbnail">
													<router-link :to="{name:'dataDetail',params:{id:'121442'}}" class="text-nowrap">
	                        	<img src="../../assets/img/ladder-w.jpg" alt="...">
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
export default {};
</script>

<style lang="css" scoped>
.icon-content {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
}
</style>
