<template lang="html">
	<section class="content">
	    <div class="box">
	        <div class="box-header with-border">
	            <h3 class="box-title">用户信息</h3>
	        </div>
	        <!-- /.box-header -->
	        <!-- form start -->
	        <form class="form-horizontal" @submit.prevent="submit" data-vv-scope="form">
	            <div class="box-body">
	                <div class="form-group">
	                    <label for="" class="col-sm-2 control-label">用户名</label>
	                    <div class=" col-sm-8 col-md-6">
	                        <input name="username" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.username') }" v-model="form.username" type="text" placeholder="请输入">
	                    </div>
	                </div>
	                <div class="form-group">
	                    <label for="" class="col-sm-2 control-label">新密码</label>
	                    <div class=" col-sm-8 col-md-6">
	                        <input type="password" v-model="form.password" name="password" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.password') }" placeholder="请输入">
	                    </div>
	                </div>
	                <div class="form-group">
	                    <label for="" class="col-sm-2 control-label">密码确认</label>
	                    <div class=" col-sm-8 col-md-6">
	                        <input type="password" v-model="form.confirm" name="confirm" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.confirm') }"  placeholder="请输入">
	                    </div>
	                </div>
	                <div class="form-group">
	                    <label for="" class="col-sm-2 control-label">员工姓名</label>
	                    <div class=" col-sm-8 col-md-6">
	                        <input type="text" name="nicname" v-model="form.nicname" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.nicname') }"  placeholder="请输入">
	                    </div>
	                </div>
	                <div class="form-group">
	                    <label for="" class="col-sm-2 control-label">手机号码</label>
	                    <div class=" col-sm-8 col-md-6">
	                        <input type="tel" v-model="form.mobile" name="mobile" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.mobile') }"  placeholder="请输入">
	                    </div>
	                </div>
	                <div class="form-group">
	                    <label for="" class="col-sm-2 control-label">E-Mail</label>
	                    <div class=" col-sm-8 col-md-6">
	                        <input type="email" v-model="form.email" name="email" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.email') }"  placeholder="请输入">
	                    </div>
	                </div>
	            </div>
	            <!-- /.box-body -->
	            <div class="box-footer">
	                <div class="col-sm-offset-2">
	                    <button type="submit" @click="submit()" class="btn btn-success">提交</button>
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
				username:'',
				password:'',
				confirm:'',
				nicname:'',
				mobile:'',
				email:'',
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
			let res = await this.$api.user({ id: this.$route.params.id})
			this.form = res.data.data.list[0]
		},
		submit(){
			this.$validator.validateAll('form').then(async (result) => {
		        if (result) {
					let res = null
					if(this.$route.params.id){
						res = await this.$api.updateUser(this.form)
					}else {
						res = await this.$api.register(this.form)
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
