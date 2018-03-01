<template lang="html">
        <!-- Main content -->
        <section class="content">

            <div class="box">
                <div class="box-body">
                    <div class="row">
                        <div class="col-xs-5">
                            <input type="text" class="form-control input-sm" placeholder="采集设备序列号">
                        </div>
                        <div class="col-xs-5">
                            <input type="text" class="form-control input-sm" placeholder="电梯工号">
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
                    <table id="dataTable" class="table table-bordered tree_table">
                        <thead>
                        <tr>
                            <th>电梯工号</th>
                            <th>电梯服务编码</th>
                            <th>电梯型号</th>
                            <th>电梯类型</th>
                            <th>层/站/门</th>
                            <th>额定载重</th>
                            <th>楼盘地址</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr data-tt-id="1">
                            <td colspan="7">某制造商</td>
                            <td>
                                <span class="label label-success">上线</span>
                            </td>
                            <td>
                                <a href="danganguanli-zhinengzhongduanguanli-bangdingdianti.html"
                                   class="btn btn-xs btn-default">绑定电梯</a>
                                <a href="danganguanli-zhinengzhongduanguanli-bangdingdianti.html"
                                   class="btn btn-xs btn-default">解绑电梯</a>
                            </td>
                        </tr>
                        <tr data-tt-id="1.1" data-tt-parent-id="1">
                            <td>某制造商</td>
                            <td>北京朝阳区</td>
                            <td>010000099999</td>
                            <td>010000099999</td>
                            <td>张三/18899998888</td>
                            <td>张三</td>
                            <td>张三</td>
                            <td>
                                <span class="label label-success">已连接</span>
                            </td>
                            <td>
                            </td>
                        </tr>

                        <tr data-tt-id="2">
                            <td colspan="7">某制造商</td>
                            <td>
                                <span class="label label-success">上线</span>
                            </td>
                            <td>
                                <a href="danganguanli-zhinengzhongduanguanli-bangdingdianti.html"
                                   class="btn btn-xs btn-default">绑定电梯</a>
                                <a href="danganguanli-zhinengzhongduanguanli-bangdingdianti.html"
                                   class="btn btn-xs btn-default">解绑电梯</a>
                            </td>
                        </tr>
                        <tr data-tt-id="2.1" data-tt-parent-id="2">
                            <td>某制造商</td>
                            <td>北京朝阳区</td>
                            <td>010000099999</td>
                            <td>010000099999</td>
                            <td>张三/18899998888</td>
                            <td>张三</td>
                            <td>2018-09-09</td>
                            <td>
                                <span class="label label-success">已连接</span>
                            </td>
                            <td>
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
		$("#dataTable").treetable({expandable: true});
	}
}
</script>

<style lang="css">
</style>
