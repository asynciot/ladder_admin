<template lang="html">
  <!-- Main content -->
  <section class="content">
      <div class="box">
          <div class="box-header with-border">
              <h3 class="box-title">电梯信息</h3>
          </div>
          <!-- /.box-header -->
          <!-- form start -->
          <form class="form-horizontal" @submit.prevent="submit" data-vv-scope="form">
              <div class="box-body">
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">电梯工号</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="text" name="number" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.number') }" v-model="form.number" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">电梯服务编码</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="text" name="code" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.code') }" v-model="form.code" placeholder="请输入">
                      </div>
                  </div>
									<div class="form-group">
                      <label for="" class="col-sm-2 control-label">电梯型号</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="text" name="serviceCode" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.serviceCode') }" v-model="form.serviceCode" placeholder="请输入">
                      </div>
                  </div>
                  <div :class="{'form-group': true, 'has-error': errors.has('form.serviceCode') }">
                      <label for="" class="col-sm-2 control-label">电梯类型</label>
                      <div class=" col-sm-8 col-md-6">
                          <div class="checkbox">
                              <label class="ml10">
                                  <input name="type" type="radio" v-model="form.type" v-validate="'required'" value="0"> 直梯
                              </label>
                              <label class="ml10">
                                  <input name="type" type="radio" value="1" v-model="form.type"> 扶梯
                              </label>
                          </div>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">层/站/门</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" name="floor" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.floor') }" v-model="form.floor" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">额定载重</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="text" name="weight" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.weight') }" v-model="form.weight" placeholder="请输入">
                      </div>
                      <div class="col-sm-1 mt10 pl0">kg</div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">额定速度</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="text" name="speed" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.speed') }" v-model="form.speed" placeholder="请输入">
                      </div>
                      <div class="col-sm-1 mt10 pl0">m/s</div>
                  </div>
									<div class="form-group">
                      <label for="" class="col-sm-2 control-label">整体合格证日期</label>
                      <div class=" col-sm-8 col-md-6">
                          <vue-datepicker-local v-model="form.qualifiedDate" />
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">出厂日期</label>
                      <div class=" col-sm-8 col-md-6">
                          <!-- <input type="text" name="produceDate" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.produceDate') }" v-model="form.produceDate" placeholder="请输入"> -->
													<vue-datepicker-local v-model="form.produceDate" />
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">三年包限</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" name="warrantYears" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.warrantYears') }" v-model="form.warrantYears" placeholder="请输入">
                      </div>
                  </div>
									<div class="form-group">
											<label for="" class="col-sm-2 control-label">电梯出厂编号</label>
											<div class=" col-sm-8 col-md-6">
													<input type="text" name="productNumber" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.productNumber') }" v-model="form.productNumber" placeholder="请输入">
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
	components:{
		VueDatepickerLocal
	},
	data(){
		return {
			form:{
				number:'',
				code: '',
				serviceCode:'',
				model:'',
				type:'',
				floor:'',
				weight: '',
				speed:'',
				qualifiedDate:'',
				produceDate:'',
				warrantYears:'',
				productNumber:'',
			}
		}
	},
	created(){
		if(this.$route.params.id){
			this.getData()
		}
	},
	methods:{
		async getData(){
			let res = await this.$api.product({ id: this.$route.params.id})
			this.form = res.data.data.list[0]
			this.form.qualifiedDate = moment(this.form.qualifiedDate).format('YYYY-MM-DD')
			this.form.produceDate = moment(this.form.produceDate).format('YYYY-MM-DD')
		},
		submit(){
			this.$validator.validateAll('form').then(async (result) => {
        if (result) {
					let res = null
					this.form.qualifiedDate = moment(this.form.qualifiedDate).format('YYYY-MM-DD')
					this.form.produceDate = moment(this.form.produceDate).format('YYYY-MM-DD')
					if(this.$route.params.id) {
						res = await this.$api.updateProduct(this.form)
					}else {
						res = await this.$api.addProduct(this.form)
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
