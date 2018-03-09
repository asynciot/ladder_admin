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
                      <label for="" class="col-sm-2 control-label">人员名称</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" class="form-control" id="" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">手机号码</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="tel" class="form-control" id="" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">维保单位</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" class="form-control" id="" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">维保站点</label>

                      <div class=" col-sm-8 col-md-6">
                          <select type="text" class="form-control" id="">
                              <option value="">请选择</option>
                          </select>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">维保班组</label>

                      <div class=" col-sm-8 col-md-6">
                          <select type="text" class="form-control" id="">
                              <option value="">请选择</option>
                          </select>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">人员类别</label>

                      <div class=" col-sm-8 col-md-6">
                          <select type="text" class="form-control" id="">
                              <option value="">请选择</option>
                          </select>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">人员状态</label>

                      <div class=" col-sm-8 col-md-6">
                          <div class="checkbox">
                              <label class="ml10">
                                  <input type="radio"> 正常
                              </label>
                              <label class="ml10">
                                  <input type="radio"> 离职
                              </label>
                          </div>
                      </div>
                  </div>

              </div>
              <div class="box-header with-border">
                  <h4 class="box-title">用户信息</h4>
              </div>
              <div class="box-body">
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">单位账号</label>

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
                  <h4 class="box-title">用户角色对应信息</h4>
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
                                  <input type="checkbox"> 系统操作员2
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
