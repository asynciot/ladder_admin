<template lang="html">
	<section class="content">
	            <div class="row">
	                <div class="col-sm-8">
	                    <div class="box">
	                        <div class="box-header with-border">
	                            <h4 class="box-title">已选择电梯</h4>
	                        </div>
	                        <div class="box-body">
	                            <div class="select-tag">
	                                <span style="color: #ccc">请从右边列表选择</span>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="box">
	                        <div class="box-header with-border">
	                            <h4 class="box-title">设备信息</h4>
	                        </div>
	                        <div class="box-body">
	                            <div class="content">
	                                <div class="row mb10">
	                                    <div class="col-sm-4">
	                                        目标设备：巴拉巴拉
	                                    </div>
	                                    <div class="col-sm-4">
	                                        设备类型：控制器
	                                    </div>
	                                    <div class="col-sm-4">
	                                        地址码：目标设备序列号
	                                    </div>
	                                </div>
	                                <div class="row mb10">
	                                    <div class="col-sm-4">
	                                        电梯工号：123123
	                                    </div>
	                                    <div class="col-sm-4">
	                                        具体别名：电梯1
	                                    </div>
	                                    <div class="col-sm-4">
	                                        状态：<span class="label label-success">已连接</span>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <div class="col-sm-4">
	                    <div class="box">
	                        <div class="box-header with-border">
	                            <h4 class="box-title">请从下面列表选择电梯</h4>
	                        </div>
	                        <div class="box-body">
	                            <div class="row">
	                                <div class="col-md-4">
	                                    <input type="text" class="form-control input-sm" placeholder="电梯工号">
	                                </div>
	                                <div class="col-md-4">
	                                    <input type="text" class="form-control input-sm" placeholder="具体别名">
	                                </div>
	                                <div class="col-sm-4">
	                                    <button class="btn btn-primary btn-sm">搜索</button>
	                                </div>
	                            </div>
	                            <hr class="mt10 mb10">
	                            <table id="dataTable" class="table table-bordered select-table">
	                                <thead>
	                                <tr>
	                                    <th>电梯工号</th>
	                                    <th>具体位置别名</th>
	                                </tr>
	                                </thead>
	                                <tbody>
	                                <tr>
	                                    <td>26118</td>
	                                    <td>北京朝阳区</td>
	                                </tr>
	                                <tr>
	                                    <td>262218</td>
	                                    <td>北京朝阳区</td>
	                                </tr>
	                                <tr>
	                                    <td>26122</td>
	                                    <td>北京朝阳区</td>
	                                </tr>
	                                </tbody>
	                            </table>
	                        </div>
	                        <!-- /.box-body -->

	                    </div>
	                </div>
	            </div>


	            <!-- /.box -->

	        </section>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
