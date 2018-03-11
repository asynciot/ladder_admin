<template lang="html">
	<section class="content">
      <div class="box">
          <!-- form start -->
          <form class="form-horizontal" @submit.prevent="submit" data-vv-scope="form">
              <div class="box-header with-border">
                  <h4 class="box-title">电梯信息</h4>
              </div>
              <div class="box-body">
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">班组名称</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="text" name="name" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.name') }" v-model="form.name" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">详细地址</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" name="address" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.address') }" v-model="form.address" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">维保单位</label>
                      <div class=" col-sm-8 col-md-6">
												<select name="maintenanceCompanyId" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.maintenanceCompanyId') }" v-model="form.maintenanceCompanyId" >
													<option v-for="item in maintenanceList" :value="item.id" v-text="item.name"></option>
												</select>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">维保站点</label>

                      <div class=" col-sm-8 col-md-6">
												<select name="siteId" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.siteId') }" v-model="form.siteId" >
													<option v-for="item in siteList" :value="item.id" v-text="item.name"></option>
												</select>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">联系人</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="text" name="contactor" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.contactor') }" v-model="form.contactor" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">联系人电话</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="text" name="mobile" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.mobile') }" v-model="form.mobile" placeholder="请输入">
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
				name:'',
				contactor:'',
				address:'',
				siteId:'',
				maintenanceCompanyId:'',
				mobile:'',
			},
			siteList:[],
			maintenanceList:[]
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
			let res = await this.$api.team({ id: this.$route.params.id})
			this.form = res.data.data.list[0]
		},
		getOption(){
			this.$api.site({page:1, num:100}).then(res=>{
				this.siteList = res.data.data.list
			})
			this.$api.company({ type:2, page:1, num:100}).then(res=>{
				this.maintenanceList = res.data.data.list
			})
		},
		submit(){
			this.$validator.validateAll('form').then(async (result) => {
        if (result) {
					let res = null
					if(this.$route.params.id){
						res = await this.$api.updateTeam(this.form)
					}else {
						res = await this.$api.addTeam(this.form)
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
