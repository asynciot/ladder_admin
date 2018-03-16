<template lang="html">
	        <!-- Main content -->
	        <section class="content">

	            <div class="box">
	                <div class="box-body">
	                    <div class="row">
	                        <div class="col-md-3">
	                            <input type="text" v-model="options" class="form-control input-sm" placeholder="故障代码">
	                        </div>
	                        <div class="col-md-3">
	                            <input type="text" v-model="options" class="form-control input-sm" placeholder="具体位置别名">
	                        </div>
	                        <div class="col-md-3">
	                            <input type="text" v-model="options" class="form-control input-sm" placeholder="故障代码">
	                        </div>
	                        <div class="col-md-2">
	                            <button @click="options.page=1,getList()" class="btn btn-primary btn-sm">搜索</button>
	                        </div>
	                    </div>
	                    <hr class="mt10 mb10">
	                    <div class="row">
	                        <div class="col-xs-12 text-right">
	                            <button class="btn btn-success">添加故障代码</button>
	                        </div>
	                    </div>
	                    <table id="dataTable" class="table table-bordered">
	                        <thead>
	                        <tr>
	                            <th>电梯工号</th>
	                            <th>具体位置别名</th>
	                            <th>故障状态</th>
	                            <th>检修状态</th>
	                            <th>设备状态</th>
	                            <th>电梯类型</th>
	                            <th>使用单位名称</th>
	                            <th>维保单位</th>
	                            <th>操作</th>

	                        </tr>
	                        </thead>
	                        <tbody>
	                        <tr>
	                            <td>123</td>
	                            <td>123</td>
	                            <td><span class="label label-success">正常</span></td>
	                            <td><span class="label label-success">正常</span></td>
	                            <td><span class="label label-info">在线</span></td>
	                            <td>123</td>
	                            <td>123</td>
	                            <td>123</td>
	                            <td>
	                                <button class="btn btn-xs btn-default">进入监测</button>
	                            </td>
	                        </tr>

	                        </tbody>
	                    </table>
	                </div>
	                <!-- /.box-body -->

	            </div>
	            <!-- /.box -->

	        </section>
	        <!-- /.content -->
</template>

<script>
export default {
	options: {
      page: 1,
      num: 15,
      total: 0
   },
}
</script>

<style lang="css">
</style>
