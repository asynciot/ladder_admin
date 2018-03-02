<template lang="html">
	<section class="content">

            <div class="box">
                <form class="form-horizontal">
                    <div class="box-header with-border">
                        <h4 class="box-title">添加保养类型</h4>
                    </div>
                    <div class="box-body">
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">保养类型名称</label>

                            <div class=" col-sm-8 col-md-6">
                                <input type="text" class="form-control" id="" placeholder="请输入">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">保养周期</label>

                            <div class=" col-sm-8 col-md-6">
                                <input type="text" class="form-control" id="" placeholder="请输入">
                            </div>
                            <div class="pl0 mt10 col-sm-1">
                                天
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">保养类型分类</label>
                            <div class=" col-sm-8 col-md-6">
                                <select name="" class="form-control" id="">
                                    <option value="">请选择</option>
                                </select>
                            </div>

                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">保养项要求</label>

                            <div class=" col-sm-8 col-md-6">
                                <textarea class="form-control" placeholder="请输入" rows="4"></textarea>
                            </div>
                        </div>


                    </div>

                    <!-- /.box-body -->
                    <div class="box-footer">
                        <div class="col-sm-offset-2">
                            <button type="submit" class="btn btn-success">提交</button>
                        </div>
                    </div>
                    <!-- /.box-footer -->
                </form>
                <!-- /.box-body -->

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
