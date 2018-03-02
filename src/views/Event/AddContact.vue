<template lang="html">
	<section class="content">

    <div class="box">
        <form class="form-horizontal">
            <div class="box-header with-border">
                <h4 class="box-title">联系人信息</h4>
            </div>
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">联系人</label>

                    <div class=" col-sm-8 col-md-6">
                        <input type="text" class="form-control" id="" placeholder="请输入">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">联系人电话</label>

                    <div class=" col-sm-8 col-md-6">
                        <input type="tel" class="form-control" id="" placeholder="请输入">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">联系人邮箱</label>

                    <div class=" col-sm-8 col-md-6">
                        <input type="email" class="form-control" id="" placeholder="请输入">
                    </div>
                </div>
            </div>
            <div class="box-header with-border">
                <h4 class="box-title">用户信息</h4>
            </div>
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">账号</label>

                    <div class=" col-sm-8 col-md-6">
                        <input type="text" class="form-control" id="" placeholder="请输入">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">登录密码</label>

                    <div class=" col-sm-8 col-md-6">
                        <input type="password" class="form-control" id="" placeholder="请输入">
                    </div>
                </div>
            </div>
            <div class="box-header with-border">
                <h4 class="box-title">用户对应角色信息</h4>
            </div>
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">角色名称</label>

                    <div class=" col-sm-8 col-md-6">
                        <div class="checkbox">
                            <label class="ml10">
                                <input type="checkbox"> 系统操作员
                            </label>
                            <label class="ml10">
                                <input type="checkbox">使用用户权限
                            </label>
                            <label class="ml10">
                                <input type="checkbox">维保单位用户权限
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
