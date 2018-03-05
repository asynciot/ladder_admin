<template lang="html">
	<section class="content">
    <div class="box">
        <div class="box-header with-border">
            <h3 class="box-title">制造厂商信息</h3>
        </div>
        <!-- form start -->
        <form class="form-horizontal" @submit.prevent="submit" data-vv-scope="form">
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">制造厂商名称</label>
                    <div class=" col-sm-8 col-md-6">
                        <input type="text" name="name" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.name') }" v-model="form.name" placeholder="请输入">
                    </div>
                </div>
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
                        <input type="text" name="address" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.address') }" v-model="form.address" placeholder="请输入">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">公司电话</label>

                    <div class=" col-sm-8 col-md-6">
                        <input type="text" name="phone" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.phone') }" v-model="form.phone" placeholder="请输入">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">公司传真</label>

                    <div class=" col-sm-8 col-md-6">
                        <input type="text" name="fax" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.fax') }" v-model="form.fax" placeholder="请输入">
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
                        <input type="tel" name="mobile" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.mobile') }" v-model="form.mobile" placeholder="请输入">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">负责人</label>

                    <div class=" col-sm-8 col-md-6">
                        <input type="text" name="admin" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.admin') }" v-model="form.admin" placeholder="请输入">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">负责人电话</label>
                    <div class=" col-sm-8 col-md-6">
                        <input type="tel" name="adminMobile" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.adminMobile') }" v-model="form.adminMobile" placeholder="请输入">
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
				province:'',
				city:'',
				district:'',
				address:'',
				phone:'',
				fax:'',
				contactor:'',
				mobile:'',
				admin:'',
				adminMobile:'',
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
			let res = await this.$api.manufacturer({ id: this.$route.params.id})
			this.form = res.data.data.list[0]
		},
		submit(){
			this.$validator.validateAll('form').then(async (result) => {
        if (result) {
					let res = null
					if(this.$route.params.id){
						res = await this.$api.updateManufacturer(this.form)
					}else {
						res = await this.$api.addManufacturer(this.form)
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
