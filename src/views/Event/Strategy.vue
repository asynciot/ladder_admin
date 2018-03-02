<template lang="html">
	<section class="content">
      <div class="box">
          <div class="box-header with-border">
              <h3 class="box-title">用户对应角色信息</h3>
          </div>
          <!-- /.box-header -->
          <!-- form start -->
          <form class="form-horizontal">
              <div class="box-body">
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">故障界别名称</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" class="form-control" id="" placeholder="请输入" readonly>
                      </div>
                  </div>

                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">短信通知</label>

                      <div class=" col-sm-8 col-md-6">
                          <div class="checkbox">
                              <label class="ml10">
                                  <input type="checkbox">在检修状态下，控制器发生故障，不发送短信
                              </label>
                          </div>
                          <ul class="list-group list-group-unbordered list-unstyled">
                              <li>
                                  <label class="ml10 font-normal">
                                      <input type="checkbox"> 在检修状态下，控制器发生故障，不发送短信
                                  </label>
                              </li>
                              <li>
                                  <label class="ml10 font-normal">
                                      <input type="radio"> 在检修状态下，控制器发生故障，不发送短信
                                  </label>
                              </li>
                          </ul>
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
