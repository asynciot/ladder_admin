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
	                        <div class="col-xs-12 text-right">
	                        </div>
	                    </div>
	                    <table id="dataTable" class="table table-bordered">
	                        <thead>
	                        <tr>
	                            <th>电梯工号</th>
	                            <th>具体位置别名</th>
	                            <th>使用状态</th>
	                            <th>产权单位</th>
	                            <th>物业单位</th>
	                            <th>使用单位</th>
	                            <th>维保单位</th>
	                            <th>最后更新时间</th>
	                            <th>操作</th>
	                        </tr>
	                        </thead>
	                        <tbody>
	                        <tr>
	                            <td>某制造商</td>
	                            <td>北京朝阳区</td>
	                            <td><span class="label label-success">正常</span></td>
	                            <td>010000099999</td>
	                            <td>张三/18899998888</td>
	                            <td>张三/18899998888</td>
	                            <td>张三</td>
	                            <td>2018-09-09</td>
	                            <td>
	                                <button class="btn btn-xs btn-default">详请</button>
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
