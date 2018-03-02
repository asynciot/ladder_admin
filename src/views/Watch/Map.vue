<template lang="html">
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-sm-8">
                    <div class="box no-margin">
                        <div class="map-content" style="background: url('../assets/img/map.png') center center no-repeat"></div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="box no-margin">
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
        <!-- /.content -->
</template>

<script>
export default {
	mounted(){
		var contentHeight = $(window).height() - $('.navbar').outerHeight() - $('.content-header').outerHeight() - 90;
		$('.map-content').height(contentHeight);
		$('#dataTable').DataTable({
        "dom": 'rtip',
//            "scrollX": true, //表格太长可加此项进行横向滚动
        "searching": false,
        "scrollY": contentHeight - 212,
        "scrollCollapse": true,
        "lengthMenu": [20],
//            禁用最后一列排序
        "columns": [
            null,
            null,
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
//        点击表格添加
    $('#dataTable tbody').on('click', 'tr', function () {
        $(this).toggleClass('selected');
        var data = table.rows('.selected').data();
        var str = '';
        $.each(data, function (i) {
            str += '<span id="' + data[i][0] + '" class="label label-success">\n' +
                data[i][0] + ' | ' + data[i][1] +
                '</span>'
        });
        if (str == '') {
            str = '<span style="color: #ccc">请从右边列表选择</span>'
        }
        $('.select-tag').html(str)
    });
	}
}
</script>

<style lang="css" scoped>
</style>
