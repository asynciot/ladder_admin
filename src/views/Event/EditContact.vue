<template lang="html">
	<section class="content">

    <div class="box">
        <form class="form-horizontal" @submit.prevent="submit" data-vv-scope="form">
            <div class="box-header with-border">
                <h4 class="box-title">联系人信息</h4>
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
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">联系人邮箱</label>
                    <div class=" col-sm-8 col-md-6">
                        <input type="email" name="email" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.email') }" v-model="form.email" placeholder="请输入">
                    </div>
                </div>
            </div>
            <div class="box-header with-border">
                <h4 class="box-title">用户信息</h4>
            </div>
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">账号</label>

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
                <h4 class="box-title">用户对应角色信息</h4>
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
        name: '',
        province: '',
        city: '',
        district: '',
        address: '',
        place: '',
      },
			list:[]
    }
  },
  created() {
		this.getList()
    if (this.$route.params.id) {
      this.getData()
    }
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
      let res = await this.$api.msgPerson({
        id: this.$route.params.id
      })
      this.form = res.data.data.list[0]
    },
    submit() {
      this.$validator.validateAll('form').then(async (result) => {
        if (result) {
          let res = null
          if (this.$route.params.id) {
            res = await this.$api.updateMsgPerson(this.form)
          } else {
            res = await this.$api.addMsgPerson(this.form)
          }
          if (res.data.code == 0) {
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
