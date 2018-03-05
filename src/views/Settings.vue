<template lang="html">
  <!-- Main content -->
  <section class="content">
      <div class="box">
          <div class="box-header with-border">
              <h3 class="box-title">网站信息</h3>
          </div>
          <!-- /.box-header -->
          <!-- form start -->
          <form class="form-horizontal" @submit.prevent="submit" data-vv-scope="form">
              <div class="box-body">
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">网站标题</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="text" name="title" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.title') }" v-model="form.title" class="form-control" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">单位名称</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="text" name="name" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.name') }" v-model="form.name" class="form-control" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">详细地址</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="text" name="address" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.address') }" v-model="form.address" class="form-control" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">单位电话</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="tel" name="phone" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.phone') }" v-model="form.phone" class="form-control" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">单位传真</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="tel" name="fax" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.fax') }" v-model="form.fax" class="form-control" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">单位邮箱</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="email" name="email" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.email') }" v-model="form.email" class="form-control" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">企业Logo</label>
                      <div class=" col-sm-8 col-md-6">
                          <input id="input-upload1" name="input-b5[]" type="file">
                      </div>
                  </div>
									<div class="form-group">
                      <label for="" class="col-sm-2 control-label">背景图片</label>
                      <div class=" col-sm-8 col-md-6">
                          <input id="input-upload1" name="input-b5[]" type="file">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">背景颜色</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="text" name="color" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.color') }" v-model="form.color" class="form-control" placeholder="支持：#000000、rgb(255,255,255)两种形式的颜色值">
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
  <!-- /.content -->
</template>

<script>
export default {
	data(){
		return {
			form: {
				title:'',
				name: '',
				address: '',
				phone: '',
				fax: '',
				email: '',
				logo: '',
				pic: '',
				color: ''
			}
		}
	},
	methods:{
		submit(){
			this.$validator.validateAll('form').then(async (result) => {
        if (result) {
          let res = await this.$api.addSettings(this.form)
					if(res.data.code == 0){
						this.$notify({
							group: 'ok',
							title: '提示',
							text: '操作成功'
						});
						this.$router.back()
					}
        }
      });
		}
	}
}
</script>

<style lang="css">
</style>
