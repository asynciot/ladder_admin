<template lang="html">
        <!-- Main content -->
        <section class="content">

            <div class="box">
                <div class="box-body">
                    <div class="row">
                        <div class="col-xs-3">
                            <input type="text" class="form-control input-sm" placeholder="请输入电梯工号">
                        </div>
                        <div class="col-xs-3">
                            <input type="text" class="form-control input-sm" placeholder="请输入具体位置别名">
                        </div>
                        <div class="col-xs-3">
                            <input type="text" class="form-control input-sm" placeholder="请输入详细地址">
                        </div>
                        <div class="col-xs-3">
                            <button class="btn btn-primary btn-sm">搜索</button>
                        </div>
                    </div>
                    <hr class="mt10 mb10">
                    <div class="row">
                        <div class="col-xs-12 text-right">
                            <a href="danganguanli-diantixinxiguanli-chuchangxinxiguanli-tianjiachuchangxinxi.html"
                               class="btn btn-success">添加出厂信息</a>
                        </div>
                    </div>
                    <table id="dataTable" class="table table-bordered">
                        <thead>
                        <tr>
                            <th>电梯工号</th>
                            <th>电梯服务编码</th>
                            <th>电梯型号</th>
                            <th>电梯类型</th>
                            <th>层/站/门</th>
                            <th>额定载重</th>
                            <th>楼盘地址</th>
                            <th>最后更新时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>某制造商</td>
                            <td>北京朝阳区</td>
                            <td>010000099999</td>
                            <td>010000099999</td>
                            <td>张三/18899998888</td>
                            <td>张三/18899998888</td>
                            <td>张三</td>
                            <td>2018-09-09</td>
                            <td>
                                <button class="btn btn-xs btn-warning">编辑</button>
                                <button class="btn btn-xs btn-danger remove-btn">删除</button>
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
	mounted(){
		$('#dataTable').DataTable({
						"dom": 'rtip',
						"searching": false,
	//            "scrollX": true, //表格太长可加此项进行横向滚动
	//            禁用最后一列排序
						"columns": [
								null,
								null,
								null,
								null,
								null,
								null,
								null,
								null,
								{"orderable": false}
						],
	//            中文配置，可存为配置文件单独调用
						language: {
								"sProcessing": "处理中...",
								"sLengthMenu": "显示 _MENU_ 项结果",
								"sZeroRecords": "没有匹配结果",
								"sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
								"sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
								"sInfoFiltered": "(由 _MAX_ 项结果过滤)",
								"sInfoPostFix": "",
								"sSearch": "搜索:",
								"sUrl": "",
								"sEmptyTable": "表中数据为空",
								"sLoadingRecords": "载入中...",
								"sInfoThousands": ",",
								"oPaginate": {
										"sFirst": "首页",
										"sPrevious": "上页",
										"sNext": "下页",
										"sLast": "末页"
								},
								"oAria": {
										"sSortAscending": ": 以升序排列此列",
										"sSortDescending": ": 以降序排列此列"
								}
						}
				});
	}
}
</script>

<style lang="css">
</style>
