<template lang="html">
	<section class="content">
      <div class="box">
          <!-- form start -->
          <form class="form-horizontal" @submit.prevent="submit" data-vv-scope="form">
              <div class="box-header with-border">
                  <h4 class="box-title">维保人员信息</h4>
              </div>
              <div class="box-body">
									<div class="form-group">
											<label for="" class="col-sm-2 control-label">联系人</label>
											<div class=" col-sm-8 col-md-6">
													<input type="text" name="nicname" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.nicname') }" v-model="form.nicname" placeholder="请输入">
											</div>
									</div>
									<div class="form-group">
											<label for="" class="col-sm-2 control-label">联系人电话</label>

											<div class=" col-sm-8 col-md-6">
													<input type="tel" name="mobile" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.mobile') }" v-model="form.mobile" placeholder="请输入">
											</div>
									</div>
									<!-- <div class="form-group">
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
                  </div> -->
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">维保班组</label>
                      <div class=" col-sm-8 col-md-6">
												<select name="groupId" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.groupId') }" v-model="form.groupId" >
													<option v-for="item in groupList" :value="item.id" v-text="item.name"></option>
												</select>
                      </div>
                  </div>
                  <!-- <div class="form-group">
                      <label for="" class="col-sm-2 control-label">人员类别</label>

                      <div class=" col-sm-8 col-md-6">
                          <select type="text" class="form-control" id="">
                              <option value="">请选择</option>
                          </select>
                      </div>
                  </div> -->
                  <!-- <div class="form-group">
                      <label for="" class="col-sm-2 control-label">人员状态</label>

                      <div class=" col-sm-8 col-md-6">
                          <div class="checkbox">
                              <label class="ml10">
                                  <input type="radio"> 正常
                              </label>
                              <label class="ml10">
                                  <input type="radio"> 离职
                              </label>
                          </div>
                      </div>
                  </div> -->
              </div>
              <div class="box-header with-border">
                  <h4 class="box-title">用户信息</h4>
              </div>
              <div class="box-body">
								<div class="form-group">
										<label for="" class="col-sm-2 control-label">单位账号</label>

										<div class=" col-sm-8 col-md-6">
												<input type="text" name="username" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.username') }" v-model="form.username" placeholder="请输入">
										</div>
								</div>
								<div class="form-group">
										<label for="" class="col-sm-2 control-label">登录密码</label>
										<div class=" col-sm-8 col-md-6">
												<input type="password" name="password" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.password') }" v-model="form.password" placeholder="请输入">
										</div>
								</div>
								<div class="form-group">
										<label for="" class="col-sm-2 control-label">确认密码</label>
										<div class=" col-sm-8 col-md-6">
												<input type="password" name="confirm" :class="{'form-control': true, 'is-error': errors.has('form.confirm') }" v-model="form.confirm" placeholder="请输入">
										</div>
								</div>
              </div>
              <div class="box-header with-border">
                  <h4 class="box-title">用户角色对应信息</h4>
              </div>
							<div class="box-body">
	                <div class="form-group">
	                    <label for="" class="col-sm-2 control-label">角色名称</label>
	                    <div class=" col-sm-8 col-md-6">
												<div class="radio">
														<label class="ml10" v-for="item in list">
																<input type="radio" v-model="form.roleType" :value="item.id"> {{item.name}}
														</label>
												</div>
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
  data() {
    return {
      form: {
				username:'',
				password:'',
				confirm:'',
				nicname:'',
				mobile:'',
				companyId: -1,
				email:'',
				groupId:'',
				roleType:''
      },
			list:[],
			siteList:[],
			groupList:[],
			maintenanceList:[]
    }
  },
  created() {
		this.getList()
    if (this.$route.params.id) {
      this.getData()
    }
		this.getOption()
  },
  methods: {
		async getList() {
      let res = await this.$api.role({
				page:1,
				num:100
      })
			this.list = res.data.data.list
		},
    async getData() {
      let res = await this.$api.people({
        id: this.$route.params.id
      })
      this.form = res.data.data.list[0]
    },
		getOption(){
			this.$api.site({page:1, num:100}).then(res=>{
				this.siteList = res.data.data.list
			})
			this.$api.company({ type:2, page:1, num:100}).then(res=>{
				this.maintenanceList = res.data.data.list
			})
			this.$api.team({ page:1, num:100}).then(res=>{
				this.groupList = res.data.data.list
			})
		},
    submit() {
			this.$validator.validateAll('form').then(async (result) => {
        if (result) {
					let res = null
					if(this.$route.params.id){
						res = await this.$api.updateUser(this.form)
					}else {
						res = await this.$api.register(this.form)
					}
					if(res.data.code == 0){
						this.form.id = res.data.id
						res = await this.$api.updateUser(this.form)
						if(res.data.code == 0){
							res = await this.$api.addPeople({
								userId:this.form.id,
								groupId:this.form.groupId,
							})
							if(res.data.code == 0){
								this.$notify({
									group: 'ok',
									title: '提示',
									text: '操作成功'
								});
								this.$router.back()
							}

						}
					}
        }
      });
    }
  }
}
</script>

<style lang="css">
</style>
