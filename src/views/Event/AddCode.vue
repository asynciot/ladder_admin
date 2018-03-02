<template lang="html">
	<!-- Main content -->
  <section class="content">

      <div class="box">
          <div class="box-header with-border">
              <h3 class="box-title">添加故障代码</h3>
          </div>
          <!-- /.box-header -->
          <!-- form start -->
          <form class="form-horizontal">
              <div class="box-body">
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">控制器类型</label>
                      <div class=" col-sm-8 col-md-6">
                          <select class="form-control" id="">
                              <option value="">请选择</option>
                          </select>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">故障代码名称</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="text" class="form-control" id="" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">故障代码描述</label>

                      <div class=" col-sm-8 col-md-6">
                          <textarea class="form-control" rows="3" placeholder="请输入"></textarea>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">故障原因</label>

                      <div class=" col-sm-8 col-md-6">
                          <textarea class="form-control" rows="3" placeholder="请输入"></textarea>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">处理办法</label>

                      <div class=" col-sm-8 col-md-6">
                          <textarea class="form-control" rows="3" placeholder="请输入"></textarea>
                      </div>
                  </div>

                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">故障级别名称</label>

                      <div class=" col-sm-8 col-md-6">
                          <select class="form-control" id="">
                              <option value="">请选择</option>
                          </select>
                          <div class="mt10">五级故障</div>
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
