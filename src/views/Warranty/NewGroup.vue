<template lang="html">
	<section class="content">
    <div class="box">
        <form class="form-horizontal" @submit.prevent="submit" data-vv-scope="form">
            <div class="box-header with-border">
                <h4 class="box-title">群信息</h4>
            </div>
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">群类别</label>
                    <div class=" col-sm-8 col-md-6">
                        <select name="groupType" class="form-control" >
							<option value="">维保单位群</option>
							<option v-for="item in types" :value="item.id" v-text="item.name"></option>
						</select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">群名称</label>
                    <div class=" col-sm-8 col-md-6">
                        <input type="tel" name="groupName" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.groupName') }" v-model="form.groupName" placeholder="请输入">
                    </div>
                </div>                
            </div>
            <div class="box-header with-border">
                <h4 class="box-title">申请人信息</h4>
            </div>
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">姓名</label>
                    <div class=" col-sm-8 col-md-6">
                        <input type="text" name="userName" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.userName') }" v-model="form.userName" placeholder="请输入">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">性别</label>
                    <div class=" col-sm-8 col-md-6">
                        <input type="text" name="sex" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.sex') }" v-model="form.sex" placeholder="请输入">
                    </div>
                </div>
				<div class="form-group">
                    <label for="" class="col-sm-2 control-label">证件号码</label>
                    <div class=" col-sm-8 col-md-6">
                        <input type="text" name="idNumber" :class="{'form-control': true, 'is-error': errors.has('form.idNumber') }" v-model="form.idNumber" placeholder="请输入">
                    </div>
                </div>
            </div>
						<div class="box-header with-border">
                <h4 class="box-title">单位信息</h4>
            </div>
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">单位名称</label>

                    <div class=" col-sm-8 col-md-6">
                        <input type="text" name="companyName" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.companyName') }" v-model="form.companyName" placeholder="请输入">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">营业执照编号</label>
                    <div class=" col-sm-8 col-md-6">
                        <input type="text" name="companyId" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.companyId') }" v-model="form.companyId" placeholder="请输入">
                    </div>
                </div>
								<div class="form-group">
                    <label for="" class="col-sm-2 control-label">单位所在地</label>
                    <div class=" col-sm-8 col-md-6">
                        <input type="text" name="address" :class="{'form-control': true, 'is-error': errors.has('form.address') }" v-model="form.address" placeholder="请输入">
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
      	groupType:'',
				userName:'',
				groupName:'',
				sex:'',
				idNumber:'',
				companyId: '',
				address:'',
				companyName:''
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
					if(this.$route.params.id){
						res = await this.$api.updateUser(this.form)
					}else {
						res = await this.$api.register(this.form)
					}
					console.log(res.data);
					if(res.data.code == 0){
						this.form.id = res.data.id
						res = await this.$api.updateUser(this.form)
						if(res.data.code == 0){
							this.$notify({
								group: 'ok',
								title: '提示',
								text: '操作成功'
							});
//							this.$router.push({
//								name:'bindcontact',
//								params:{
//									id:this.form.id
//								}
//							})
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
