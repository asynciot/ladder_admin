<template lang="html">
	<section class="content">
      <div class="box">

          <!-- form start -->
          <form class="form-horizontal">
              <div class="box-header with-border">
                  <h4 class="box-title">电梯信息</h4>
              </div>
              <div class="box-body">
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">电梯工号</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" class="form-control" id="" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">注册代码</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" class="form-control" id="" placeholder="请输入">
                      </div>
                  </div>

              </div>
              <div class="box-header with-border">
                  <h4 class="box-title">位置信息</h4>
              </div>
              <div class="box-body">
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">所在区域</label>
                      <div class=" col-sm-8 col-md-6">
                          <div class="row">
                              <div class="col-sm-4">
                                  <select name="" id="" class="form-control">
                                      <option value="">
                                          请选择
                                      </option>
                                  </select>
                              </div>
                              <div class="col-sm-4">
                                  <select name="" id="" class="form-control">
                                      <option value="">
                                          请选择
                                      </option>
                                  </select>
                              </div>
                              <div class="col-sm-4">
                                  <select name="" id="" class="form-control">
                                      <option value="">
                                          请选择
                                      </option>
                                  </select>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">详细地址</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" class="form-control" id="" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">楼盘名称</label>

                      <div class=" col-sm-8 col-md-6">
                          <select type="text" class="form-control" id="">
                              <option value="">请选择</option>
                          </select>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">经纬度</label>

                      <div class=" col-sm-8 col-md-6">
                          <div class="row">
                              <div class="col-sm-6">
                                  <input type="text" class="form-control" id="" placeholder="请输入">
                              </div>
                              <div class="col-sm-6">
                                  <input type="text" class="form-control" id="" placeholder="请输入">
                              </div>
                          </div>
                      </div>
                      <div class=" col-sm-1 col-md-1">
                          <a href="#">地图定位</a>
                      </div>
                  </div>
              </div>
              <div class="box-header with-border">
                  <h4 class="box-title">安装信息</h4>
              </div>
              <div class="box-body">
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">安装单位</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" class="form-control" id="" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">安装初次选择维保公司</label>

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
