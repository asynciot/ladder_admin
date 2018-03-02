<template lang="html">
  <!-- Main content -->
  <section class="content">

      <div class="box">
          <div class="box-header with-border">
              <h3 class="box-title">电梯信息</h3>
          </div>
          <!-- /.box-header -->
          <!-- form start -->
          <form class="form-horizontal">
              <div class="box-body">
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">电梯工号</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" class="form-control" id="" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">电梯服务编码</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="text" class="form-control" id="" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">电梯类型</label>

                      <div class=" col-sm-8 col-md-6">
                          <div class="checkbox">
                              <label class="ml10">
                                  <input type="radio" name="type"> 直梯
                              </label>
                              <label class="ml10">
                                  <input type="radio" name="type"> 扶梯
                              </label>
                          </div>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">层/站/门</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" class="form-control" id="" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">额定载重</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" class="form-control" id="" placeholder="请输入">
                      </div>
                      <div class="col-sm-1 mt10 pl0">kg</div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">额定速度</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" class="form-control" id="" placeholder="请输入">
                      </div>
                      <div class="col-sm-1 mt10 pl0">m/s</div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">电梯出厂编号</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" class="form-control" id="" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">出场日期</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" class="form-control" id="" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">三年包限</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" class="form-control" id="" placeholder="请输入">
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
