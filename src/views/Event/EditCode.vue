<template lang="html">
	<!-- Main content -->
  <section class="content">
      <div class="box">
          <div class="box-header with-border">
              <h3 class="box-title">添加故障代码</h3>
          </div>
          <!-- /.box-header -->
          <!-- form start -->
          <form class="form-horizontal" @submit.prevent="submit" data-vv-scope="form">
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
                          <input type="text" name="ladderNumber" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.ladderNumber') }" v-model="form.ladderNumber" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">故障代码描述</label>

                      <div class=" col-sm-8 col-md-6">
                          <textarea name="ladderNumber" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.ladderNumber') }" v-model="form.ladderNumber" rows="3" placeholder="请输入"></textarea>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">故障原因</label>

                      <div class=" col-sm-8 col-md-6">
                          <textarea name="ladderNumber" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.ladderNumber') }" v-model="form.ladderNumber" rows="3" placeholder="请输入"></textarea>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">处理办法</label>

                      <div class=" col-sm-8 col-md-6">
                          <textarea name="ladderNumber" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.ladderNumber') }" v-model="form.ladderNumber" rows="3" placeholder="请输入"></textarea>
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
	data(){
		return {
			form:{
				ladderNumber:'',
				registerCode: '',
				buildingId:'',
				installCompanyId:'',
				maintenanceCompanyId:'',
			},
			maintenanceList:[],
		}
	},
	created(){
		if(this.$route.params.id){
			this.getData()
		}
		this.getOption()
	},
	methods:{
		async getData(){
			let res = await this.$api.errorCode({ id: this.$route.params.id})
			this.form = res.data.data.list[0]
		},
		getOption(){
			this.$api.building({ type:1, page:1, num:100}).then(res=>{
				this.buildingList = res.data.data.list
			})
		},
		submit(){
			this.$validator.validateAll('form').then(async (result) => {
        if (result) {
					let res = null
					if(this.$route.params.id){
						res = await this.$api.updateErrorCode(this.form)
					}else {
						res = await this.$api.addErrorCode(this.form)
					}
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
