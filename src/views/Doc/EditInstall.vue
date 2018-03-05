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
                      <label for="" class="col-sm-2 control-label">电梯工号</label>
                      <div class=" col-sm-8 col-md-6">
												<div class=" col-sm-8 col-md-6">
														<input type="text" name="ladderNumber" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.ladderNumber') }" v-model="form.ladderNumber"  placeholder="请输入" :disabled="$route.params.id">
												</div>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">注册代码</label>
                      <div class=" col-sm-8 col-md-6">
												<div class=" col-sm-8 col-md-6">
														<input type="text" name="registerCode" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.registerCode') }" v-model="form.registerCode"  placeholder="请输入">
												</div>
                      </div>
                  </div>

              </div>
              <div class="box-header with-border">
                  <h4 class="box-title">位置信息</h4>
              </div>
              <div class="box-body">
                  <!-- <div class="form-group">
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
                  </div> -->
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">楼盘名称</label>
                      <div class=" col-sm-8 col-md-6">
													<select name="buildingId" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.buildingId') }" v-model="form.buildingId" >
														<option v-for="item in buildingList" :value="item.id" v-text="item.name"></option>
													</select>
                      </div>
                  </div>
                  <!-- <div class="form-group">
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
                  </div> -->
              </div>
              <div class="box-header with-border">
                  <h4 class="box-title">安装信息</h4>
              </div>
              <div class="box-body">
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">安装单位</label>
                      <div class=" col-sm-8 col-md-6">
												<select name="installCompanyId" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.installCompanyId') }" v-model="form.installCompanyId" >
												  <option v-for="item in installList" :value="item.id" v-text="item.name"></option>
												</select>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">安装初次选择维保公司</label>
                      <div class=" col-sm-8 col-md-6">
												<select name="maintenanceCompanyId" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.maintenanceCompanyId') }" v-model="form.maintenanceCompanyId" >
												  <option v-for="item in maintenanceList" :value="item.id" v-text="item.name"></option>
												</select>
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
			installList:[],
			buildingList:[],
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
			let res = await this.$api.setInfo({ id: this.$route.params.id})
			this.form = res.data.data.list[0]
		},
		getOption(){
			this.$api.building({ type:1, page:1, num:100}).then(res=>{
				this.buildingList = res.data.data.list
			})
			this.$api.company({ type:1, page:1, num:100}).then(res=>{
				this.maintenanceList = res.data.data.list
			})
			this.$api.company({ type:0, page:1, num:100}).then(res=>{
				this.installList = res.data.data.list
			})
		},
		submit(){
			this.$validator.validateAll('form').then(async (result) => {
        if (result) {
					let res = null
					if(this.$route.params.id){
						res = await this.$api.updateSetInfo(this.form)
					}else {
						res = await this.$api.addSetInfo(this.form)
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
