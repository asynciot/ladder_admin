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
						<input @keyup.enter="login()" type="text" v-model="form.username" class="form-control" placeholder="用户名">
						<span class="glyphicon glyphicon-user form-control-feedback"></span>
					</div>
					<div class="form-group has-feedback">
						<input @keyup.enter="login()" type="password" v-model="form.password" class="form-control" placeholder="密码">
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
				地址：浙江省宁波市
			</div>
			<strong>Copyright &copy; 2014-2018
				<!-- <a href="#">xxx Studio</a>. -->
			</strong>
			宁波申菱电梯配件有限公司
		</footer>
	</div>
</template>

<script>
import {
  menu
} from '@/views/menu'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      let res = await this.$api.login(this.form)
      if (0 === res.data.code) {
        let role = await this.$api.role({
          id: res.data.account.role
        })
        let accessRight = JSON.parse(role.data.data.list[0].accessRight)
				let roleMenu = []
				accessRight.forEach(item => {
					let index1 = menu.findIndex(obj=>obj.id == item.id)
					if(index1 > -1){
						let data1 = Object.assign({},menu[index1])
						delete data1.sub
						if(item.list){
							item.list.forEach(sub=>{
								let index2 = menu[index1].sub.findIndex(obj=>obj.id == sub.id)
								if(index2 > -1){
									let data2 = Object.assign({},menu[index1].sub[index2])
									delete data2.sub
									if(!data1.sub) data1.sub = [];
									data1.sub.push(data2)
									if(sub.list){
										sub.list.forEach(nav=>{
											let index3 = menu[index1].sub[index2].sub.findIndex(obj=>obj.id == nav.id)
											if(index3 > -1){
												let data3 = menu[index1].sub[index2].sub[index3]
												if(!data2.sub) data2.sub = [];
												data2.sub.push(data3)
											}
										})
										data2.sub.sort((a,b)=>a.id-b.id)
									}
								}
							})
							data1.sub.sort((a,b)=>a.id-b.id)
						}
						roleMenu.push(data1)
					}
				})
				this.$storage.set('roleMenu', JSON.stringify(roleMenu))
        this.$cookie.set('userId', res.data.account.id, 3)
        window.location.href = window.location.href+'index'
      }
    }
  }
}
</script>

<style lang="css">

</style>
