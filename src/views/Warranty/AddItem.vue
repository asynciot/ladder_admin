<template lang="html">
	<section class="content">

            <div class="box">

                <!-- form start -->
                <form class="form-horizontal">
                    <div class="box-header with-border">
                        <h4 class="box-title">维保人员信息</h4>
                    </div>
                    <div class="box-body">
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">保养项名称</label>

                            <div class=" col-sm-8 col-md-6">
                                <input type="text" class="form-control" id="" placeholder="请输入">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">保养项名称</label>

                            <div class=" col-sm-8 col-md-6">
                                <textarea class="form-control" placeholder="请输入" rows="4"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">保养项要求</label>

                            <div class=" col-sm-8 col-md-6">
                                <textarea class="form-control" placeholder="请输入" rows="4"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">人员状态</label>

                            <div class=" col-sm-8 col-md-6">
                                <div class="checkbox">
                                    <label class="ml10">
                                        <input type="radio"> 轿顶
                                    </label>
                                    <label class="ml10">
                                        <input type="radio"> 机房
                                    </label>
                                    <label class="ml10">
                                        <input type="radio"> 底坑
                                    </label>
                                    <label class="ml10">
                                        <input type="radio"> 扶梯
                                    </label>
                                </div>
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
            </div>

        </section>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
