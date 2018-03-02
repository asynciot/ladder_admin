<template lang="html">
	<div class="">
		<div class="login-box">
			<div class="login-logo">
				<a href="#" class="">电梯管理系统</a>
			</div>
			<!-- /.login-logo -->
			<div class="login-box-body">
				<h4 class="font-normal text-center">用户登录</h4>
				<hr>
				<form>
					<div class="form-group has-feedback">
						<input type="text" v-model="form.username" class="form-control" placeholder="用户名">
						<span class="glyphicon glyphicon-user form-control-feedback"></span>
					</div>
					<div class="form-group has-feedback">
						<input type="password" v-model="form.password" class="form-control" placeholder="密码">
						<span class="glyphicon glyphicon-lock form-control-feedback"></span>
					</div>
					<div class="row">
						<div class="col-xs-8">
							<div class="mt5">
								<label>
									<input type="checkbox" class="no-margin"> 记住密码
								</label>
								<a href="wangjimima.html" class="ml15">忘记密码?</a>
							</div>
						</div>
						<div class="col-xs-4">
							<button type="button" @click="login()" class="btn btn-primary btn-block btn-flat">登录</button>
						</div>
					</div>
				</form>
			</div>
			<!-- /.login-box-body -->
		</div>
		<footer class="login-footer">
			<div class="pull-right hidden-xs">
				<!-- 详细地址：陕西省西安市 -->
			</div>
			<strong>Copyright &copy; 2017-2018
				<!-- <a href="#">xxx Studio</a>. -->
			</strong>
			<!-- 某某管理有限公司 -->
		</footer>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				form:{
					username:'',
					password:''
				}
			}
		},
		methods:{
			async login(){
				// let res = await this.$api.login(this.form)
				// if (0 === res.data.code){
				// 	this.$cookie.set('userId', res.data.id, 3)
					window.location.href = window.location.href+'index'
				// }
			}
		}
	}
</script>

<style lang="css">

</style>
